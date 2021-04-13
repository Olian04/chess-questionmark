import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { backgroundCircleState } from '../state/backgroundCircle';
import { pillState } from '../state/pill';

import { PlayView } from '../views/PlayView';

export const PlayRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);
  const setPill = useSetRecoilState(pillState);
  useEffect(() => {
    setSide('bottom');
    setPill(0);
  });
  return (
    <>
      <PlayView />
    </>
  );
};
