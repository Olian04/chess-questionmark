import { atom } from 'recoil';

export const backgroundCircleState = atom<
  'bottom' | 'top' | 'left' | 'right' | 'hidden' | 'middle'
>({
  key: 'BGCIRCLE',
  default: 'hidden',
});
