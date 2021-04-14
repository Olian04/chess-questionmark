import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';
import { ReplayPresenter } from '../presenters/ReplayPresenter';

export const ReplayRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('hidden');
    setPill(1);
  });
  return (
    <>
      <ReplayPresenter />
    </>
  );
};
