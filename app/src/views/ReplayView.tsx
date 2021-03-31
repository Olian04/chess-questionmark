import React from 'react';
import { Box, Grid, Slider } from '@material-ui/core';
import {
  Theme,
  makeStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import { PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';

import { PlayerBar } from '../components/game/PlayerBar';
import { GameBoard } from '../components/game/GameBoard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      zIndex: 1,
      position: 'relative',
      height: `calc(100% - ${theme.spacing(3)}px)`,
      paddingTop: theme.spacing(1),
    },
    background: {
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'linear-gradient(180deg, #918F99 14.58%, #28262F 79.69%)',
      zIndex: 0,
    },
  })
);

const ReplaySlider = withStyles({
  root: {
    height: 4,
  },
  track: {
    color: '#F1E8E6',
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: 'primary',
    border: '3px solid #F1E8E6',
    marginTop: -9,
  },
  rail: {
    height: 4,
    color: '#F1E8E6',
  },
})(Slider);

export const ReplayView = () => {
  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="space-between"
        className={classes.container}
      >
        <PlayerBar
          name="Player 1"
          countryCode="SE"
          rating="1900"
          icon="/assets/cat.jpg"
        />
        <GameBoard position="start" size={0.8} />
        <Box>
          <Box display="flex" justifyContent="center">
            <SkipPrevious fontSize="large" color="action" />
            <PlayArrow fontSize="large" color="action" />
            <SkipNext fontSize="large" color="action" />
          </Box>

          <ReplaySlider min={1} max={20} />
        </Box>

        <PlayerBar
          name="Player 2"
          countryCode="SE"
          rating="2000"
          icon="/assets/cat.jpg"
        />
      </Box>
      <Box className={classes.background} />
    </>
  );
};
