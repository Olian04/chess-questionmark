import { useState, useEffect, Dispatch } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GameView } from '../views/GameView';
import { Chess, Square, Move as ChessMove } from 'chess.js';
import { useHistory } from 'react-router-dom';
import { EndOfGame } from '../components/game/EndOfGame';
import { stockfishEngine } from '../lib/stockfish/engine';
import { BoardProps } from '../types/BoardProps';
import { SetStateAction } from 'react';

interface Config {
  initialFEN: string;
  previousFENStrings?: string[];
  timerLength: number;
  timerIncreaseOnMove: number;
  playerColor: 'white' | 'black';
  diffculty: number;
}

type Move = {
  player: 'ai' | 'human';
  fen: string;
};

interface API {
  history: Move[];
  timeLeft: {
    self: number;
    opponent: number;
  };
  boardProps: BoardProps;
  handleResign: () => void;
  endCause: string;
}

interface SquareStylingProps {
  pieceSquare: Square;
  history: Array<{ from: Square; to: Square }>;
}

type Player = 'white' | 'black';
type Winner = Player | 'N/A';

export const useChessLogic = (conf: Config): API => {
  const [player] = useState<Player>(conf.playerColor);

  const [botTimeLeft, setBotTimeLeft] = useState(conf.timerLength);
  const [topTimeLeft, setTopTimeLeft] = useState(conf.timerLength);
  const [intervalID, setIntervalID] = useState(0);

  const [position, setPosition] = useState(
    '8/8/2k5/3p4/4P3/5K2/8/8 w KQkq - 0 1'
  );
  const [dropSquareStyle, setDropSquareStyle] = useState({});
  const [squareStyles, setSquareStyles] = useState({});
  const [pieceSquare, setPieceSquare] = useState('' as Square);
  const [history, setHistory] = useState([] as ChessMove[]);
  const [draggable, setDraggable] = useState(true);
  const [winner, setWinner] = useState('N/A' as Winner);
  const [endCause, setEndCause] = useState('N/A');

  const [apiHistory, setApiHistory] = useState<Move[]>(
    conf?.previousFENStrings?.map((fen, i) => ({
      fen,
      player: i % 2 === 0 ? 'human' : 'ai',
    })) ?? []
  );

  const [game] = useState(new Chess(position));

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

  const handleResign = () => {
    const winner = player === 'white' ? 'black' : 'white';
    setEndCause('resignation');
    setWinner(winner);
  };

  const boardProps = {
    removeHighlightSquare: () => {
      setSquareStyles(squareStyling({ pieceSquare, history }));
    },

    highlightSquare: (sourceSquare: Square, squaresToHighlight: Square[]) => {
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
              history: history,
              pieceSquare: pieceSquare,
            }),
          };
        },
        {}
      );

      setSquareStyles(({ squareStyles }: { squareStyles: Object }) => ({
        ...squareStyles,
        ...highlightStyles,
      }));
    },

    onDrop: ({
      sourceSquare,
      targetSquare,
    }: {
      sourceSquare: Square;
      targetSquare: Square;
    }) => {
      let move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return;

      setPosition(game.fen());
      setHistory(game.history({ verbose: true }));
      setSquareStyles(squareStyling({ pieceSquare, history }));
      boardProps.removeHighlightSquare();
      setDraggable(false);
      if (game.in_checkmate()) {
        setEndCause('checkmate');
        setWinner(player);
      }
      if (game.in_threefold_repetition()) {
        setEndCause('threefold repetition');
        setWinner(player === 'white' ? 'black' : 'white');
      }
      setApiHistory((h) => [
        ...h,
        {
          player: 'human',
          fen: game.fen(),
        },
      ]);
      engineGame({}).prepareMove();
    },

    onMouseOverSquare: (square: Square) => {
      if (!draggable) return;

      const moves = game.moves({
        square: square,
        verbose: true,
      });

      if (moves.length === 0) return;

      let squaresToHighlight: Square[] = [];
      for (var i = 0; i < moves.length; i++) {
        squaresToHighlight.push(moves[i].to);
      }

      boardProps.highlightSquare(square, squaresToHighlight);
    },

    onMouseOutSquare: () => {
      boardProps.removeHighlightSquare();
    },

    onDragOverSquare: () => {
      setDropSquareStyle({ backgroundColor: 'cornFlowerBlue' });
    },

    onSquareClick: (square: Square) => {
      const move = game.move({
        from: pieceSquare,
        to: square,
        promotion: 'q',
      });

      if (move === null) {
        setPieceSquare(square);
        return;
      }

      setPosition(game.fen());
      setHistory(game.history({ verbose: true }));
      boardProps.removeHighlightSquare();
      setDraggable(false);
      if (game.in_checkmate()) {
        setEndCause('checkmate');
        setWinner(player);
      } else if (game.in_threefold_repetition()) {
        setEndCause('threefold repetition');
        setWinner(player);
      } else if (game.in_stalemate()) {
        setEndCause('stalemate');
        setWinner(player);
      } else if (game.in_draw()) {
        setEndCause('draw');
        setWinner(player);
      } else if (game.insufficient_material()) {
        setEndCause('draw');
        setWinner(player);
      } else if (game.game_over()) {
        setEndCause('inexplicable reason');
        setWinner(player);
      }
      setApiHistory((h) => [
        ...h,
        {
          player: 'human',
          fen: game.fen(),
        },
      ]);
      engineGame({}).prepareMove();
    },
  };

  const engineGame = (options: Object) => {
    options = options || {};

    let engine = stockfishEngine;

    let engineStatus = {} as {
      engineReady: boolean;
      engineLoaded: boolean;
      search: string;
      score: string;
    };
    let announced_game_over: boolean;

    setInterval(() => {
      if (announced_game_over) return;
      if (game.game_over()) announced_game_over = true;
    }, 500);

    const uciCmd = (cmd: string) => {
      engine.postMessage(cmd);
    };
    uciCmd('uci');

    const prepareMove = () => {
      const turn = game.turn() === 'w' ? 'white' : 'black';
      if (!game.game_over()) {
        if (turn !== player) {
          uciCmd('position fen ' + game.fen());
          const depthDerivedFromRating = Math.max(
            Math.floor(conf.diffculty / 50),
            1
          );
          setTimeout(
            () => uciCmd(`go depth ${depthDerivedFromRating}`),
            Math.random() * 5000
          );
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
        let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
        if (match) {
          console.log('I has plan');
          game.move({ from: match[1], to: match[2], promotion: match[3] });
          setPosition(game.fen());
          setHistory(game.history({ verbose: true }));
          setSquareStyles(squareStyling({ pieceSquare, history }));
          boardProps.removeHighlightSquare();
          prepareMove();
          setDraggable(true);
          if (game.in_checkmate()) {
            setEndCause('checkmate');
            setWinner(player === 'white' ? 'black' : 'white');
          } else if (game.in_threefold_repetition()) {
            setEndCause('threefold repetition');
            setWinner(player === 'white' ? 'black' : 'white');
          } else if (game.in_stalemate()) {
            setEndCause('stalemate');
            setWinner(player === 'white' ? 'black' : 'white');
          } else if (game.in_draw()) {
            setEndCause('draw');
            setWinner(player === 'white' ? 'black' : 'white');
          } else if (game.insufficient_material()) {
            setEndCause('draw');
            setWinner(player === 'white' ? 'black' : 'white');
          } else if (game.game_over()) {
            setEndCause('inexplicable reason');
            setWinner(player === 'white' ? 'black' : 'white');
          }
          setApiHistory((h) => [
            ...h,
            {
              player: 'ai',
              fen: game.fen(),
            },
          ]);
        } else if (
          (match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))
        ) {
          engineStatus.search = 'Depth: ' + match[1] + ' Nps: ' + match[2];
        }

        if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
          let score = parseInt(match[2], 10) * (game.turn() === 'w' ? 1 : -1);
          if (match[1] === 'cp') {
            engineStatus.score = (score / 100.0).toFixed(2);
          } else if (match[1] === 'mate') {
            engineStatus.score = 'Mate in ' + Math.abs(score);
          }

          if ((match = line.match(/\b(upper|lower)bound\b/))) {
            engineStatus.score =
              ((match[1] === 'upper') === (game.turn() === 'w')
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

  const gameTimeout = (p: Winner) => {
    clearInterval(intervalID);
    if (p === 'white') {
      setEndCause('timeout');
      setWinner('black');
    } else if (p === 'black') {
      setEndCause('timeout');
      setWinner('white');
    }
    setDraggable(false);
  };

  const runBotTimer = () => {
    let t = botTimeLeft;
    setIntervalID(
      setInterval(() => {
        if (t <= 0) {
          gameTimeout('white');
          return;
        }
        setBotTimeLeft(--t);
      }, 1000)
    );
  };

  const stopBotTimer = () => {
    clearInterval(intervalID);
    setBotTimeLeft(
      Math.min(botTimeLeft + conf.timerIncreaseOnMove, conf.timerLength)
    );
  };

  const runTopTimer = () => {
    let t = topTimeLeft;
    setIntervalID(
      setInterval(() => {
        if (t <= 0) {
          gameTimeout('black');
          return;
        }
        setTopTimeLeft(--t);
      }, 1000)
    );
  };

  const stopTopTimer = () => {
    clearInterval(intervalID);
    setTopTimeLeft(
      Math.min(topTimeLeft + conf.timerIncreaseOnMove, conf.timerLength)
    );
  };

  useEffect(() => {
    if (!apiHistory.length) return;
    const lastState = apiHistory[apiHistory.length - 1];
    if (lastState.player === 'ai') {
      //stopTopTimer();
      runBotTimer();
    } else {
      stopBotTimer();
      //runTopTimer();
    }
  }, [apiHistory.length]);

  useEffect(() => {
    if (winner) {
      clearInterval(intervalID);
    }
  }, [winner]);

  useEffect(() => {
    if (game.turn() === conf.playerColor[0]) runBotTimer();
  }, []);

  return {
    history: apiHistory,
    timeLeft: {
      self: botTimeLeft,
      opponent: topTimeLeft,
    },
    boardProps: {
      ...boardProps,
      position,
      winner,
      orientation: player,
      draggable,
      dropSquareStyle,
      squareStyles,
    },
    handleResign,
    endCause,
  };
};
