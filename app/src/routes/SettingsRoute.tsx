import React from 'react';
import { BackgroundCircle } from '../components/common/BackgroundCircle';
import { SettingsView } from '../views/SettingsView ';

export const SettingsRoute = () => {
  return (
    <>
      <BackgroundCircle side="left" />
      <SettingsView />
    </>
  );
};
