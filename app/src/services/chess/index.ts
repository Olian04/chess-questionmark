const url = 'https://api.chess.com/pub/puzzle/random';

export const fetchRandomPuzzle = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.fen;
  } catch (err) {
    throw err;
  }
};
