import { Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { backgroundCircleState } from '../../state/backgroundCircle';

const circleDiameter = 80;

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
      zIndex: 0,
      pointerEvents: 'none',
    },
    root: {
      position: 'absolute',
      background: theme.palette.primary.main,
      height: `${circleDiameter}vh`,
      width: `${circleDiameter}vh`,
      borderRadius: '50%',
      transition: 'all 0.75s ease-in-out',
      // Center
      top: `${50 - circleDiameter / 2}vh`,
      left: `calc(50% - ${circleDiameter / 2}vh)`,
    },
    top: {
      transform: 'translate(0%, -50vh)',
    },
    right: {
      transform: `translate(50vh,0%)`,
    },
    left: {
      transform: `translate(-50vh,0%)`,
    },
    bottom: {
      transform: 'translate(0%, 60vh)',
    },
    middle: {},
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
