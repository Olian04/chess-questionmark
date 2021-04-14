import { Winner } from './Winner';

export interface Game {
  turn: 'b' | 'w';
  fen: string;
  winner: Winner;
  against: 'ai' | 'human';
}
