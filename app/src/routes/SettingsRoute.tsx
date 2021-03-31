import React from 'react';
import { BackgroundCircle } from '../components/common/BackgroundCircle';
import { SettingsProvider } from '../presenters/SettingsPresenter';

export const SettingsRoute = () => {
  return (
    <>
      <BackgroundCircle side="left" />
      <SettingsProvider />
    </>
  );
};
