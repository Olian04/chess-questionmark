import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GameBoard } from './GameBoard';
import { Chess, Square } from 'chess.js';
import { Game } from '../../types/Game';
import { Winner } from '../../types/Winner';

interface Props {
  position: string;
  player?: 'white' | 'black';
  onUpdate: (game: Game) => void;
}

type SquareStylingProps = {
  pieceSquare: Square;
  history: Array<{ from: Square; to: Square }>;
};

const squareStyling = ({ pieceSquare, history }: SquareStylingProps) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: 'cornFlowerBlue' },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: 'cornFlowerBlue',
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: 'cornFlowerBlue',
      },
    }),
  };
};

class OnePlayerState extends Component<Props> {
  static propTypes = {
    children: PropTypes.func,
    player: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  };

  state = {
    fen: this.props.position,
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: '' as Square,
    square: '',
    history: [],
    draggable: true,
    evaluation: [],
    winner: '' as Winner,
  };

  game: any;

  componentDidMount() {
    this.game = new Chess(this.state.fen);
    this.setState({
      draggable:
        (this.game.turn() === 'w' ? 'white' : 'black') === this.props.player,
    });
    this.engineGame({}).prepareMove();
  }

  updateCallback() {
    this.props.onUpdate({
      turn: this.game.turn(),
      fen: this.state.fen,
      winner: this.state.winner,
      against: 'ai', // TODO: hook up player 2
    });
  }

  engineGame = (options: Object) => {
    options = options || {};

    let engine = new Worker(
      '../../../node_modules/stockfish/src/stockfish.js',
      { type: 'module' }
    );

    let engineStatus = {} as {
      engineReady: boolean;
      engineLoaded: boolean;
      search: string;
      score: string;
    };
    let time = {
      wtime: 3000,
      btime: 3000,
      winc: 1500,
      binc: 1500,
    } as {
      wtime: number;
      btime: number;
      winc: number;
      binc: number;
      clockColor: string;
      startTime: number;
      depth: number;
      nodes: unknown[];
    };
    let playerColor: string = this.props.player || 'white';
    let clockTimeoutID: number | null = null;
    let announced_game_over: boolean;

    setInterval(() => {
      if (announced_game_over) return;
      if (this.game.game_over()) announced_game_over = true;
    }, 500);

    const uciCmd = (cmd: string) => {
      engine.postMessage(cmd);
    };
    uciCmd('uci');

    const clockTick = () => {
      let t =
        (time.clockColor === 'white' ? time.wtime : time.btime) +
        time.startTime -
        Date.now();
      let timeToNextSecond = (t % 1000) + 1;
      clockTimeoutID = setTimeout(clockTick, timeToNextSecond);
    };

    const stopClock = () => {
      if (clockTimeoutID !== null) {
        clearTimeout(clockTimeoutID);
        clockTimeoutID = null;
      }
      if (time.startTime > 0) {
        let elapsed = Date.now() - time.startTime;
        time.startTime = (null as any) as number;
        if (time.clockColor === 'white') {
          time.wtime = Math.max(0, time.wtime - elapsed);
        } else {
          time.btime = Math.max(0, time.btime - elapsed);
        }
      }
    };

    const startClock = () => {
      if (this.game.turn() === 'w') {
        time.wtime += time.winc;
        time.clockColor = 'white';
      } else {
        time.btime += time.binc;
        time.clockColor = 'black';
      }
      time.startTime = Date.now();
      clockTick();
    };

    const prepareMove = () => {
      stopClock();
      let turn = this.game.turn() === 'w' ? 'white' : 'black';
      if (!this.game.game_over()) {
        if (turn !== playerColor) {
          uciCmd('position fen ' + this.game.fen());

          if (time && time.wtime) {
            uciCmd(
              'go ' +
                (time.depth ? 'depth ' + time.depth : '') +
                ' wtime ' +
                time.wtime +
                ' winc ' +
                time.winc +
                ' btime ' +
                time.btime +
                ' binc ' +
                time.binc
            );
          } else {
            uciCmd('go ' + (time.depth ? 'depth ' + time.depth : ''));
          }
        }
        if (this.game.history().length >= 2 && !time.depth && !time.nodes) {
          startClock();
        }
      }
    };

    engine.onmessage = (event) => {
      let line;

      if (event && typeof event === 'object') {
        line = event.data;
      } else {
        line = event;
      }
      if (line === 'uciok') {
        engineStatus.engineLoaded = true;
      } else if (line === 'readyok') {
        engineStatus.engineReady = true;
      } else {
        // console.log(line);
        let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
        if (match) {
          this.game.move({ from: match[1], to: match[2], promotion: match[3] });
          this.setState(({ history, pieceSquare }: SquareStylingProps) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history }),
          }));
          this.removeHighlightSquare(); // can probably be done better
          prepareMove();
          this.setState({
            draggable: true,
          });
          if (this.game.in_checkmate()) {
            this.setState({
              winner: playerColor === 'white' ? 'black' : 'white',
            });
          }
          this.updateCallback();
        } else if (
          (match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))
        ) {
          engineStatus.search = 'Depth: ' + match[1] + ' Nps: ' + match[2];
        }

        if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
          let score =
            parseInt(match[2], 10) * (this.game.turn() === 'w' ? 1 : -1);
          if (match[1] === 'cp') {
            engineStatus.score = (score / 100.0).toFixed(2);
          } else if (match[1] === 'mate') {
            engineStatus.score = 'Mate in ' + Math.abs(score);
          }

          if ((match = line.match(/\b(upper|lower)bound\b/))) {
            engineStatus.score =
              ((match[1] === 'upper') === (this.game.turn() === 'w')
                ? '<= '
                : '>= ') + engineStatus.score;
          }
        }
      }
    };

    return {
      start: function () {
        uciCmd('ucinewgame');
        uciCmd('isready');
        engineStatus.engineReady = false;
        engineStatus.search = (null as any) as string;
        prepareMove();
        announced_game_over = false;
      },
      prepareMove: function () {
        prepareMove();
      },
    };
  };

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }: SquareStylingProps) => ({
      squareStyles: squareStyling({ pieceSquare, history }),
    }));
  };

  highlightSquare = (sourceSquare: Square, squaresToHighlight: Square[]) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, b) => {
        return {
          ...a,
          ...{
            [b]: {
              background:
                'radial-gradient(circle, cornFlowerBlue 36%, transparent 40%)',
              borderRadius: '50%',
            },
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare,
          }),
        };
      },
      {}
    );

    this.setState(({ squareStyles }: { squareStyles: Object }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles },
    }));
  };

  onDrop = ({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: Square;
    targetSquare: Square;
  }) => {
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return;

    return new Promise((resolve) => {
      this.setState(({ history, pieceSquare }: SquareStylingProps) => ({
        fen: this.game.fen(),
        history: this.game.history({ verbose: true }),
        squareStyles: squareStyling({ pieceSquare, history }),
      }));
      this.removeHighlightSquare();
      this.setState({
        draggable: false,
      });
      if (this.game.in_checkmate()) {
        this.setState({
          winner: this.props.player,
        });
      }
      this.updateCallback();
      resolve(undefined);
    }).then(() => this.engineGame({}).prepareMove());
  };

  onMouseOverSquare = (square: Square) => {
    if (!this.state.draggable) return;

    let moves = this.game.moves({
      square: square,
      verbose: true,
    });

    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = () => this.removeHighlightSquare();

  onDragOverSquare = () => {
    this.setState({
      dropSquareStyle: { backgroundColor: 'cornFlowerBlue' },
    });
  };

  onSquareClick = (square: Square) => {
    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: 'q',
    });

    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: '',
    });
  };

  render() {
    const {
      fen,
      dropSquareStyle,
      squareStyles,
      draggable,
      winner,
    } = this.state;

    return (
      <GameBoard
        position={fen}
        onDrop={this.onDrop}
        onMouseOverSquare={this.onMouseOverSquare}
        onMouseOutSquare={this.onMouseOutSquare}
        squareStyles={squareStyles}
        dropSquareStyle={dropSquareStyle}
        onDragOverSquare={this.onDragOverSquare}
        onSquareClick={this.onSquareClick}
        draggable={draggable}
        orientation={this.props.player}
        winner={winner}
      />
    );
  }
}

export const OnePlayerBoard = (props: Props) => {
  return (
    <>
      <OnePlayerState
        onUpdate={props.onUpdate}
        position={props.position}
        player={props.player}
      />
    </>
  );
};
