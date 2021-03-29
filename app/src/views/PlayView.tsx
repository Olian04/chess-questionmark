import React from 'react';
import { Grid, Typography, ListItem, List } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { Button } from '../components/play/Button';
import { Tile } from '../components/play/Tile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fillHeight: {
      height: '100%',
    },
    button: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const PlayView = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      className={classes.fillHeight}
    >
      <Grid item xs container alignContent="center">
        <Typography variant="h4" color="textPrimary">
          Lets see what you go for Bob!
        </Typography>
      </Grid>
      <Grid item xs container direction="column" justify="space-evenly">
        <Grid item xs>
          <Button
            icon={<img src="/matchicon.svg" />}
            text="Create a Match"
            subText="Start a regular match"
          />
        </Grid>
        <Grid item xs>
          <Button
            icon={<img src="/matchicon.svg" />}
            text="Join a match"
            subText="There are currently <b>18</b> rooms open"
          />
        </Grid>
        <Grid item xs>
          <Button
            icon={<img src="/aiicon.svg" />}
            text="Beat our AI"
            subText="Battle your way from a randomized blunder"
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Tile text="104291" subText="Players" />
        <Tile text="41665" subText="Games in progress" />
      </Grid>
    </Grid>
  );
};
