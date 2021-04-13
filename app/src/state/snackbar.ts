import { atom, selector } from 'recoil';
import { ISnackbar } from '../types/Snackbar';

const defaultDuration = 3000;
export const snackbarState = atom<Partial<ISnackbar>>({
  key: 'SNACKBAR',
  default: {
    open: false,
    severity: 'info',
    duration: defaultDuration,
    message: '',
  },
});

export const openSnackbar = selector({
  key: 'SET_SNACKBAR',
  get: ({ get }) => {
    const snackbar = get(snackbarState);
    if (!snackbar.duration)
      return {
        open: snackbar.open,
        duration: defaultDuration,
        message: snackbar.message,
        severity: snackbar.severity,
      };

    return snackbar;
  },
});
