import { atom } from 'recoil';
import { IModal } from '../types/modal';

export const modalState = atom<IModal>({
  key: 'MODAL',
  default: {
    open: false,
    title: '',
    content: [''],
  },
});
