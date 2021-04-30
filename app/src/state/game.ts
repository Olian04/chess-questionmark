import { selector, atom } from 'recoil';
import { getLiveGameByUserID } from '../services/firebase/realtimeDB';
import { LiveGame } from '../types/live/LiveGame';
import { userHydrateState, userState } from './user';

const fallbackGameState: LiveGame = {
  turn: 'playerOne',
  winner: 'N/A',
  state: 'ended',
  history: [],
  playerOne: '',
  playerTwo: '',
};

const currentGameBaseState = atom<LiveGame>({
  key: 'GAME_BASE_STATE',
  default: fallbackGameState,
});

export const currentGameState = selector<LiveGame>({
  key: 'GAME_SELECTOR',
  get: async ({ get }) => {
    const user = await get(userHydrateState);
    console.log(user);
    const maybeGame = await getLiveGameByUserID(user.id);
    return maybeGame ?? get(currentGameBaseState);
  },
  set: async ({ set }, newValue) => {
    set(currentGameBaseState, newValue);
  },
});
