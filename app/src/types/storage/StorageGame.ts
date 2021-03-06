// Storage games are the games in the Firestore Database

type User = {
  name: string;
  email: string;
  avatar?: string;
};
export interface StorageGameLocal {
  id: string;
  history: string[];
  winner: User;
  loser: User;
  material: number;
}

export interface StorageGameRemote {
  history: string[];
  winnerID: string;
  loserID: string;
  material: number;
}
