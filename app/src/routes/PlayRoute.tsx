import React from 'react';
import { BackgroundCircle } from '../components/common/BackgroundCircle';

import { PlayView } from '../views/PlayView';

export const PlayRoute = () => {
  return (
    <>
      {/*
        FIXME: For some reason the background circle ends up on top of some elements inside of PlayView
      */}
      <BackgroundCircle side="bottom" />
      <PlayView />
    </>
  );
};
