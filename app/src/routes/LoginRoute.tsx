import React from 'react';
import { BackgroundCircle } from '../components/common/BackgroundCircle';
import { LoginView } from '../views/LoginView';

export const LoginRoute = () => {
  return (
    <>
      <BackgroundCircle side="right" />
      <LoginView />
    </>
  );
};
