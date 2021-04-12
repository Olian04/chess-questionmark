import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { backgroundCircleState } from '../state/backgroundCircle';
import { GameView } from '../views/GameView';

export const GameRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  useEffect(() => setSide('hidden'));
  return (
    <>
      <GameView />
    </>
  );
};
