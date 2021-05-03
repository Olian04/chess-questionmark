import { getTime } from 'date-fns';
import { selector, atom, GetRecoilValue } from 'recoil';
import {
  createLiveGame,
  getLiveGameByUserID,
} from '../services/firebase/realtimeDB';
import { LiveGame } from '../types/live/LiveGame';
import { userHydrateState } from './user';

export const fallbackGameState: LiveGame = {
  turn: 'playerOne',
  winner: 'N/A',
  state: 'ended',
  history: [],
  playerOne: '',
  playerTwo: '',
  timeLeft: getTime(new Date()),
};

export const currentGameBaseState = atom<LiveGame>({
  key: 'GAME_BASE_STATE',
  default: fallbackGameState,
});

export const currentGameState = selector<LiveGame>({
  key: 'GAME_SELECTOR',
  get: async ({ get }) => {
    const user = await get(userHydrateState);
    const maybeGame = await getLiveGameByUserID(user.id);
    return maybeGame ?? get(currentGameBaseState);
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
      const game = await fetchGame(get);
      return game;
    },
    set: ({ set }, newGame) => {
      set(requestGame, newGame);
    },
  }),
});

const fetchGame = async (get: GetRecoilValue) => {
  const user = await get(userHydrateState);
  const maybeGame = await getLiveGameByUserID(user.id);
  return maybeGame ?? fallbackGameState;
};
