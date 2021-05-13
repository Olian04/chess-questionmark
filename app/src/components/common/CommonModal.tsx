import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { IModal } from '../../types/modal';
import clsx from 'clsx';

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
    fill: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'relative',
      margin: theme.spacing(1),
    },
    modal: {
      backgroundColor: theme.palette.background.paper,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
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

interface Props {
  handleClose: () => void;
  modal: IModal;
}

export const CommonModal = (props: Props) => {
  const classes = useStyles();
  if (isMobile) {
    return (
      <Dialog onClose={props.handleClose} open={props.modal.open}>
        <DialogTitle onClick={props.handleClose}>
          {props.modal.title}
        </DialogTitle>
        <DialogContent dividers>
          {props.modal.content?.map((message, i) => (
            <Typography gutterBottom key={i}>
              {message}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose}>
            Close
          </Button>
        </DialogActions>
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
        props.modal.open ? classes.visible : classes.hidden
      )}
      onClick={props.handleClose}
    >
      <Box className={classes.fill}>
        <Box className={classes.modal}>
          <DialogTitle onClick={props.handleClose} disableTypography>
            <Typography color="textPrimary" variant="h6">
              {props.modal.title}
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            {props.modal.content?.map((message, i) => (
              <Typography gutterBottom key={i} color="textPrimary">
                {message}
              </Typography>
            ))}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={props.handleClose}>
              Close
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Box>
  );
};
