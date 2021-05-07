import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { fetchRandomGame } from '../services/firebase/storage';
import { randomGameState } from '../state/game';
import { LoginView } from '../views/LoginView';

export const LoginPresenter = () => {
  const history = useHistory();

  const [game, setGame] = useRecoilState(randomGameState);

  const handleSignUp = () => {
    history.push('/login/sign-up');
  };
  const handleSignIn = () => {
    history.push('/login/sign-in');
  };

  const hydrateGame = useRecoilCallback(({ set }) => async () => {
    const games = await fetchRandomGame();
    set(randomGameState, games);
  });

  useEffect(() => {
    (async () => await hydrateGame())();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (game.history.length > 0) {
        const history = [...game.history] as string[];
        const currentFen = history.splice(0, 1)[0];
        setGame({ ...game, history: [...history, currentFen] });
      }
      //(async () => await hydrateGame())();
    }, 1000);
    return () => clearInterval(interval);
  }, [game]);
  return (
    <LoginView
      onClickSignIn={handleSignIn}
      onClickSignUp={handleSignUp}
      game={game}
    />
  );
};
