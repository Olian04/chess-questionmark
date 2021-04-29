import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchRandomPuzzle } from '../services/chess';
import { createLiveGame } from '../services/firebase/realtimeDB';
import { currentGameState } from '../state/game';
import { userState } from '../state/user';
import { LiveGame } from '../types/live/LiveGame';
import { PlayView } from '../views/PlayView';

export const PlayPresenter = () => {
  const user = useRecoilValue(userState);
  const history = useHistory();

  const initBoard = useRecoilCallback(({ snapshot, set }) => async () => {
    const { id: userId } = await snapshot.getPromise(userState);
    const game = await snapshot.getPromise(currentGameState);
    if (game.state === 'ended') {
      const fenString = await fetchRandomPuzzle();

      const newGame: LiveGame = {
        turn: 'playerOne',
        playerOne: userId,
        playerTwo: 'AI',
        winner: 'N/A',
        state: 'playing',
        history: [fenString],
      };

      set(currentGameState, newGame);
      await createLiveGame(newGame);
    }
    history.push('/puzzle');
  });

  return <PlayView user={user} onClickStartPuzzle={initBoard} />;
};
