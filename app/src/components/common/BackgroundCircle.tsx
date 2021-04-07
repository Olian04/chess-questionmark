import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const circleDiameter = '80vh';
const circleOffsetPercentageX = '0.75';
const circleOffsetPercentageY = '1';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      background: theme.palette.primary.main,
      height: circleDiameter,
      width: circleDiameter,
      borderRadius: '50%',
    },
    left: {
      left: `calc(-${circleOffsetPercentageX} * ${circleDiameter})`,
      top: `calc(50% - ${circleDiameter} * 0.5)`,
    },
    right: {
      right: `calc(-${circleOffsetPercentageX} * ${circleDiameter})`,
      top: `calc(50% - ${circleDiameter} * 0.5)`,
    },
    top: {
      top: `calc(-${circleOffsetPercentageY} * ${circleDiameter})`,
      right: `calc(50% - ${circleDiameter} * 0.5)`,
    },
    bottom: {
      bottom: `calc(-${circleOffsetPercentageY} * ${circleDiameter})`,
      right: `calc(50% - ${circleDiameter} * 0.5)`,
    },
  })
);

interface Props {
  side: 'left' | 'right' | 'top' | 'bottom';
}

export const BackgroundCircle = (props: Props) => {
  const classes = useStyles();
  return <div className={clsx(classes.root, classes[props.side])}></div>;
};
