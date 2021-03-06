import { Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { IBackgroundCircle } from '../../types/BackgroundCircle';

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
      top: `calc(50% - (${circleDiameter}vh / 2))`,
      left: `calc(50% - (${circleDiameter}vh / 2))`,
    },
    top: {
      transform: 'translate(0%, -70%)',
    },
    right: {
      transform: `translate(60%, 0%)`,
    },
    left: {
      transform: `translate(-60%, 0%)`,
    },
    bottom: {
      transform: 'translate(0%, 70%)',
    },
    hidden: {
      display: 'none',
      visible: 'hidden',
      opacity: '0',
    },
  })
);
interface Props {
  side: IBackgroundCircle;
}
export const BackgroundCircle = (props: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <div className={clsx(classes.root, classes[props.side])} />
    </Box>
  );
};
