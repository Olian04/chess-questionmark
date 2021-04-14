import { createMatch } from './storage';
import { getMatchByID, migrateMatchByUser } from './realtimeDB';
import { User } from '../../types/User';

export const migrateMatch = async (user: User) => {
  const [matchInfo, match] = await migrateMatchByUser(user);
  await createMatch({
    winner: matchInfo.winner,
    history: match.history as string[],
    against: matchInfo.against,
  });
};
