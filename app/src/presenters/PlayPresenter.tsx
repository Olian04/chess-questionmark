import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, waitForAll } from 'recoil';

import { fetchRandomPuzzle } from '../services/chess';
import {
  createLiveGame,
  getGameObserver,
  getPlayerObserver,
} from '../services/firebase/realtimeDB';
import { currentGameState, requestGame } from '../state/game';
import { userHydrateState, userState } from '../state/user';
import { LiveGame } from '../types/live/LiveGame';
import { PlayView } from '../views/PlayView';

export const PlayPresenter = () => {
  const history = useHistory();
  const [gameCount, setGameCount] = useState(-1);
  const [playerCount, setPlayerCount] = useState(-1);

  const initBoard = useRecoilCallback(({ snapshot, set }) => async () => {
    const { id: userId } = await snapshot.getPromise(userHydrateState);
    const game = await snapshot.getPromise(requestGame);
    if (game.state === 'ended' && game.winner === 'N/A') {
      const fenString = await fetchRandomPuzzle();

      const newGame: LiveGame = {
        turn: 'playerOne',
        playerOne: userId,
        playerTwo: 'AI',
        winner: 'N/A',
        state: 'playing',
        history: [fenString],
      };

      await set(requestGame, newGame);
      await createLiveGame(newGame);
    }
    history.push('/puzzle');
  });

  useEffect(() => {
    const observer = getGameObserver((count) => setGameCount(count));

    return () => observer.unsubscribe();
  }, [gameCount]);

  useEffect(() => {
    const observer = getPlayerObserver((count) => setPlayerCount(count));

    return () => observer.unsubscribe();
  }, [playerCount]);

  return (
    <PlayView
      onClickStartPuzzle={initBoard}
      gameCount={gameCount}
      playerCount={playerCount}
    />
  );
};
