import { selector, atom } from 'recoil';
import { fetchRandomPuzzle } from '../services/chess';
import { getLiveGameByUserID } from '../services/firebase/realtimeDB';
import { LiveGame } from '../types/live/LiveGame';
import { userState } from './user';

const fallbackGameState: LiveGame = {
  turn: 'playerOne',
  winner: 'N/A',
  state: 'ended',
  history: [],
  playerOne: '',
  playerTwo: '',
};

export const currentGameState = atom<LiveGame>({
  key: 'GAME_STATE',
  default: selector({
    key: 'GAME_STATE/DEFAULT',
    get: async ({ get }) => {
      const user = get(userState);
      const maybeGame = await getLiveGameByUserID(user.id);
      return maybeGame ?? fallbackGameState;
    },
  }),
});
