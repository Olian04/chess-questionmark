import React, { useState, useEffect } from 'react';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { GameView } from '../views/GameView';
import { Chess, Square, Move } from 'chess.js';
import { currentGameState } from '../state/game';
import { useHistory } from 'react-router-dom';
import { userState } from '../state/user';
import { EndOfGame } from '../components/game/EndOfGame';
import { useChessLogic } from '../hooks/use-chess-logic';
import { LiveGame } from '../types/live/LiveGame';
import { migrateGameByUserID } from '../services/firebase/util/migrateDB';
import {
  updateLiveGameByUserID,
  getLiveGameByUserID,
} from '../services/firebase/realtimeDB';
import { snackbarState } from '../state/snackbar';

export const PuzzlePresenter = () => {
  const history = useHistory();
  const user = useRecoilValue(userState);
  const [gameState, setGamestate] = useRecoilState(currentGameState);
  const setSnackbar = useSetRecoilState(snackbarState);
  const [winnerDialogueOpen, setWinnerDialogueOpen] = useState<boolean>(false);
  const [playerIsWhite] = useState(
    gameState?.history[0]?.split(' ')?.[1] === 'w' ?? true
  );
  const [initialFEN] = useState(
    gameState?.history?.[gameState?.history?.length - 1]
  );
  const [previousFENStrings] = useState(gameState?.history);
  const gameLogic = useChessLogic({
    initialFEN,
    previousFENStrings,
    playerColor: playerIsWhite ? 'white' : 'black',
    timerLength: 59,
    timerIncreaseOnMove: 5,
  });

  useEffect(() => {
    if (!initialFEN) {
      history.push('/play');
    }
  }, []);

  const endGame = useRecoilCallback(({ reset, snapshot }) => async () => {
    setWinnerDialogueOpen(true);
    const { id: userID } = await snapshot.getPromise(userState);
    await updateLiveGameByUserID(userID, {
      winner:
        gameLogic.boardProps.orientation === gameLogic.boardProps.winner
          ? 'playerOne'
          : 'playerTwo',
    });
    await migrateGameByUserID(user.id);
    reset(currentGameState);
  });

  const addMoveToGameState = useRecoilCallback(
    ({ snapshot, set }) => async () => {
      const { id: userID } = await snapshot.getPromise(userState);
      const gameState = await snapshot.getPromise(currentGameState);
      await updateLiveGameByUserID(userID, {
        history: [
          ...gameState.history,
          gameLogic.history[gameLogic.history.length - 1].fen,
        ],
      });
      const newGameState = await getLiveGameByUserID(userID);
      set(currentGameState, newGameState);
    }
  );

  useEffect(() => {
    if (['black', 'white'].includes(gameLogic.boardProps.winner)) {
      endGame();
    }
  }, [gameLogic.boardProps.winner]);

  useEffect(() => {
    if (gameLogic.history.length > 1) {
      addMoveToGameState();
    }
  }, [gameLogic.history]);

  useEffect(() => {
    setSnackbar({
      open: true,
      severity: 'info',
      message: `You are playing as ${playerIsWhite ? 'white' : 'black'}`,
    });
  }, [gameLogic.boardProps.orientation]);
  return (
    <>
      <EndOfGame
        winner={gameLogic.boardProps.winner}
        onClick={() => {
          setWinnerDialogueOpen(false);
          history.push('/play');
        }}
        open={winnerDialogueOpen}
      />
      <GameView
        topTime={gameLogic.timeLeft.opponent}
        botTime={gameLogic.timeLeft.self}
        boardProps={gameLogic.boardProps}
      />
    </>
  );
};
