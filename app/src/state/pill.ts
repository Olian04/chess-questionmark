import { atom } from 'recoil';

export const pillState = atom<number>({
  key: 'PILL',
  default: 1,
});
