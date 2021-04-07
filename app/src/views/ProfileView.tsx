import React, { useEffect, useRef, useState } from 'react';
import { Grid, List, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { User } from '../types/User';
import { Graph } from '../components/profile/Graph';
import { Tile } from '../components/play/Tile';
import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';

import { ThreeRowButton } from '../components/settings/ThreeRowButton';

import BlankAvatar from '/preview.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      zIndex: 1,
      position: 'relative',
    },
    padding: {
      padding: '5px',
    },
  })
);

interface Props {
  user: User;
}

export const ProfileView = (props: Props) => {
  const classes = useStyles();

  const username = props.user.name ? props.user.name : 'Anon';

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      className={classes.container}
      spacing={2}
    >
      <Grid item xs>
        <Typography variant="h4" color="textPrimary">
          Looking good {username}!
        </Typography>
      </Grid>

      <Graph rank="2280" delta="+17" />
      <Grid item xs>
        <Grid container direction="row" spacing={2}>
          <Tile text="42" subText="Wins" />
          <Tile text="3" subText="Losses" />
          <Tile text="5" subText="Draws" />
        </Grid>
      </Grid>

      <Grid item xs container direction="column" justify="space-evenly">
        <Typography
          className={classes.padding}
          variant="button"
          color="textPrimary"
        >
          Recent Matches
        </Typography>
        <List>
          <VerticalButtonGroup>
            <ThreeRowButton
              name="Alice"
              rank="Ranking title"
              delta="+12 points"
              avatar={<img src={BlankAvatar} width="80%" height="80%" />}
            />
            <ThreeRowButton
              name="Celine"
              rank="Ranking title"
              delta="+8 points"
              avatar={<img src={BlankAvatar} width="80%" height="80%" />}
            />
            <ThreeRowButton
              name="Alice"
              rank="Ranking title"
              delta="-24 points"
              avatar={<img src={BlankAvatar} width="80%" height="80%" />}
            />
          </VerticalButtonGroup>
        </List>
      </Grid>
    </Grid>
  );
};
