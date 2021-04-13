import { selector, atom } from 'recoil';
import { Game } from '../types/Game';

const url = 'https://api.chess.com/pub/puzzle/random';

export const fetchPuzzle = selector({
  key: 'FEN',
  get: async ({ get }) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.fen;
    } catch(err) {
      throw err;
    }
  }
});

export const gameState = atom<Game | null>({
  key: 'GAME_STATE',
  default: null,
});
