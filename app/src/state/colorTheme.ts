import { atom } from 'recoil';

export const colorTheme = atom<'light' | 'dark'>({
  key: 'COLOR_THEME',
  default: 'dark',
});
