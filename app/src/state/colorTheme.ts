import { atom } from 'recoil';

export const colorThemeState = atom<'light' | 'dark'>({
  key: 'COLOR_THEME',
  default: 'dark',
});
