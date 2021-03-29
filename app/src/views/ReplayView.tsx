import React from 'react';
import { Grid, Slider } from '@material-ui/core';
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
      height: '100%',
    },
    background: {
      background: 'linear-gradient(180deg, #918F99 14.58%, #28262F 79.69%)',
    },
  })
);

const ReplaySlider = withStyles({
  root: {
    padding: '13px',
  },
  track: {
    color: '#fff',
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: 'primary',
    border: '1px solid #fff',
    marginTop: -9,
    marginLeft: -11,
  },
})(Slider);

export const ReplayView = () => {
  const classes = useStyles();
  return (
    <Grid container justify="space-between" className={classes.container}>
      <Grid item xs={12}>
        <PlayerBar name="Player 1" rating="1900" icon="/assets/cat.jpg" />
      </Grid>
      <Grid item xs={12}>
        <GameBoard position="start" />
      </Grid>
      <Grid item container xs={12} justify="center">
        <SkipPrevious fontSize="large" color="action" />
        <PlayArrow fontSize="large" color="action" />
        <SkipNext fontSize="large" color="action" />
      </Grid>
      <ReplaySlider marks={true} min={1} max={20} />
      <Grid item xs={12}>
        <PlayerBar name="Player 2" rating="2000" icon="/assets/cat.jpg" />
      </Grid>
    </Grid>
  );
};
