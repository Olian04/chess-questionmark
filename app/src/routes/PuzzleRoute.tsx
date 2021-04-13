import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { PuzzlePresenter } from '../presenters/PuzzlePresenter';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';

export const PuzzleRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('hidden');
    setPill(0);
  });
  return (
    <>
      <PuzzlePresenter />
    </>
  );
};
