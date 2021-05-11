import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { openSnackbar, snackbarState } from '../state/snackbar';
import { Snackbar } from '../components/common/Snackbar';

export const SnackbarPresenter = () => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const snackbar = useRecoilValue(openSnackbar);

  const handleOnClose = (event: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(
        () => setSnackbar({ ...snackbar, open: false }),
        snackbar.duration
      );
      return () => {
        clearTimeout(timer);
      };
    }
  }, [snackbar.open]);

  return (
    <Snackbar
      open={snackbar.open ?? false}
      message={snackbar.message ?? 'Something went wrong'}
      severity={snackbar.severity}
      onClose={handleOnClose}
    />
  );
};
