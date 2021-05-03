import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { backgroundCircleState } from '../state/backgroundCircle';
import { LoginPresenter } from '../presenters/LoginPresenter';

export const LoginRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  useEffect(() => setSide('bottom'));
  return <LoginPresenter />;
};
