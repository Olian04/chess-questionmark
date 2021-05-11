export const capitalize = (str: string) => {
  const [first, ...rest] = str.trim().split('');
  return [first.toUpperCase(), ...rest].join('');
};
