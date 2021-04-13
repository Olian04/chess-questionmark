import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { GameView } from '../views/GameView';
import { gameState } from '../state/board';

export const GamePresenter = () => {
  const [game, setGame] = useRecoilState(gameState);

  useEffect(() => {
    console.log(game);
  }, [game]);

  return <GameView />;
};
