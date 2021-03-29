import React from 'react';
import {
  Container,
  Avatar,
  Grid,
  ListItem,
  List,
  Box,
  Slider,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

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

export const GameView = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={4}
      justify="space-between"
      className={classes.container}
    >
      <Grid item xs={12}>
        <PlayerBar name="Player 1" rating="1900" icon="/assets/cat.jpg"/>
      </Grid>
      <Grid item xs={12}>
        <GameBoard position="start"/>
      </Grid>
      <Grid item xs={12}>
        <PlayerBar name="Player 2" rating="2000" icon="/assets/cat.jpg"/>
      </Grid>
    </Grid>
  );
}
