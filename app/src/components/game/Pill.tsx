import { Box, Typography } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timerActive: {
      borderColor: theme.palette.primary.main,
      background: theme.palette.primary.main,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '20%/50%',
      height: '22px',
      width: '95px',

      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2px',
      position: 'relative',

      '&::after': {
        content: '" "',
        zIndex: 1,

        backgroundColor: theme.palette.secondary.main,
        boxSizing: 'border-box',
        width: '95px',
        height: '11px',
        position: 'absolute',
        animation: '$spinMeRoundRound 6s ease-in-out infinite',
      },
    },
    timerInactive: {
      borderColor: theme.palette.primary.main,
      background: theme.palette.primary.main,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '20%/50%',
      height: '22px',
      width: '95px',

      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2px',
      position: 'relative',
    },
    '@keyframes spinMeRoundRound': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '50%': {
        transform: 'rotate(180deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
    text: {
      fontWeight: 'bold',
    },
    timerText: {
      paddingLeft: '3px',
    },
    container: {
      backgroundColor: theme.palette.primary.main,
      height: '100%',
      width: '100%',
      borderRadius: '20%/50%',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 2,
    },
  })
);

interface Props {
  time: number;
  isPaused: boolean;
}

export const Pill = (props: Props) => {
  const classes = useStyles();
  return (
    <Box
      color="textPrimary"
      className={props.isPaused ? classes.timerInactive : classes.timerActive}
    >
      <Box className={classes.container}>
        <AccessTimeIcon color="action" />
        <Typography
          color="textPrimary"
          className={clsx(classes.text, classes.timerText)}
        >
          {(props.time - (props.time % 60)) / 60}:{props.time % 60}
        </Typography>
      </Box>
    </Box>
  );
};
