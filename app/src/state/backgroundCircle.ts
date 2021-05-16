import { atom } from 'recoil';
import { IBackgroundCircle } from '../types/BackgroundCircle';

export const backgroundCircleState = atom<IBackgroundCircle>({
  key: 'BGCIRCLE',
  default: 'hidden',
});
