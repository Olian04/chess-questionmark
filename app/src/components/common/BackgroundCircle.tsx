import { Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { backgroundCircleState } from '../../state/backgroundCircle';

const circleDiameter = '80vh';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      overflow: 'hidden',
      backgroundColor: 'tomato',
    },
    root: {
      position: 'absolute',
      background: theme.palette.primary.main,
      height: circleDiameter,
      width: circleDiameter,
      borderRadius: '50%',
      transition: 'all 1s ease-in',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    right: {
      transform: `translate(40vh,10vh)`,
    },
    left: {
      transform: `translate(-60vh,10vh)`,
    },
    top: {
      transform: 'translate(-12vh, -50vh)',
    },
    bottom: {
      transform: 'translate(-12vh, 75vh)',
    },
    hidden: {
      display: 'none',
      visible: 'hidden',
      opacity: '0',
    },
  })
);

interface Props {
  side: 'left' | 'right' | 'top' | 'bottom';
}

export const BackgroundCircle = () => {
  const classes = useStyles();

  const side = useRecoilValue(backgroundCircleState);

  return (
    <Box className={classes.container}>
      <div className={clsx(classes.root, classes[side])} />
    </Box>
  );
};
