import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GameView } from '../views/GameView';
import { currentGameState } from '../state/game';
import { Chess, Square, Move } from 'chess.js';
import { Winner } from '../types/Winner';
import { Player } from '../types/Player';
import { Game } from '../types/Game';

const startTimeLeft = 20;
const timerIncrease = 15;
const defaultFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

type SquareStylingProps = {
  pieceSquare: Square;
  history: Array<{ from: Square; to: Square }>;
};

export const GamePresenter = () => {
  const [gamestate, setGamestate] = useRecoilState(currentGameState);
  const [player, setPlayer] = useState('white' as Player);

  const [botTimeLeft, setBotTimeLeft] = useState(startTimeLeft);
  const [topTimeLeft, setTopTimeLeft] = useState(startTimeLeft);
  const [intervalID, setIntervalID] = useState(0);
  const [timeOut, setTimeout] = useState('' as Winner);

  const [position, setPosition] = useState(defaultFEN);
  const [dropSquareStyle, setDropSquareStyle] = useState({});
  const [squareStyles, setSquareStyles] = useState({});
  const [pieceSquare, setPieceSquare] = useState('' as Square);
  const [square, setSquare] = useState('');
  const [history, setHistory] = useState([] as Move[]);
  const [draggable, setDraggable] = useState(player === 'white');
  const [winner, setWinner] = useState('' as Winner);

  const game = new Chess(position);

  const updateCallback = () => {
    const newState: Game = {
      turn: game.turn(),
      fen: position,
      winner: winner,
      against: 'human',
      state: 'playing',
    };
    setGamestate(newState);
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
      // setDraggable(false);
      if (game.in_checkmate()) {
        setWinner(player);
      }
      updateCallback();
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

      if (move === null) return;

      setPosition(game.fen());
      setHistory(game.history({ verbose: true }));
      setPieceSquare('' as Square);
    },
  };

  const gameTimeout = (p: Winner) => {
    clearInterval(intervalID);
    if (p === 'white') {
      setWinner('black');
    } else if (p === 'black') {
      setWinner('white');
    }
    updateCallback();
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
    setBotTimeLeft(Math.min(botTimeLeft + timerIncrease, startTimeLeft));
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
    setTopTimeLeft(Math.min(topTimeLeft + timerIncrease, startTimeLeft));
  };

  useEffect(() => {
    if (gamestate) {
      const turn = gamestate.turn === 'w' ? 'white' : 'black';
      if (turn === player) {
        stopTopTimer();
        runBotTimer();
      } else {
        stopBotTimer();
        runTopTimer();
      }
    }
  }, [gamestate]);

  return (
    <GameView
      topTime={topTimeLeft}
      botTime={botTimeLeft}
      boardProps={{
        orientation: player,
        position: position,
        squareStyles: squareStyles,
        dropSquareStyle: dropSquareStyle,
        draggable: draggable,
        winner: winner,
        ...boardProps,
      }}
    />
  );
};
