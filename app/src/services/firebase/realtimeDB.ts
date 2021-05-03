import { app } from '.';
import 'firebase/database';
import { Md5 } from 'md5-typescript';
import { LiveGame } from '../../types/live/LiveGame';

const db = app.database();

const __getGameByUserID = async (userID: string) => {
  const snap = await db.ref('/games').get();
  if (!snap.exists()) return;
  const allGames = Object.entries(snap.val()) as [string, LiveGame][];
  const maybeGameInfo = allGames.find(
    ([_, v]) => v.playerOne === userID || v.playerTwo === userID
  );
  return maybeGameInfo;
};

export const createLiveGame = async (game: LiveGame) => {
  const matchID = Md5.init(Math.random());
  return db.ref(`/games/${matchID}`).set(game);
};

export const updateLiveGameByUserID = async (
  userID: string,
  partialGame: Partial<LiveGame>
) => {
  const maybeGameInfo = await __getGameByUserID(userID);
  if (maybeGameInfo) {
    const [gameId] = maybeGameInfo;
    return db.ref(`/games/${gameId}`).update(partialGame);
  }
};

export const getLiveGameByUserID = async (
  userID: string
): Promise<LiveGame | null> => {
  const maybeGameInfo = await __getGameByUserID(userID);
  if (maybeGameInfo) {
    const [_, gameData] = maybeGameInfo;
    return gameData;
  }
  return null;
};

export const deleteLiveGameByUserID = async (userID: string) => {
  const maybeGameInfo = await __getGameByUserID(userID);
  if (maybeGameInfo) {
    const [gameId] = maybeGameInfo;
    return db
      .ref(`/games/${gameId}`)
      .remove()
      .then(() => {});
  }
};
