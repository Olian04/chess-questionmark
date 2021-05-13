import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { padStart } from '../../util/stringManipulation';

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

      boxSizing: 'content-box',
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

      boxSizing: 'content-box',
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
    timerBlinking: {
      transform: 'scale(1)',
      boxShadow: 'inset 0 0 0 0 rgba(223, 80, 73, 1)',
      animation: '$doIHaveAPulseDoc 1s infinite',
    },
    '@keyframes doIHaveAPulseDoc': {
      '0%': {
        transform: 'scale(1.05)',
        boxShadow: 'inset 0 0 0 0 rgba(223, 80, 73, 0.8)',
      },
      '70%': {
        transform: 'scale(1)',
        boxShadow: 'inset 0 0 0 10px rgba(223, 80, 73, 0.05)',
      },
      '100%': {
        transform: 'scale(1.05)',
        boxShadow: 'inset 0 0 0 0 rgba(223, 80, 73, 0)',
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
  isBlinking: boolean;
  timeRef: any;
}

export const Pill = (props: Props) => {
  const classes = useStyles();
  return (
    <Box
      color="textPrimary"
      className={
        props.isBlinking && !props.isPaused
          ? clsx(classes.timerBlinking, classes.timerInactive)
          : props.isPaused
          ? classes.timerInactive
          : classes.timerActive
      }
    >
      <Grid
        container
        className={classes.container}
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <AccessTimeIcon color="action" />
        <Typography
          ref={props.timeRef}
          color="textPrimary"
          className={clsx(classes.text, classes.timerText)}
        >
          {padStart(`${Math.floor(props.time / 60)}`, 2, '0')}:
          {padStart(`${props.time % 60}`, 2, '0')}
        </Typography>
      </Grid>
    </Box>
  );
};
