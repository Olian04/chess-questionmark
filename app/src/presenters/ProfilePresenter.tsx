import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { fetchRandomPuzzle } from '../services/chess';
import { createLiveGame } from '../services/firebase/realtimeDB';
import { profileCollection } from '../services/firebase/storage';
import { currentGameState } from '../state/game';
import { profileState, profileStatusState, userState } from '../state/user';
import { LiveGame } from '../types/live/LiveGame';
import { ProfileView } from '../views/ProfileView';

export const ProfileProvider = () => {
  const user = useRecoilValue(userState);
  const profileStatus = useRecoilValue(profileStatusState);
  const history = useHistory();

  const profileDetails = useRecoilCallback(({ set }) => async () => {
    set(profileStatusState, 'fetching');
    if (!user) {
      set(profileStatusState, 'fail');
      return;
    }

    let profile = undefined;
    try {
      profile = await profileCollection.get(user.id);
    } catch {
      /** Should probably should be a cloud function */
      set(profileStatusState, 'pending');
      profileCollection.set(user.id, {
        rank: 1500,
        rankDelta: 'N/A',
        wins: 0,
        losses: 0,
        draws: 0,
        recentMatches: [],
      });
    }

    if (profile === undefined) {
      set(profileStatusState, 'fetching');
      profile = await profileCollection.get(user.id);
    }

    set(profileStatusState, 'success');
    /* @ts-ignore */
    set(profileState, profile);
    return;
  });
  
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
  return (
    <ProfileView
      user={user}
      profileExists={profileStatus === 'success'}
      fetchDetails={profileDetails}
      onClickStartPuzzle={initBoard}
    />
  );
};
