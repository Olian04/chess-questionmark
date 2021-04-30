import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { AccountPresenter } from '../presenters/AccountPresenter';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';

export const AccountRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);

  useEffect(() => {
    setSide('left');
    setPill(0);
  });
  return <AccountPresenter />;
};
