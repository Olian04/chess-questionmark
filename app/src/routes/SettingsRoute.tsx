import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { SettingsProvider } from '../presenters/SettingsPresenter';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';

export const SettingsRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);

  useEffect(() => {
    setSide('left');
    setPill(2);
  });
  return (
    <>
      <SettingsProvider />
    </>
  );
};
