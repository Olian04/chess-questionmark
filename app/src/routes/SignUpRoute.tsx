import React from 'react';
import { BackgroundCircle } from '../components/common/BackgroundCircle';
import { SignUpView } from '../views/SignUp';

export const SignUpRoute = () => {
  return (
    <>
      <BackgroundCircle side="right" />
      <SignUpView />
    </>
  );
};
