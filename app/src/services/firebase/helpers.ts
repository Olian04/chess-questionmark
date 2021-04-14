import { createMatch } from './storage';
import { getMatchByID } from './realtimeDB';

export const migrateMatchFromRealtimeDBToFirestore = async (
  matchID: string
) => {
  const match = await getMatchByID(matchID);
  createMatch(match);
};
