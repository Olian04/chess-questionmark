import { createStorageGame, profileCollection } from '../storage';
import { getLiveGameByUserID, deleteLiveGameByUserID } from '../realtimeDB';
import { User } from '../../../types/User';
import { LiveGame } from '../../../types/live/LiveGame';
import { StorageGame } from '../../../types/storage/StorageGame';

export const migrateGameByUserID = async (userID: string) => {
  const liveGame = await getLiveGameByUserID(userID);
  if (liveGame.winner === 'N/A') {
    throw new Error(`Can't migrate game with no winner`);
  }

  console.log('migrate', liveGame);
  if (liveGame) {
    const winner = {
      playerOne: liveGame.playerOne,
      playerTwo: liveGame.playerTwo,
    }[liveGame.winner];

    const loser = {
      playerTwo: liveGame.playerOne,
      playerOne: liveGame.playerTwo,
    }[liveGame.winner];

    const id = await createStorageGame({
      history: liveGame.history,
      winnerID: winner,
      loserID: loser,
    });

    const profile = await profileCollection.getRaw(liveGame.playerOne);

    profileCollection.updateRaw(liveGame.playerOne, {
      recentMatches: [...(profile?.recentMatches ?? []), id],
    });

    return deleteLiveGameByUserID(userID);
  }
};
