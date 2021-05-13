// Live games are the games in the Realtime Database

export interface LiveGame {
  history: string[];
  playerOne: string;
  playerTwo: string; // User id for AI player is: AI
  turn: 'playerOne' | 'playerTwo';
  state: 'playing' | 'ended' | 'N/A';
  winner: 'playerOne' | 'playerTwo' | 'Draw' | 'N/A';
  timeLeft: number;
}
