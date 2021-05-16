import { getTime } from 'date-fns';
import { selector, atom } from 'recoil';
import { getLiveGameByUserID } from '../services/firebase/realtimeDB';
import { LiveGame } from '../types/live/LiveGame';
import { RandomGame } from '../types/RandomGame';
import { currentUserIDState, userState } from './user';

export const fallbackGameState: LiveGame = {
  turn: 'playerOne',
  winner: 'N/A',
  state: 'N/A',
  history: [],
  playerOne: '',
  playerTwo: '',
  timeLeft: getTime(new Date()),
};

const countries = ['US', 'SE', 'NO', 'CA', 'FR', 'PL', 'RU'];

export const fallbackRandomGameState: RandomGame = {
  history: [
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
  ],
  player: {
    name: 'anonymous',
    rank: 2000 - Math.floor(Math.random() * 600),
    countryCode: countries[Math.floor(Math.random() * countries.length)],
  },
};

export const currentGameBaseState = atom<LiveGame>({
  key: 'GAME_BASE_STATE',
  default: fallbackGameState,
});

export const currentGameState = selector<LiveGame>({
  key: 'GAME_SELECTOR',
  get: async ({ get }) => {
    const id = get(currentUserIDState);
    if (id) {
      const maybeGame = await getLiveGameByUserID(id);
      if (maybeGame) return maybeGame;
    }
    return get(currentGameBaseState);
  },
  set: async ({ set }, newValue) => {
    set(currentGameBaseState, newValue);
  },
});

export const requestGame = atom<LiveGame>({
  key: 'REQUEST_GAME',
  default: selector<LiveGame>({
    key: 'REQUEST_GAME_SELECTOR',
    get: async ({ get }) => {
      const userID = await get(currentUserIDState);
      if (!userID) {
        throw new Error('RUN!');
      }
      const game = await fetchGame(userID);
      return game;
    },
    set: ({ set }, newGame) => {
      set(requestGame, newGame);
    },
  }),
});

export const randomGameState = atom<RandomGame>({
  key: 'RANDOM_GAME',
  default: fallbackRandomGameState,
});

const fetchGame = async (userID: string) => {
  const maybeGame = await getLiveGameByUserID(userID);
  return maybeGame ?? fallbackGameState;
};
