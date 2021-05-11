import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { fetchRandomPuzzle } from '../services/chess';
import { createLiveGame } from '../services/firebase/realtimeDB';
import { profileCollection } from '../services/firebase/storage';
import { greet } from '../services/greeter';
import { requestGame } from '../state/game';
import {
  profileStatusState,
  requestProfile,
  userHydrateState,
  userState,
} from '../state/user';
import { LiveGame } from '../types/live/LiveGame';
import { PlayView } from '../views/PlayView';

export const PlayPresenter = () => {
  const user = useRecoilValue(userHydrateState);
  const [profile, setProfile] = useRecoilState(requestProfile);
  const [profileStatus, setProfileStatus] = useRecoilState(profileStatusState);

  const [greeting, setGreeting] = useState<string>();

  const history = useHistory();

  const initBoard = useRecoilCallback(({ snapshot, set }) => async () => {
    const { id: userId } = await snapshot.getPromise(userHydrateState);
    const game = await snapshot.getPromise(requestGame);
    if (game.state === 'ended' && game.winner === 'N/A') {
      const fenString = await fetchRandomPuzzle();

      const timeLeft = 15 * 60;

      const newGame: LiveGame = {
        turn: 'playerOne',
        playerOne: userId,
        playerTwo: 'AI',
        winner: 'N/A',
        state: 'playing',
        history: [fenString],
        timeLeft,
      };

      await set(requestGame, newGame);
      await createLiveGame(newGame);
    }
    history.push('/puzzle');
  });

  const hydrateProfile = () => {
    if (user) {
      setProfileStatus('pending');
      return profileCollection.observe(user.id, (profile) => {
        setProfileStatus('fetching');
        if (profile) {
          setProfile(profile);
          setProfileStatus('success');
          return;
        }

        setProfileStatus('fail');
      });
    }
  };

  const handleReplay = (id: string) => {
    history.push(`/replay/${id}`);
  };

  useEffect(() => {
    const unsubscribe = hydrateProfile();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user && user.id !== 'N/A') setGreeting(greet(user.name));
  }, []);

  useEffect(() => console.log(user, profile), []);
  return (
    <PlayView
      user={user}
      profile={profile}
      isLoading={profileStatus !== 'success'}
      greeting={greeting}
      handleReplay={handleReplay}
      onClickStartPuzzle={initBoard}
    />
  );
};
