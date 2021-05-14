import { app } from '.';
import 'firebase/firestore';
import { Profile } from '../../types/Profile';
import { UserExtras } from '../../types/UserExtras';
import {
  StorageGameLocal,
  StorageGameRemote,
} from '../../types/storage/StorageGame';
import { User } from '../../types/User';
import { RandomGame } from '../../types/RandomGame';
import { defaultProfileState } from '../../state/user';
import { randomIntegerBetween } from '../../util/math';
import { fallbackRandomGameState } from '../../state/game';

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

export const fetchRandomGame = async (): Promise<RandomGame> => {
  const handpickedGames = [
    '0qoNTSxynGmxxgO5OXXz',
    '0vVigDQnHzqH93cQy7tS',
    '16iNcCt8R6dJSLVSn29q',
    '5DkA7LGogmMx8fGzIkTO',
    '6QSowXYytXYel0c8Dlp1',
  ];

  const doc = db
    .collection('games')
    .doc(handpickedGames[randomIntegerBetween(0, handpickedGames.length - 1)]);

  const game = await (await doc.get()).data();
  const countries = ['US', 'SE', 'NO', 'CA', 'FR', 'PL', 'RU'];
  return {
    history: game?.history ?? fallbackRandomGameState,
    player: {
      name: 'anonymous',
      rank: 2000 - randomIntegerBetween(0, 600),
      countryCode: countries[randomIntegerBetween(0, countries.length - 1)],
    },
  };
};

export const profileCollection = {
  collection: db.collection('profiles'),
  get: async function (id: string) {
    if (id === 'N/A') return defaultProfileState;
    const document = await this.collection.doc(id).get();
    if (!document.exists) return defaultProfileState;

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
  has: async (id: string) => {
    const document = await userCollection.collection.doc(id).get();
    return document.exists;
  },
  get: async (id: string) => {
    const document = await userCollection.collection.doc(id).get();
    if (!document.exists) {
      throw new Error(`Document with id "${id}" does not exist`);
    }

    return document.data() as UserExtras;
  },
  set: async (id: string, document: Partial<UserExtras>) => {
    return userCollection.collection
      .doc(id)
      .set(document)
      .catch((e) => console.log(e));
  },
  update: async (id: string, document: Partial<UserExtras>) => {
    return userCollection.collection
      .doc(id)
      .update(document)
      .catch((e) => console.log(e));
  },
};
