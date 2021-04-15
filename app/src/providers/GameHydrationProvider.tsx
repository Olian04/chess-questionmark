import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { getLiveGameByUserID } from '../services/firebase/realtimeDB';
import { currentGameState } from '../state/game';
import { userState } from '../state/user';

export const GameHydrationProvider = () => {
  const user = useRecoilValue(userState);

  const fetchExsistingMatch = useRecoilCallback(
    ({ set, reset }) => async () => {
      try {
        const game = await getLiveGameByUserID(user.id);
        console.log(game);
        set(currentGameState, game);
      } catch {
        reset(currentGameState);
      }
    }
  );

  useEffect(() => {
    fetchExsistingMatch();
  }, [user.id]);

  return null;
};
