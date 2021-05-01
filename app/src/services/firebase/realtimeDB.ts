import firebase from 'firebase';
import { app } from '.';
import 'firebase/database';
import { Md5 } from 'md5-typescript';
import { LiveGame } from '../../types/live/LiveGame';
import { User } from '../../types/User';
import React from 'react';

const db = app.database();

const getValue = async (path: string) => await (await db.ref(path).get()).val();

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

export const getGameObserver = (callback: (a: number) => void) => {
  const doc = db.ref('/games');
  doc.on('value', (snapshot) => {
    const games = snapshot.val();
    const amountOfGames = games === null ? 0 : Object.keys(games).length;
    callback(amountOfGames);
  });
  return { unsubscribe: () => doc.off('value') };
};

export const getPlayerObserver = (callback: (a: number) => void) => {
  const doc = db.ref('/games');
  doc.on('value', (snapshot) => {
    const games = snapshot.val();
    if (games === null) {
      callback(0);
    } else {
      const gamesArray = Object.entries(games) as [
        string,
        { playerOne: string; playerTwo: string }
      ][];
      const players = new Set();
      for (const [_, value] of gamesArray) {
        if (value.playerOne !== 'AI') players.add(value.playerOne);
        if (value.playerTwo !== 'AI') players.add(value.playerTwo);
      }
      callback(players.size);
    }
  });
  return { unsubscribe: () => doc.off('value') };
};
