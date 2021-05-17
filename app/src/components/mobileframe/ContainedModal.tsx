import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
      color: theme.palette.text.primary,
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 10,
    },
    fill: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'relative',
      margin: theme.spacing(1),
      pointerEvents: 'none',
    },
    modal: {
      backgroundColor: theme.palette.background.paper,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      pointerEvents: 'auto',
      position: 'relative',
    },
    content: {
      position: 'relative',
      maxHeight: 650 * 0.4,
      overflowY: 'auto',
    },
    visible: {
      visible: 'visible',
      opacity: 1,
    },
    hidden: {
      visible: 'hidden',
      opacity: 0,
      pointerEvents: 'none',
    },
  })
);

interface Props {
  children: JSX.Element[];
  open: boolean;
  onClose: () => void;
}

export const ContainedModal = (props: Props) => {
  const classes = useStyles();
  return (
    <>
      <Box
        className={clsx(
          classes.container,
          props.open ? classes.visible : classes.hidden
        )}
      >
        <Box className={classes.fill}>
          <Box
            className={clsx(
              classes.modal,
              props.open ? classes.visible : classes.hidden
            )}
          >
            {props.children[0]}
            <Box className={classes.content}>{props.children[1]}</Box>
            {props.children[2]}
          </Box>
        </Box>
      </Box>
      <Box
        onClick={props.onClose}
        className={clsx(
          classes.backdrop,
          props.open ? classes.visible : classes.hidden
        )}
      />
    </>
  );
};
