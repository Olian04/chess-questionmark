import React from 'react';
import { BackgroundCircle } from '../components/common/BackgroundCircle';
import { SignUpPresenter } from '../presenters/SignUpPresenter';

export const SignUpRoute = () => {
  return (
    <>
      <BackgroundCircle side="right" />
      <SignUpPresenter />
    </>
  );
};
