import { selector, atom } from 'recoil';
import { fetchRandomPuzzle } from '../services/chess';
import { Game } from '../types/Game';

// shouldnt be done like this

export const fetchPuzzle = selector<string>({
  key: 'FEN',
  get: fetchRandomPuzzle,
});

export const gameState = atom<Game | null>({
  key: 'GAME_STATE',
  default: null,
});
