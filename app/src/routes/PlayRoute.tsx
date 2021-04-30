import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';
import { PlayPresenter } from '../presenters/PlayPresenter';

export const PlayRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('bottom');
    setPill(1);
  });
  return <PlayPresenter />;
};
