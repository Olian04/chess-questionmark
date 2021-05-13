import { createStorageGame, profileCollection } from '../storage';
import { getLiveGameByUserID, deleteLiveGameByUserID } from '../realtimeDB';
import { getAbsMaterialCostFromFen } from '../../chess';

export const migrateGameByUserID = async (userID: string) => {
  const liveGame = await getLiveGameByUserID(userID);
  if (liveGame === null) {
    throw new Error(`No game found for user with id: ${userID}`);
  }
  if (liveGame.winner === 'N/A') {
    throw new Error(`Can't migrate game with no winner`);
  }

  if (liveGame) {
    const winner = {
      Draw: userID,
      playerOne: liveGame.playerOne,
      playerTwo: liveGame.playerTwo,
    }[liveGame.winner];

    const loser = {
      Draw: 'AI',
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
      if (liveGame.winner === 'Draw') {
        profileCollection.updateRaw(userID, {
          draws: profile.draws + 1,
          recentMatches: [...profile.recentMatches, id],
        });
      } else {
        profileCollection.updateRaw(userID, {
          losses: userID === loser ? profile.losses + 1 : profile.losses,
          wins: userID === winner ? profile.wins + 1 : profile.wins,
          rank:
            userID === winner ? profile.rank + material : profile.rank - material,
          recentMatches: [...profile.recentMatches, id],
        });
      }
    }

    return deleteLiveGameByUserID(userID);
  }
};
