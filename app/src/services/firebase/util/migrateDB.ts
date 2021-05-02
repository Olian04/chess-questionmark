import { createStorageGame, profileCollection } from '../storage';
import { getLiveGameByUserID, deleteLiveGameByUserID } from '../realtimeDB';
import { getAbsMaterialCostFromFen } from '../../chess';

export const migrateGameByUserID = async (userID: string) => {
  const liveGame = await getLiveGameByUserID(userID);
  if (liveGame.winner === 'N/A') {
    throw new Error(`Can't migrate game with no winner`);
  }

  if (liveGame) {
    const winner = {
      playerOne: liveGame.playerOne,
      playerTwo: liveGame.playerTwo,
    }[liveGame.winner];

    const loser = {
      playerTwo: liveGame.playerOne,
      playerOne: liveGame.playerTwo,
    }[liveGame.winner];

    const fen = liveGame.history[liveGame.history.length - 1];
    const material = getAbsMaterialCostFromFen(fen);

    const id = await createStorageGame({
      history: liveGame.history,
      winnerID: winner,
      loserID: loser,
      material: material,
    });

    const profile = await profileCollection.getRaw(liveGame.playerOne);

    if (profile) {
      profileCollection.updateRaw(userID, {
        losses: userID === loser ? profile.losses + 1 : profile.losses,
        wins: userID === winner ? profile.wins + 1 : profile.wins,
        rank:
          userID === winner ? profile.rank + material : profile.rank - material,
        recentMatches: [...profile.recentMatches, id],
      });
    }

    return deleteLiveGameByUserID(userID);
  }
};
