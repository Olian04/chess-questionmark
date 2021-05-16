import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { fetchRandomPuzzle } from '../services/chess';
import { createLiveGame } from '../services/firebase/realtimeDB';
import { profileCollection } from '../services/firebase/storage';
import { greet } from '../services/greeter';
import { requestGame } from '../state/game';
import {
  profileStatusState,
  profileState,
  userState,
  profileData,
  currentUserIDState,
} from '../state/user';
import { LiveGame } from '../types/live/LiveGame';
import { PlayView } from '../views/PlayView';

export const PlayPresenter = () => {
  const user = useRecoilValue(userState);
  const profile = useRecoilValue(profileState);
  const gamestate = useRecoilValue(requestGame);
  const setProfile = useSetRecoilState(profileData(user.id));
  const [profileStatus, setProfileStatus] = useRecoilState(profileStatusState);

  const [greeting, setGreeting] = useState<string>();
  const [liveGame, setLiveGame] = useState(false);
  const [isLoadingPuzzle, setIsLoadingPuzzle] = useState(false);

  const history = useHistory();

  const initBoard = useRecoilCallback(({ snapshot, set }) => async () => {
    setIsLoadingPuzzle(true);
    const userID = await snapshot.getPromise(currentUserIDState);
    if (userID === null) {
      throw new Error(`Unexpected null userID at board initialization`);
    }

    const game = await snapshot.getPromise(requestGame);
    if (game.state !== 'playing' && game.winner === 'N/A') {
      const fenString = await fetchRandomPuzzle();

      const timeLeft = 2 * 60;

      const newGame: LiveGame = {
        turn: 'playerOne',
        playerOne: userID,
        playerTwo: 'AI',
        winner: 'N/A',
        state: 'playing',
        history: [fenString],
        timeLeft,
      };

      await set(requestGame, newGame);
      await createLiveGame(newGame);
      setIsLoadingPuzzle(false);
    }
    history.push('/puzzle');
  });

  const hydrateProfile = () => {
    if (user) {
      setProfileStatus('pending');
      if (user.id === 'N/A') {
        return;
      }
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
    if (user && user.id !== 'N/A') {
      setGreeting(greet(user.name));
    }
    const unsubscribe = hydrateProfile();
    return unsubscribe;
  }, [user?.id]);

  useEffect(() => {
    if (gamestate && gamestate.state && gamestate.state === 'playing') {
      setLiveGame(true);
    } else {
      setLiveGame(false);
    }
  }, []);

  return (
    <PlayView
      username={user.name}
      email={user.email}
      profile={profile}
      liveGame={liveGame}
      isLoadingPuzzle={isLoadingPuzzle}
      isLoadingProfile={profileStatus !== 'success'}
      greeting={greeting}
      handleReplay={handleReplay}
      onClickStartPuzzle={initBoard}
    />
  );
};
