import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { backgroundCircleState } from '../state/backgroundCircle';

import { PlayView } from '../views/PlayView';

export const PlayRoute = () => {
  const setSide = useSetRecoilState(backgroundCircleState);

  useEffect(() => setSide('bottom'));
  return (
    <>
      <PlayView />
    </>
  );
};
