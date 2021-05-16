import { useState, useEffect } from 'react';
import { Chess, Square, Move as ChessMove } from 'chess.js';
import { stockfishEngine } from '../lib/stockfish/engine';
import { BoardProps } from '../types/BoardProps';

interface Config {
  initialFEN: string;
  previousFENStrings?: string[];
  timerLength: number;
  timerIncreaseOnMove: number;
  playerColor: 'white' | 'black';
  difficulty: number;
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

interface Highlights {
  checkSquare: Square;
  pieceSquare: Square;
  history: ChessMove[];
  legalMoves: Square[];
}

type Player = 'white' | 'black';
type Winner = Player | 'draw' | 'N/A';

const PREVIOUS_MOVE_COLOR = 'cornFlowerBlue';
const SELECTED_PIECE_COLOR = 'cornFlowerBlue';
const KING_DANGER_COLOR = 'red';
const DRAG_OVER_COLOR = 'cornFlowerBlue';

const highlightMoves = (legalMoves: Square[]) => {
  return [...legalMoves].reduce((a, b) => {
    return {
      ...a,
      ...{
        [b]: {
          background:
            'radial-gradient(circle, cornFlowerBlue 36%, transparent 40%)',
          borderRadius: '50%',
        },
      },
    };
  }, {})
};

const squareStyling = ({checkSquare, pieceSquare, history, legalMoves}: Highlights) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;
  const moves = highlightMoves(legalMoves);

  return {
    [checkSquare]: { backgroundColor: KING_DANGER_COLOR },
    [pieceSquare]: { backgroundColor: SELECTED_PIECE_COLOR },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: PREVIOUS_MOVE_COLOR,
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: PREVIOUS_MOVE_COLOR,
      },
    }),
    ...moves,
  };
};

export const useChessLogic = (conf: Config): API => {
  const [player] = useState<Player>(conf.playerColor);

  const [botTimeLeft, setBotTimeLeft] = useState(conf.timerLength);
  const [topTimeLeft, setTopTimeLeft] = useState(conf.timerLength);
  const [intervalID, setIntervalID] = useState(0);

  const [position, setPosition] = useState(conf.initialFEN);
  // const [dropSquareStyle, setDropSquareStyle] = useState({});
  const [squareStyles, setSquareStyles] = useState({});
  const [pieceSquare, setPieceSquare] = useState('' as Square);
  const [draggable, setDraggable] = useState(true);
  const [winner, setWinner] = useState('N/A' as Winner);
  const [endCause, setEndCause] = useState('N/A');

  const dropSquareStyle = { backgroundColor: DRAG_OVER_COLOR };

  const [highlights, setHightlights] = useState({
    checkSquare: '' as Square,
    pieceSquare: '' as Square,
    history: [] as ChessMove[],
    legalMoves: [] as Square[]
  } as Highlights);

  const [apiHistory, setApiHistory] = useState<Move[]>(
    conf?.previousFENStrings?.map((fen, i) => ({
      fen,
      player: i % 2 === 0 ? 'human' : 'ai',
    })) ?? []
  );

  const [game] = useState(new Chess(position));

  const updateHighlight = (type: string, arg: any) => {
    switch(type) {
      case 'check':
        setHightlights((h) => {
          return {
            ...h,
            checkSquare: arg,
          }
        });
        break;
      case 'piece':
        setHightlights((h) => {
          return {
            ...h,
            pieceSquare: arg,
          }
        });
        break;
      case 'history':
        setHightlights((h) => {
          return {
            ...h,
            history: arg,
          }
        });
        break;
      case 'moves':
        setHightlights((h) => {
          return {
            ...h,
            legalMoves: arg,
          }
        });
        break;
    }
  };

  const getAllSquares = () => {
    const arr = [...Array(64).keys()];
    return arr.map((piece_index) => {
      const row = 'abcdefgh'[piece_index % 8];
      const column = Math.ceil((64 - piece_index) / 8);
      return row + column;
    });
  };

  const checkKing = () => {
    const t = game.turn();
    const positions = getAllSquares();
    for (const pos of positions) {
      const p = pos as Square;
      const piece = game.get(p);
      if (piece !== null && piece.type === 'k' && piece.color === t) {
        updateHighlight('check' , p);
        break;
      }
    }
  };

  const isPlayerTurn = () => {
    const t = game.turn() === 'w' ? 'white' : 'black';
    return t === player;
  };

  const handleResign = () => {
    const winner = player === 'white' ? 'black' : 'white';
    setEndCause('resignation');
    setWinner(winner);
  };

  const checkDraw = () => {
    if (game.in_threefold_repetition()) {
      return 'threefold repetition';
    } else if (game.in_stalemate()) {
      return 'stalemate';
    } else if (game.in_draw()) {
      return 'draw';
    } else if (game.insufficient_material()) {
      return 'draw';
    } else if (game.game_over()) {
      return 'inexplicable reason';
    } else {
      return '';
    }
  };

  const handleTurnSwap = () => {
    setPosition(game.fen());
    updateHighlight('moves', []);
    updateHighlight('history', game.history({ verbose: true }));
    setDraggable(false);
    let drawReason = checkDraw();
    if (game.in_checkmate()) {
      setEndCause('checkmate');
      setWinner(player);
    } else if (drawReason !== '') {
      setEndCause(drawReason);
      setWinner('draw');
    } else if (game.in_check()) {
      checkKing();
    } else {
      updateHighlight('check', '');
    }
    setApiHistory((h) => [
      ...h,
      {
        player: 'human',
        fen: game.fen(),
      },
    ]);
    engineGame({}).prepareMove();
  };

  const boardProps = {
    onDrop: ({
      sourceSquare,
      targetSquare,
    }: {
      sourceSquare: Square;
      targetSquare: Square;
    }) => {
      if (!isPlayerTurn()) return;
      let move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return;

      handleTurnSwap();
    },

    onSquareClick: (square: Square) => {
      if (!isPlayerTurn()) return;
      const moves = game.moves({
        square: square,
        verbose: true,
      });

      if (moves.length !== 0) {
        let squaresToHighlight: Square[] = [];
        for (var i = 0; i < moves.length; i++) {
          squaresToHighlight.push(moves[i].to);
        }
        setPieceSquare(square);
        updateHighlight('piece', square);
        updateHighlight('moves', squaresToHighlight);
        return;
      } else {
        const p = game.get(square);
        if (p && p.color && p.color === game.turn()) {
          setPieceSquare(square);
          updateHighlight('piece', square);
          updateHighlight('moves', []);
          return;
        }
      }

      const move = game.move({
        from: pieceSquare,
        to: square,
        promotion: 'q',
      });

      if (move === null) {
        setPieceSquare('' as Square);
        updateHighlight('piece', '');
        updateHighlight('moves', []);
        return;
      }

      handleTurnSwap();
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

    const skill = Math.min(Math.floor(conf.difficulty / 100), 20);
    uciCmd('setoption name Skill level value ' + skill);

    const prepareMove = () => {
      const turn = game.turn() === 'w' ? 'white' : 'black';
      if (!game.game_over()) {
        if (turn !== player) {
          uciCmd('position fen ' + game.fen());
          const depthDerivedFromRating = Math.max(
            Math.floor(conf.difficulty / 300),
            1
          );
          setTimeout(
            () => uciCmd(`go depth ${depthDerivedFromRating}`),
            Math.random() * 5000
          );
        }
      }
    };

    engine.onmessage = (event: any) => {
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
          game.move({ from: match[1], to: match[2], promotion: match[3] });
          setPosition(game.fen());
          updateHighlight('history', game.history({ verbose: true }));
          updateHighlight('piece', '');
          setDraggable(true);
          let drawReason = checkDraw();
          if (game.in_checkmate()) {
            setEndCause('checkmate');
            setWinner(player === 'white' ? 'black' : 'white');
          } else if (drawReason !== '') {
            setEndCause(drawReason);
            setWinner('draw');
          } else if (game.in_check()) {
            checkKing();
          } else {
            updateHighlight('check', '');
          }
          prepareMove();
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

  useEffect(() => {
    if (!apiHistory.length) return;
    const lastState = apiHistory[apiHistory.length - 1];
    if (lastState.player === 'ai') {
      runBotTimer();
    } else {
      stopBotTimer();
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

  useEffect(() => {
    setSquareStyles(squareStyling(highlights));
  }, [highlights]);

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
