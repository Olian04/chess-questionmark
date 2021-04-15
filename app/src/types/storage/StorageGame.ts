// Storage games are the games in the Firestore Database

export interface StorageGame {
  history: string[];
  winnerID: string;
  loserID: string; // User id for AI player is: AI
}
