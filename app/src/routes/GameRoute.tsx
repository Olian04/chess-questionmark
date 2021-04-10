import React from 'react';
import { GameView } from '../views/GameView';

import { LoadingAnimation } from '../components/common/LoadingAnimation';

export const GameRoute = () => {
  return (
    <>
      <React.Suspense fallback={<LoadingAnimation />}>
        <GameView />
      </React.Suspense>
    </>
  );
};
