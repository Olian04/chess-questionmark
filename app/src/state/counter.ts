import { atom, selector } from 'recoil';

export const globalCount = atom<number>({
  key: 'COUNT',
  default: 0,
});

export const doubleGlobalCount = selector<number>({
  key: 'COUNT_DOUBLE',
  get: ({ get }) => {
    const count = get(globalCount);
    return count * 2;
  },
});
