import React from 'react';
import { BackgroundCircle } from '../components/common/BackgroundCircle';
import { ProfileProvider } from '../presenters/ProfilePresenter';

export const ProfileRoute = () => {
  return (
    <>
      {/*
        FIXME: For some reason the background circle ends up on top of some elements inside of PlayView
      */}
      {/* <BackgroundCircle side="top" /> */}
      <ProfileProvider />
    </>
  );
};