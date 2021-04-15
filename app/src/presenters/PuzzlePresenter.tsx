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

export const PuzzlePresenter = () => {
  const history = useHistory();
  const user = useRecoilValue(userState);
  const [gameState, setGamestate] = useRecoilState(currentGameState);
  const [winnerDialogueOpen, setWinnerDialogueOpen] = useState<boolean>(false);
  const gameLogic = useChessLogic({
    initialFEN: gameState.history[gameState.history.length - 1] ?? '',
    timerLength: 59,
    timerIncreaseOnMove: 5,
  });

  const endGame = useRecoilCallback(({ reset }) => async () => {
    setWinnerDialogueOpen(true);
    migrateGameByUserID(user.id);
    reset(currentGameState);
  });

  useEffect(() => {
    if (['black', 'white'].includes(gameLogic.boardProps.winner)) {
      endGame();
    }
  }, [gameLogic.boardProps.winner]);

  useEffect(() => {
    setGamestate((state) => ({
      ...state,
      history: gameLogic.history.map((h) => h.fen),
    }));
  }, [gameLogic.history]);

  return (
    <>
      <EndOfGame
        winner={gameLogic.boardProps.winner}
        onClick={() => {
          setWinnerDialogueOpen(false);
          history.push('/profile');
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
