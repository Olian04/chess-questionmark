import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { SignUpPresenter } from '../presenters/SignUpPresenter';
import { backgroundCircleState } from '../state/backgroundCircle';

export const SignUpRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);

  useEffect(() => setSide('top'));
  return <SignUpPresenter />;
};
