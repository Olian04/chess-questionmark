import firebase from 'firebase';
import { app } from '.';
import 'firebase/firestore';
import { Profile } from '../../types/Profile';
import { UserExtras } from '../../types/UserExtras';
import {
  StorageGameLocal,
  StorageGameRemote,
} from '../../types/storage/StorageGame';
import { User } from '../../types/User';

const db = app.firestore();

export const createStorageGame = (game: StorageGameRemote) => {
  return db
    .collection('games')
    .add(game)
    .then((doc) => doc.id);
};

export const getStorageGameByID = async (matchID: string) => {
  const document = await db.doc(`/games/${matchID}`).get();
  const data = document.data() as StorageGameRemote;
  if (!data) return null;
  return {
    id: matchID,
    winner: await getUserByID(data.winnerID),
    loser: await getUserByID(data.loserID),
    history: data.history,
    material: data.material,
  } as StorageGameLocal;
};

const getUserByID = async (userID: string) => {
  if (userID === 'AI')
    return {
      name: 'AI',
      email: 'AI@stockfish.org',
      avatar: 'N/A',
    };
  const document = await db.doc(`/users/${userID}`).get();
  const data = document.data() as User;
  return {
    name: data.name,
    email: data.email,
    avatar: data.avatar,
  };
};

const getMatches = async (recentMatches: string[]) => {
  if (recentMatches.length > 0) {
    return await Promise.all(
      recentMatches.map((matchID: string) => getStorageGameByID(matchID))
    );
  }
  return recentMatches;
};

export const profileCollection = {
  collection: db.collection('profiles'),
  get: async function (id: string) {
    if (id === 'N/A') return null;
    const document = await this.collection.doc(id).get();
    if (!document.exists) return null;

    const data = document.data() as {
      rank: number;
      rankDelta: number | 'N/A';
      wins: number;
      losses: number;
      draws: number;
      recentMatches: any;
    };
    data.recentMatches = await getMatches(data.recentMatches);
    return data as Profile;
  },
  getRaw: async function (id: string) {
    if (id === 'N/A') return null;
    const document = await this.collection.doc(id).get();
    if (!document.exists) return null;

    const data = document.data();
    return data as {
      rank: number;
      rankDelta: number | 'N/A';
      wins: number;
      losses: number;
      draws: number;
      recentMatches: string[];
    };
  },
  set: async function (id: string, document: Partial<Profile>) {
    await this.collection
      .doc(id)
      .set(document)
      .catch((e) => console.log(e));
  },
  update: async function (id: string, document: Partial<Profile>) {
    await this.collection
      .doc(id)
      .update(document)
      .catch((e) => console.log(e));
  },
  updateRaw: async function (
    id: string,
    document: Partial<{
      rank: number;
      rankDelta: number | 'N/A';
      wins: number;
      losses: number;
      draws: number;
      recentMatches: string[];
    }>
  ) {
    await this.collection
      .doc(id)
      .update(document)
      .catch((e) => console.log(e));
  },

  observe: function (id: string, callback: (a: any) => void) {
    if (!id || id === 'N/A') return callback(null);

    const unsubscribe = this.collection.doc(id).onSnapshot(async (snap) => {
      if (!snap.exists) return callback(null);

      const data = snap.data();
      if (data) {
        data.recentMatches = await getMatches(data.recentMatches);
        callback(data);
      }
    });
    return unsubscribe;
  },
};

export const userCollection = {
  collection: db.collection('users'),
  get: async function (id: string) {
    const document = await this.collection.doc(id).get();
    if (!document.exists) throw new Error('Document does not exist');

    return document.data() as UserExtras;
  },
  set: async function (id: string, document: Partial<UserExtras>) {
    await this.collection
      .doc(id)
      .set(document)
      .catch((e) => console.log(e));
  },
  update: async function (id: string, document: Partial<UserExtras>) {
    await this.collection
      .doc(id)
      .update(document)
      .catch((e) => console.log(e));
  },
};
