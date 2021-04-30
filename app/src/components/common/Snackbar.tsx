import Alert from '@material-ui/lab/Alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { openSnackbar, snackbarState } from '../../state/snackbar';
import { Box } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      top: 0,
      left: 0,
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      zIndex: 20,
      transition: 'visible 0.5s ease-in',
    },
    wrapper: {
      height: '100%',
      width: '100%',

      display: 'flex',
      justifyContent: 'center',
    },
    snackbar: {
      transition: 'all 0.2s ease-in',
      padding: theme.spacing(2),
      minWidth: '90%',
      position: 'absolute',
    },
    open: {
      opacity: 1,
      bottom: 0,
    },
    closed: {
      opacity: 0,
      bottom: -50,
    },
    visible: {
      visible: 'visible',
      pointerEvents: 'auto',
    },
    hidden: {
      visible: 'hidden',
      pointerEvents: 'none',
    },
  })
);

export const Snackbar = () => {
  const classes = useStyles();
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
    <Box
      className={clsx(
        classes.container,
        snackbar.open ? classes.visible : classes.hidden
      )}
    >
      <Box className={classes.wrapper}>
        <Box
          className={clsx(
            classes.snackbar,
            snackbar.open ? classes.open : classes.closed
          )}
        >
          <Alert onClose={handleOnClose} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};
