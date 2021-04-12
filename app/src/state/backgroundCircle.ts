import { atom } from 'recoil';

export const backgroundCircleState = atom<
  'bottom' | 'top' | 'left' | 'right' | 'hidden'
>({
  key: 'BGCIRCLE',
  default: 'hidden',
});
