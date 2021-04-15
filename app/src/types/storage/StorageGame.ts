// Storage games are the games in the Firestore Database

type User = {
  name: string;
  email: string;
  avatar?: string;
};
export interface StorageGameLocal {
  history: string[];
  winner: User;
  loser: User;
}

export interface StorageGameRemote {
  history: string[];
  winnerID: string;
  loserID: string;
}
