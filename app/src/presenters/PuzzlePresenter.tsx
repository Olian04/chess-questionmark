import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { PuzzleView } from '../views/PuzzleView';
import { gameState } from '../state/board';

export const PuzzlePresenter = () => {
  const [game, setGame] = useRecoilState(gameState);
  const [time, setTime] = useState(900);

  useEffect(() => {
    console.log(game);
  }, [game]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  });

  return (
    <React.Suspense fallback={<LoadingAnimation />}>
      <PuzzleView time={time} onUpdate={(s) => setGame(s)} />
    </React.Suspense>
  );
};
