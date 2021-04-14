import React, { useState, useEffect } from 'react';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { PuzzleView } from '../views/PuzzleView';
import { fetchPuzzle, gameState } from '../state/board';
import { currentMatchData, currentMatchState } from '../state/match';
import {
  addFenStateToMatch,
  createMatch,
} from '../services/firebase/realtimeDB';
import {
  migrateMatch,
  migrateMatchFromRealtimeDBToFirestore,
} from '../services/firebase/helpers';
import { useHistory } from 'react-router';
import { userState } from '../state/user';
import { fetchRandomPuzzle } from '../services/chess';
import { Game } from '../types/Game';
import { Match } from '../types/Match';

export const PuzzlePresenter = () => {
  /*
  const [currentMatchID, setCurrentMatchID] = useRecoilState(
    currentMatchIDState
  );
  const [game, setGame] = useRecoilState(gameState);
  const [time, setTime] = useState(900);
  const [winnerDialogueOpen, setWinnerDialogueOpen] = useState(false);
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
      setWinnerDialogueOpen(true);
    }
  }, [game]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  }, []);
  */
  const user = useRecoilValue(userState);

  const initBoard = useRecoilCallback(({ snapshot, set }) => async () => {
    const match = await snapshot.getPromise(currentMatchData);
    if (!match) {
      const fenString = await fetchRandomPuzzle();

      const gameMatch = {
        turn: 'w',
        fen: fenString,
        winner: 'N/A',
        against: 'ai',
      } as Game;

      set(currentMatchData, gameMatch);
      await createMatch(gameMatch, user);
      return;
    }

    set(currentMatchData, match);
  });

  const [game, setGame] = useRecoilState(currentMatchData);
  const [time, setTime] = useState(900);
  const [winnerDialogueOpen, setWinnerDialogueOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (user && user.id !== 'N/A') initBoard();
  }, [user.id]);

  useEffect(() => {
    if (game !== null && game.winner !== 'N/A') {
      migrateMatch(user);
    }
  }, [game]);
  return (
    <PuzzleView
      time={time}
      onUpdate={(s) => setGame(s)}
      onClickBack={() => {
        setWinnerDialogueOpen(false);
        history.push('/profile');
      }}
      openWinnerDialogue={winnerDialogueOpen}
      game={game}
    />
  );
};
