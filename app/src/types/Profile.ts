export interface Profile {
  rank: number;
  rankDelta: number | 'N/A';
  wins: number;
  losses: number;
  draws: number;
  recentMatches: string[];
}
