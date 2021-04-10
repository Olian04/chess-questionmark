import React, { useEffect, useRef, useState, Component } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import PropTypes from "prop-types";
import { GameBoard } from './GameBoard';
import { Chess } from 'chess.js';

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "cornFlowerBlue" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "cornFlowerBlue"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "cornFlowerBlue"
      }
    })
  };
};

class OnePlayerState extends Component {
  static propTypes = { children: PropTypes.func };

  state = {
    fen: this.props.position,
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: "",
    square: "",
    history: [],
    draggable: true,
    evaluation: [],
    winner: '',
  }

  componentDidMount() {
    this.game = new Chess(this.state.fen);
    this.setState({
      draggable: (this.game.turn() === "w" ? "white" : "black") === this.props.player
    });
    this.engineGame().prepareMove();
  }

  engineGame = options => {
    options = options || {};

    let engine = new Worker ('../../../node_modules/stockfish/src/stockfish.js', { type: 'module' });

    let engineStatus = {};
    let time = { wtime: 3000, btime: 3000, winc: 1500, binc: 1500 };
    let playerColor = this.props.player || "white";
    let clockTimeoutID = null;
    let announced_game_over;

    setInterval(() => {
      if (announced_game_over) return;
      if (this.game.game_over()) announced_game_over = true;
    }, 500);

    const uciCmd = cmd => {
      engine.postMessage(cmd);
    };
    uciCmd("uci");

    const clockTick = () => {
      let t = (time.clockColor === "white" ? time.wtime : time.btime) + time.startTime - Date.now();
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
        time.startTime = null;
        if (time.clockColor === "white") {
          time.wtime = Math.max(0, time.wtime - elapsed);
        } else {
          time.btime = Math.max(0, time.btime - elapsed);
        }
      }
    };

    const startClock = () => {
      if (this.game.turn() === "w") {
        time.wtime += time.winc;
        time.clockColor = "white";
      } else {
        time.btime += time.binc;
        time.clockColor = "black";
      }
      time.startTime = Date.now();
      clockTick();
    };

    const prepareMove = () => {
      stopClock();
      let turn = this.game.turn() === "w" ? "white" : "black";
      if (!this.game.game_over()) {
        if (turn !== playerColor) {
          uciCmd("position fen " + this.game.fen());

          if (time && time.wtime) {
            uciCmd(
              "go " +
              (time.depth ? "depth " + time.depth : "") +
              " wtime " +
              time.wtime +
              " winc " +
              time.winc +
              " btime " +
              time.btime +
              " binc " +
              time.binc
            );
          } else {
            uciCmd("go " + (time.depth ? "depth " + time.depth : ""));
          }
        }
        if (this.game.history().length >= 2 && !time.depth && !time.nodes) {
          startClock();
        }
      }
    };

    engine.onmessage = event => {
      let line;

      if (event && typeof event === "object") {
        line = event.data;
      } else {
        line = event;
      }
      if (line === "uciok") {
        engineStatus.engineLoaded = true;
      } else if (line === "readyok") {
        engineStatus.engineReady = true;
      } else {
        // console.log(line);
        let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
        if (match) {
          this.game.move({ from: match[1], to: match[2], promotion: match[3] });
          this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history }),
          }));
          this.removeHighlightSquare() // can probably be done better
          prepareMove();
          this.setState({
            draggable: true
          });
          if (this.game.in_checkmate()) {
            this.setState({
              winner: (playerColor === 'white' ? 'black' : 'white')
            });
          }
        } else if ((match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))) {
          engineStatus.search = "Depth: " + match[1] + " Nps: " + match[2];
        }

        if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
          let score = parseInt(match[2], 10) * (this.game.turn() === "w" ? 1 : -1);
          if (match[1] === "cp") {
            engineStatus.score = (score / 100.0).toFixed(2);
          } else if (match[1] === "mate") {
            engineStatus.score = "Mate in " + Math.abs(score);
          }

          if ((match = line.match(/\b(upper|lower)bound\b/))) {
            engineStatus.score = ((match[1] === "upper") === (this.game.turn() === "w") ? "<= " : ">= ") + engineStatus.score;
          }
        }
      }
    };

    return {
      start: function() {
        uciCmd("ucinewgame");
        uciCmd("isready");
        engineStatus.engineReady = false;
        engineStatus.search = null;
        prepareMove();
        announced_game_over = false;
      },
      prepareMove: function() {
        prepareMove();
      }
    };
  }

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };

  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, b) => {
        return {
          ...a,
          ...{
            [b]: {
              background:
                "radial-gradient(circle, cornFlowerBlue 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles }
    }));
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return;

    return new Promise(resolve => {
      this.setState(({ history, pieceSquare }) => ({
        fen: this.game.fen(),
        history: this.game.history({ verbose: true }),
        squareStyles: squareStyling({ pieceSquare, history }),
      }));
      this.removeHighlightSquare();
      this.setState({
        draggable: false
      });
      if (this.game.in_checkmate()) {
        this.setState({
          winner: props.player
        });
      }
      resolve();
    }).then(() => this.engineGame().prepareMove());
  };

  onMouseOverSquare = square => {
    if (!this.state.draggable) return;

    let moves = this.game.moves({
      square: square,
      verbose: true
    });

    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = square => this.removeHighlightSquare(square);

  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle: { backgroundColor: "cornFlowerBlue" }
    });
  };

  onSquareClick = square => {
    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q"
    });

    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: ""
    });
  };

  render() {
    const { fen, dropSquareStyle, squareStyles, draggable, winner } = this.state;

    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick,
      draggable,
      winner
    });
  }
}

interface Props {
  position: string;
  player: string;
}

export const OnePlayerBoard = (props: Props) => {
  return (
    <>
      <OnePlayerState position={props.position} player={props.player}>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          draggable,
          winner
        }) => (
          <GameBoard
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            draggable={draggable}
            orientation={props.player}
            winner={winner}
          />
        )}
      </OnePlayerState>
    </>
  );
}
