import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { backgroundCircleState } from '../state/backgroundCircle';
import { GamePresenter } from '../presenters/GamePresenter';
import { pillState } from '../state/pill';

export const GameRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('hidden');
    setPill(0);
  });
  return (
    <>
      <GamePresenter />
    </>
  );
};
