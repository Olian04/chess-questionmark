import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { backgroundCircleState } from '../state/backgroundCircle';
import { LoginView } from '../views/LoginView';

export const LoginRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  useEffect(() => setSide('right'));
  return (
    <>
      <LoginView />
    </>
  );
};
