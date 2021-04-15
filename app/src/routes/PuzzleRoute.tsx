import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { PuzzlePresenter } from '../presenters/PuzzlePresenter';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';
import { currentGameState } from '../state/game';
import { LoadingView } from '../views/LoadingView';
import { Redirect } from 'react-router-dom';
import { Snackbar } from '../components/common/Snackbar';

export const PuzzleRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('hidden');
    setPill(0);
  });
  return (
    <>
      <React.Suspense fallback={<LoadingView message="Fetching state" />}>
        <PuzzlePresenter />
      </React.Suspense>
    </>
  );
};
