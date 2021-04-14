import firebase from 'firebase';
import { app } from '.';
import 'firebase/database';
import { Md5 } from 'md5-typescript';
import { Match } from '../../types/Match';

const db = app.database();

export const createAIMatch = async (
  playerID: string,
  initialFEN: string
): Promise<string> => {
  const matchID = Md5.init(Math.random());
  db.ref(`/matches/${matchID}`).set({
    player: playerID,
    history: {
      0: initialFEN,
    },
  });
  return matchID;
};

export const addFenStateToMatch = async (
  matchID: string,
  FEN: string
): Promise<string> => {
  const ref = db.ref(`/matches/${matchID}/history/`);
  const moveID = (await ref.get()).numChildren().toString();
  // TODO: Check if last history entry equals the new entry, then discard it since no changes has been made.
  // This will prevent a bug while developing with hot module reload
  db.ref(`/matches/${matchID}/history/${moveID}`).set(FEN);
  return moveID;
};

export const getMatchByID = async (matchID: string): Promise<Match> => {
  const ref = db.ref(`/matches/${matchID}`);
  const match = (await (await ref.get()).val()) as Match;
  return match;
};
