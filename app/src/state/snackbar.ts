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
    bottom: '16.8%',
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
        bottom: snackbar.bottom,
      };

    return snackbar;
  },
});
