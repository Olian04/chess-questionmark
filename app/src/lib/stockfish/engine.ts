export const stockfishEngine = new Worker('/stockfish/src/stockfish.js', {
  type: 'module',
});
