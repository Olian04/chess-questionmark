import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { AboutPresenter } from '../presenters/AboutPresenter';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';

export const AboutRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);

  useEffect(() => {
    setSide('right');
    setPill(2);
  });
  return <AboutPresenter />;
};
