export interface Match {
  history: {
    [k in number]: string;
  };
  player: string;
  turn: 'b' | 'w';
}
