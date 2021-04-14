import { atom, selector } from 'recoil';
import {
  getExistingMatchByUserID,
  updateMatchHistoryByUserID,
} from '../services/firebase/realtimeDB';
import { Game } from '../types/Game';
import { Match } from '../types/Match';
import { userState } from './user';

const currentMatchState = atom<Game | null>({
  key: 'CURRENT_MATCH',
  default: null,
});

export const currentMatchData = selector<Game | null>({
  key: 'CURRENT_MATCH_DATA',
  get: async ({ get }) => {
    const match = get(currentMatchState);
    if (match === null) {
      /** find match in db */
      const user = get(userState);
      const [playerInfo, match] = await getExistingMatchByUserID(user);

      if (!playerInfo || !match) return null;

      return {
        turn: match.turn,
        fen: match.history[match.history.length - 1],
        winner: playerInfo.winner,
        against: playerInfo.against,
      } as Game;
    }
    return match;
  },
  set: ({ set, get }, matchData) => {
    set(currentMatchState, matchData);

    const lastMatch = get(currentMatchState) as Game;
    if (matchData !== null && 'fen' in matchData) {
      if (lastMatch && lastMatch.fen !== matchData.fen) {
        const user = get(userState);
        updateMatchHistoryByUserID(user, matchData);
      }
    }
  },
});
