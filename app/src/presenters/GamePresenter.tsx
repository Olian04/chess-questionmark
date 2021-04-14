import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GameView } from '../views/GameView';
import { gameState } from '../state/board';
import { Chess, Square, Move } from 'chess.js';
import { Winner } from '../types/Winner';

type SquareStylingProps = {
  pieceSquare: Square;
  history: Array<{ from: Square; to: Square }>;
};

export const GamePresenter = () => {
  const [gamestate, setGamestate] = useRecoilState(gameState);
  const [playerColor, setPlayerColor] = useState('w');
  const [player, setPlayer] = useState('' as Winner);

  const [timeLeft, setTimeLeft] = useState(900);
  const [intervalID, setIntervalID] = useState(0);

  const [position, setPosition] = useState(
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  );
  const [dropSquareStyle, setDropSquareStyle] = useState({});
  const [squareStyles, setSquareStyles] = useState({});
  const [pieceSquare, setPieceSquare] = useState('' as Square);
  const [square, setSquare] = useState('');
  const [history, setHistory] = useState([] as Move[]);
  const [draggable, setDraggable] = useState(playerColor === 'w');
  const [winner, setWinner] = useState('' as Winner);

  const game = new Chess(position);

  const updateCallback = () => {
    setGamestate({
      turn: game.turn(),
      fen: position,
      winner: winner,
    });
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

  // const play = () => {
  //   let t = timeLeft;
  //   setIntervalID(
  //     setInterval(() => {
  //       setTimeLeft(--t);
  //       console.log(t);
  //     }, 1000)
  //   );
  // };
  //
  // const pause = () => {
  //   clearInterval(intervalID);
  // };
  //
  // const playPause = () => {
  //   if (playing) {
  //     pause();
  //   } else {
  //     if (timeLeft <= hist.length) return;
  //     play();
  //   }
  // };

  useEffect(() => {
    console.log(gamestate);
  }, [gamestate]);

  return (
    <GameView
      boardProps={{
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
