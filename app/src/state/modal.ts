import { atom, selector } from 'recoil';
import { IModal } from '../types/modal';

export const modalState = atom<IModal>({
  key: 'MODAL',
  default: {
    open: false,
    title: '',
    content: [''],
  },
});

export const openModal = selector({
  key: 'SET_MODAL',
  get: ({ get }) => {
    const modal = get(modalState);
    if (modal.open) {
      return modal;
    }
    return {
      open: false,
      title: '',
      content: [''],
    };
  },
});
