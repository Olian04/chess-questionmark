import React from 'react';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { isMobile } from 'react-device-detect';
import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

interface Props {
  draw: boolean;
  winner: boolean;
  cause: string;
  open: boolean;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: theme.palette.background.paper,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      borderRadius: theme.shape.borderRadius,
    },
    visible: {
      visible: 'visible',
      opacity: 1,
      pointerEvents: 'auto',
    },
    hidden: {
      visible: 'hidden',
      opacity: 0,
      pointerEvents: 'none',
    },
  })
);

// DRY compliant
const EndOfGameContent = (props: Props) => {
  return (
    <>
      <DialogContent>
        <DialogContentText>
          {(props.draw ? 'Draw' : props.winner ? 'You won' : 'You lost') +
            ' due to ' +
            props.cause +
            '.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClick}>Return!</Button>
      </DialogActions>
    </>
  );
};

export const EndOfGame = (props: Props) => {
  const classes = useStyles();
  if (isMobile) {
    return (
      <Dialog open={props.open} onClose={props.onClick}>
        <EndOfGameContent {...props} />
      </Dialog>
    );
  }
  /* When client is seen from browser, we don't want the modal to be
   * filling the whole view, but only the mobileframe
   */
  return (
    <Box
      className={clsx(
        classes.backdrop,
        props.open ? classes.visible : classes.hidden
      )}
      onClick={props.onClick}
    >
      <Box className={classes.modal}>
        <EndOfGameContent {...props} />
      </Box>
    </Box>
  );
};
