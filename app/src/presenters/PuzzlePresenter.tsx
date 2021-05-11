import React, { useState, useEffect, useRef } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { GameView } from '../views/GameView';
import { fallbackGameState, requestGame } from '../state/game';
import { useHistory } from 'react-router-dom';
import { currentUserIDState, profileState, userState } from '../state/user';
import { EndOfGame } from '../components/game/EndOfGame';
import { useChessLogic } from '../hooks/use-chess-logic';
import { migrateGameByUserID } from '../services/firebase/util/migrateDB';
import {
  updateLiveGameByUserID,
  getLiveGameByUserID,
} from '../services/firebase/realtimeDB';
import { snackbarState } from '../state/snackbar';

export const PuzzlePresenter = () => {
  const history = useHistory();
  const user = useRecoilValue(userState);
  const userProfile = useRecoilValue(profileState);
  const gameState = useRecoilValue(requestGame);
  const setSnackbar = useSetRecoilState(snackbarState);
  const [winnerDialogueOpen, setWinnerDialogueOpen] = useState<boolean>(false);
  const [playerIsWhite] = useState(
    gameState?.history[0]?.split(' ')?.[1] === 'w' ?? true
  );
  const [initialFEN] = useState(
    gameState?.history?.[gameState?.history?.length - 1]
  );
  const [previousFENStrings] = useState(gameState?.history);

  const timerIncreaseOnMove = 5;

  const gameLogic = useChessLogic({
    initialFEN,
    previousFENStrings,
    playerColor: playerIsWhite ? 'white' : 'black',
    timerLength: gameState.timeLeft,
    diffculty:
      userProfile.rank /
      (userProfile.losses + userProfile.wins + userProfile.draws),
    timerIncreaseOnMove,
  });

  useEffect(() => {
    if (!initialFEN) {
      history.push('/play');
    }
  }, []);

  const endGame = useRecoilCallback(({ set, snapshot }) => async () => {
    if (gameLogic.boardProps.winner !== 'N/A') {
      setWinnerDialogueOpen(true);
      const userID = await snapshot.getPromise(currentUserIDState);
      if (userID === null) {
        throw new Error(`Unexpected null userID at board initialization`);
      }
      await updateLiveGameByUserID(userID, {
        winner:
          gameLogic.boardProps.orientation === gameLogic.boardProps.winner
            ? 'playerOne'
            : 'playerTwo',
        state: 'ended',
      });
      await migrateGameByUserID(userID);
      set(requestGame, fallbackGameState);
    }
  });

  const addMoveToGameState = useRecoilCallback(
    ({ snapshot, set }) =>
      async (onUnmount?: { timeLeft: number }) => {
        const userID = await snapshot.getPromise(currentUserIDState);
        if (userID === null) {
          throw new Error(`Unexpected null userID at board initialization`);
        }
        const gameState = await snapshot.getPromise(requestGame);
        const latestState = gameLogic.history[gameLogic.history.length - 1];
        if (onUnmount) {
          await updateLiveGameByUserID(userID, {
            timeLeft: onUnmount.timeLeft,
          });
        }
        if (!onUnmount && latestState.player === 'human') {
          await updateLiveGameByUserID(userID, {
            history: [...gameState.history, latestState.fen],
            timeLeft: gameLogic.timeLeft.self + timerIncreaseOnMove,
          });
        }
        if (!onUnmount && latestState.player === 'ai') {
          await updateLiveGameByUserID(userID, {
            history: [...gameState.history, latestState.fen],
          });
        }

        const newGameState = await getLiveGameByUserID(userID);
        if (newGameState === null) {
          throw new Error(`This should never happen... Run for your lives!!`);
        }
        set(requestGame, newGameState);
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

  const timeRef = useRef<HTMLParagraphElement>();

  useEffect(() => {
    return () => {
      if (timeRef.current) {
        const [minutes, seconds] = timeRef.current.innerText.split(':');
        const timeLeft = parseInt(minutes) * 60 + parseInt(seconds);
        addMoveToGameState({ timeLeft: timeLeft });
      }
    };
  }, []);

  useEffect(() => {
    setSnackbar({
      open: true,
      severity: 'info',
      message: `You are playing as ${playerIsWhite ? 'white' : 'black'}`,
    });
  }, [gameLogic.boardProps.orientation]);

  const userInfo = {
    name: user.name,
    email: user.email,
    countryCode: user.countryCode,
    rating: userProfile.rank,
    playerIsWhite,
  };

  return (
    <>
      <EndOfGame
        winner={gameLogic.boardProps.winner === 'white' && playerIsWhite}
        onClick={() => {
          setWinnerDialogueOpen(false);
          history.push('/play');
        }}
        open={winnerDialogueOpen}
      />
      <GameView
        timeRef={timeRef}
        player={userInfo}
        topTime={gameLogic.timeLeft.opponent}
        botTime={gameLogic.timeLeft.self}
        boardProps={gameLogic.boardProps}
        previousPlayer={gameLogic.history[gameLogic.history.length - 1].player}
        currentMove={gameLogic.history.length}
        handleResign={gameLogic.handleResign}
        isPaused={
          gameLogic.history[gameLogic.history.length - 1].player === 'ai'
        }
        isBlinking={gameLogic.timeLeft.self <= 60 / 6}
      />
    </>
  );
};
