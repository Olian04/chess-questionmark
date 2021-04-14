import firebase from 'firebase';
import { app } from '.';
import 'firebase/database';
import { Md5 } from 'md5-typescript';
import { Match } from '../../types/Match';
import { Game } from '../../types/Game';
import { User } from '../../types/User';
import { PlayerInMatch } from '../../types/PlayerInMatch';

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

export const getMatchByUserID = async (
  userID: string
): Promise<Match | null> => {
  const ref = db.ref(`players-in-matches/${userID}`);
  const match = await (await ref.get()).val();
  return match;
};

const getRef = async (path: string) => await (await db.ref(path).get()).val();

export const createMatch = async (game: Game, user: User) => {
  // TODO: do logic for a human vs human game.
  const matchID = Md5.init(Math.random());
  db.ref(`/players-in-matches/${user.id}`).set({
    id: matchID,
    state: 'init',
    winner: 'N/A',
    against: game.against,
  });
  db.ref(`/matches/${matchID}`).set({
    player: user.id,
    history: {
      0: game.fen,
    },
    turn: game.turn,
  });
};

export const getExistingMatchByUserID = async (user: User) => {
  const playerInfo = await getRef(`/players-in-matches/${user.id}`);

  if (!playerInfo) return [null, null];
  const match = await getRef(`/matches/${playerInfo.id}`);
  if (!match) return [null, null];

  return [playerInfo, match];
};

export const updateMatchHistoryByUserID = async (user: User, game: Game) => {
  const matchInfo = await getRef(`/players-in-matches/${user.id}`);
  if (!matchInfo) return;
  const ref = db.ref(`/matches/${matchInfo.id}`);
  const history = await getRef(`/matches/${matchInfo.id}/history`);
  await ref.update({
    turn: game.turn,
    history: [...history, game.fen],
  });
};

export const migrateMatchByUser = async (
  user: User
): Promise<[PlayerInMatch, Match]> => {
  const matchInfo = (await getRef(
    `/players-in-matches/${user.id}`
  )) as PlayerInMatch;
  if (!matchInfo) {
    throw new Error(
      `No entry in "players-in-matches" for user with id "${user.id}"`
    );
  }
  const match = (await getRef(`/matches/${matchInfo.id}`)) as Match;
  return [matchInfo, match];
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
