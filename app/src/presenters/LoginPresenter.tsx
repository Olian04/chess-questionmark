import React from 'react';
import { useHistory } from 'react-router-dom';
import { LoginView } from '../views/LoginView';

export const LoginPresenter = () => {
  const history = useHistory();

  const handleSignUp = () => {
    history.push('/login/sign-up');
  };
  const handleSignIn = () => {
    history.push('/login/sign-in');
  };

  return (
    <LoginView onClickSignIn={handleSignIn} onClickSignUp={handleSignUp} />
  );
};
