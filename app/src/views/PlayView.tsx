import React from 'react';
import {
  Grid,
  Typography,
  ListItem,
  List,
  Box,
  ButtonGroup,
  Paper,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { Tile } from '../components/play/Tile';

import { Button } from '../components/play/Button';

import MatchIcon from '/matchicon.svg';
import AiIcon from '/aiicon.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fillHeight: {
      height: '100%',
      paddingLeft: '15px',
      paddingRight: '15px',
    },
    button: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.contrastText,
    },
    paper: {
      textAlign: 'center',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
    },
  })
);

export const PlayView = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      className={classes.fillHeight}
      justify="center"
    >
      <Grid xs item style={{ height: '25%' }}>
        <Grid
          container
          justify="center"
          style={{ height: '100%' }}
          alignContent="center"
        >
          <Typography variant="h4">Lets see what you go for Bob!</Typography>
        </Grid>
      </Grid>
      <Grid xs item>
        <Grid container direction="column" spacing={3}>
          <Button
            text="Create a match"
            subText="Start a regular match"
            icon={MatchIcon}
          />
          <Button
            text="Join a match"
            subText={
              <p>
                There are currently <b>18</b> rooms open
              </p>
            }
            icon={MatchIcon}
          />
          <Button
            text="Beat our AI"
            subText="Battle your way up from a randomized blunder"
            icon={AiIcon}
          />
        </Grid>
      </Grid>
      <Grid xs item style={{ height: '25%', zIndex: 1 }}>
        <Grid
          container
          justify="space-between"
          spacing={3}
          style={{ height: '100%', paddingBottom: '10px' }}
          alignContent="flex-end"
        >
          <Tile text="104291" subText="Players" />
          <Tile text="41665" subText="Games in play" />
        </Grid>
      </Grid>
    </Grid>
  );
};
