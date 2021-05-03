import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { PlayPresenter } from '../presenters/PlayPresenter';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';

export const PlayRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('top');
    setPill(1);
  });
  return <PlayPresenter />;
};
