import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ProfileProvider } from '../presenters/ProfilePresenter';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';

export const ProfileRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('top');
    setPill(1);
  });
  return (
    <>
      <ProfileProvider />
    </>
  );
};
