import Alert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';
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
      bottom: '16.8%',
      zIndex: 20,
    },
    closed: {
      opacity: 0,
      bottom: 0,
      zIndex: -1,
    },
    visible: {
      visible: 'visible',
    },
    hidden: {
      visible: 'hidden',
    },
  })
);

interface Props extends Pick<AlertProps, 'severity' | 'onClose'> {
  open: boolean;
  message: string;
}

export const Snackbar = (props: Props) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(
        classes.container,
        props.open ? classes.visible : classes.hidden
      )}
    >
      <Box className={classes.wrapper}>
        <Box
          className={clsx(
            classes.snackbar,
            props.open ? classes.open : classes.closed
          )}
        >
          <Alert onClose={props.onClose} severity={props.severity}>
            {props.message}
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};
