import { selector, atom } from 'recoil';
import { getLiveGameByUserID } from '../services/firebase/realtimeDB';
import { LiveGame } from '../types/live/LiveGame';
import { userHydrateState, userState } from './user';

export const fallbackGameState: LiveGame = {
  turn: 'playerOne',
  winner: 'N/A',
  state: 'ended',
  history: [],
  playerOne: '',
  playerTwo: '',
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
    console.warn('GET:', maybeGame);
    return maybeGame ?? get(currentGameBaseState);
  },
  set: async ({ set }, newValue) => {
    console.warn('SET', newValue);
    set(currentGameBaseState, newValue);
  },
});
