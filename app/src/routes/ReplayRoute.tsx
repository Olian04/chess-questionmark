import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { backgroundCircleState } from '../state/backgroundCircle';
import { ReplayView } from '../views/ReplayView';

export const ReplayRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);

  useEffect(() => setSide('hidden'));
  return (
    <>
      <ReplayView />
    </>
  );
};
