import React from 'react';
import { BackgroundCircle } from '../components/common/BackgroundCircle';
import { ProfileProvider } from '../presenters/ProfilePresenter';

export const ProfileRoute = () => {
  return (
    <>
      <BackgroundCircle side="top" />
      <ProfileProvider />
    </>
  );
};
