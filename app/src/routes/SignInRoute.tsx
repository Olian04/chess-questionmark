import React from 'react';
import { BackgroundCircle } from '../components/common/BackgroundCircle';
import { SignInView } from '../views/SignInView';

export const SignInRoute = () => {
  return (
    <>
      <BackgroundCircle side="right" />
      <SignInView />
    </>
  );
};
