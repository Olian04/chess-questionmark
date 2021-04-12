import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { SettingsProvider } from '../presenters/SettingsPresenter';
import { backgroundCircleState } from '../state/backgroundCircle';

export const SettingsRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);

  useEffect(() => setSide('left'));
  return (
    <>
      <SettingsProvider />
    </>
  );
};
