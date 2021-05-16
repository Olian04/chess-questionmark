import React from 'react';
import { useRecoilValue } from 'recoil';
import { BackgroundCircle } from '../components/common/BackgroundCircle';
import { backgroundCircleState } from '../state/backgroundCircle';

export const BackgroundCirclePresenter = () => {
  const side = useRecoilValue(backgroundCircleState);
  return <BackgroundCircle side={side} />;
};
