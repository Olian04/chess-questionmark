import { selector, atom } from 'recoil';

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
