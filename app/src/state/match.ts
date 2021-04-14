import { atom } from 'recoil';

export const currentMatchIDState = atom<string | null>({
  key: 'CURRENT_MATCH_ID',
  default: null,
});
