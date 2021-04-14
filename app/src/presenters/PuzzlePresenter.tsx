import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { PuzzleView } from '../views/PuzzleView';
import { gameState } from '../state/board';
import { currentMatchIDState } from '../state/match';
import { addFenStateToMatch } from '../services/firebase/realtimeDB';
import { migrateMatchFromRealtimeDBToFirestore } from '../services/firebase/helpers';
import { useHistory } from 'react-router';

export const PuzzlePresenter = () => {
  const [currentMatchID, setCurrentMatchID] = useRecoilState(
    currentMatchIDState
  );
  const [game, setGame] = useRecoilState(gameState);
  const [time, setTime] = useState(900);
  const history = useHistory();

  useEffect(() => {
    if (game === null) {
      return;
    }
    if (currentMatchID === null) {
      console.error('Missing current match id');
      return;
    }
    addFenStateToMatch(currentMatchID, game.fen);
    if (game.winner) {
      migrateMatchFromRealtimeDBToFirestore(currentMatchID);
      setCurrentMatchID(null);
    }
  }, [game]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  }, []);

  return (
    <React.Suspense fallback={<LoadingAnimation />}>
      <PuzzleView
        time={time}
        onUpdate={(s) => setGame(s)}
        onClickBack={() => {
          history.push('/profile');
        }}
      />
    </React.Suspense>
  );
};
