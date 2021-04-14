import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { createAIMatch } from '../services/firebase/realtimeDB';
import { fetchPuzzle } from '../state/board';
import { currentMatchIDState } from '../state/match';
import { userState } from '../state/user';
import { PlayView } from '../views/PlayView';

export const PlayPresenter = () => {
  const user = useRecoilValue(userState);
  const history = useHistory();

  const startPuzzle = useRecoilCallback(({ snapshot, set }) => async () => {
    const puzzleFen = await snapshot.getPromise(fetchPuzzle);
    const matchID = await createAIMatch(user.id, puzzleFen);
    set(currentMatchIDState, matchID);
    history.push('/puzzle');
  });

  return <PlayView onClickStartPuzzle={startPuzzle} />;
};
