import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { SignInPresenter } from '../presenters/SignInPresenter';
import { backgroundCircleState } from '../state/backgroundCircle';

export const SignInRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);

  useEffect(() => setSide('bottom'));
  return <SignInPresenter />;
};
