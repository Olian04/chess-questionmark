import { atom, selector } from 'recoil';

export const globalNavBar = atom({
  key: 'NAVBAR_POSITION',
  default: -1,
});
