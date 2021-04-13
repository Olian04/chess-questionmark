import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';
import { ReplayView } from '../views/ReplayView';

export const ReplayRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('hidden');
    setPill(1);
  });
  return (
    <>
      <ReplayView />
    </>
  );
};
