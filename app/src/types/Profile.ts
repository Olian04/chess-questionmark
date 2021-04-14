export interface Profile {
  rank: number;
  rankDelta: number | 'N/A';
  wins: number;
  losses: number;
  draws: number;
  recentMatches: __Match[];
}

// TODO: replace this "__Match" with a reference to match entry in DB.
export interface __Match {
  opponent: {
    name: string;
    rankTitle: string;
  };
  result: number;
}
