export const stockfishEngine = new Worker(
  '../../../node_modules/stockfish/src/stockfish.js',
  { type: 'module' }
);
