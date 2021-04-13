import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { backgroundCircleState } from '../state/backgroundCircle';
import { GamePresenter } from '../presenters/GamePresenter';

export const GameRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  useEffect(() => setSide('hidden'));
  return (
    <>
      <GamePresenter />
    </>
  );
};
