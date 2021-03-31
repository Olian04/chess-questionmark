import React from 'react';
import { BackgroundCircle } from '../components/common/BackgroundCircle';
import { SignInPresenter } from '../presenters/SignInPresenter';

export const SignInRoute = () => {
  return (
    <>
      <BackgroundCircle side="right" />
      <SignInPresenter />
    </>
  );
};
