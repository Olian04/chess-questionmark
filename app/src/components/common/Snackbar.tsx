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
      bottom: 0,
      right: 0,
      height: '100%',
      position: 'absolute',
      zIndex: 20,
      transition: 'visible 0.5s ease-in',
      pointerEvents: 'none',
    },
    wrapper: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
    },
    snackbar: {
      transition: 'all 0.2s ease-in',
      padding: theme.spacing(2),
      minWidth: '90%',
      position: 'absolute',
      pointerEvents: 'auto',
    },
    open: {
      opacity: 1,
      bottom: '8.8%',
    },
    closed: {
      opacity: 0,
      bottom: 0,
    },
    visible: {
      visible: 'visible',
    },
    hidden: {
      visible: 'hidden',
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
    <Box className={classes.container}>
      <Box
        className={clsx(
          classes.wrapper,
          snackbar.open ? classes.visible : classes.hidden
        )}
      >
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
