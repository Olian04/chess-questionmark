import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ProfileProvider } from '../presenters/ProfilePresenter';
import { backgroundCircleState } from '../state/backgroundCircle';

export const ProfileRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);

  useEffect(() => setSide('top'));
  return (
    <>
      <ProfileProvider />
    </>
  );
};
