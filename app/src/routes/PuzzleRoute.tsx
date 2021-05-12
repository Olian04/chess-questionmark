import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { PuzzlePresenter } from '../presenters/PuzzlePresenter';
import { backgroundCircleState } from '../state/backgroundCircle';
import { requestGame } from '../state/game';
import { pillState } from '../state/pill';
import { LoadingView } from '../views/LoadingView';

const Content = () => {
  const currentGame = useRecoilValue(requestGame);

  if (currentGame.playerOne !== '') {
    return (
      <React.Suspense fallback={<LoadingView message="Fetching state" />}>
        <PuzzlePresenter />
      </React.Suspense>
    );
  }
  return <Redirect to="/play" />;
};

export const PuzzleRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('hidden');
    setPill(1);
  });

  return (
    <React.Suspense fallback={<LoadingView message="Fetching state" />}>
      <Content />
    </React.Suspense>
  );
};
