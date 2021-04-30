import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { PuzzlePresenter } from '../presenters/PuzzlePresenter';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';
import { LoadingView } from '../views/LoadingView';

export const PuzzleRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('hidden');
    setPill(0);
  });
  return (
    <React.Suspense fallback={<LoadingView message="Fetching state" />}>
      <PuzzlePresenter />
    </React.Suspense>
  );
};
