export const capitalize = (str: string) => {
  const [first, ...rest] = str.trim().split('');
  return [first.toUpperCase(), ...rest].join('');
};

export const padStart = (
  originalString: string,
  targetLength: number,
  padWith: string = '0'
) => {
  if (originalString.length >= targetLength) {
    return originalString;
  }
  return [
    ...Array(targetLength - originalString.length).fill(padWith),
    ...originalString.split(''),
  ].join('');
};
