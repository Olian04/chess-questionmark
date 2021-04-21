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

const materialCost: { [key: string]: number } = {
  r: 5,
  n: 3,
  b: 3,
  q: 9,
  k: 0,
  p: 1,
  R: 5,
  N: 3,
  B: 3,
  Q: 9,
  K: 0,
  P: 1,
};

const isWhite = (str: string) => /^(R|N|B|Q|K|P)*$/.test(str);

const getCost = (acc: { white: number; black: number }, piece: string) => {
  if (piece in materialCost) {
    const cost = materialCost[piece];

    if (isWhite(piece)) {
      acc['white'] = acc['white'] + cost;
    } else {
      acc['black'] = acc['black'] + cost;
    }
  }
  return acc;
};

export const getMaterialCostFromFen = (fen: string) => {
  const [material, ...firstRest] = fen.split(' ');

  const materialArray = material.split('');

  const {
    white: whiteMaterial,
    black: blackMaterial,
  } = materialArray.reduce(getCost, { white: 0, black: 0 });

  console.log(whiteMaterial, blackMaterial);
  return Math.abs(whiteMaterial - blackMaterial);
};
