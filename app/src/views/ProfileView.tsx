import React, { useEffect, useRef, useState } from 'react';
import { Grid, List, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { User } from '../types/User';
import { Graph } from '../components/profile/Graph';
import { Tile } from '../components/play/Tile';
import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';

import { ThreeRowButton } from '../components/settings/ThreeRowButton';

import BlankAvatar from '/preview.svg';
import { Profile } from '../types/Profile';
import { useRecoilValue } from 'recoil';
import { profileState } from '../state/user';

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
  profileExists: boolean;
  fetchDetails: () => void;
}

export const ProfileView = (props: Props) => {
  const classes = useStyles();

  const profile = useRecoilValue(profileState);

  const username = props.user.name ? props.user.name : 'Anon';

  useEffect(() => {
    if (props.user.id !== 'N/A') {
      props.fetchDetails();
    }
  }, [props.user]);
  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      className={classes.container}
      spacing={2}
    >
      <Grid item xs>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ height: '100%' }}
        >
          <Grid item xs>
            <Typography variant="h4" color="textPrimary">
              Looking good {username}!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Graph rank={profile.rank} delta={profile.rankDelta} />
      <Grid item xs>
        <Grid container direction="row" spacing={2}>
          <Tile text={profile.wins} subText="Wins" />
          <Tile text={profile.losses} subText="Losses" />
          <Tile text={profile.draws} subText="Draws" />
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction="column" justify="space-evenly">
          <Grid item xs>
            <Typography
              className={classes.padding}
              variant="button"
              color="textPrimary"
            >
              Recent Matches
            </Typography>
          </Grid>
          <Grid item xs>
            <List>
              <VerticalButtonGroup>
                {profile.recentMatches.map((match, i) => (
                  <ThreeRowButton
                    key={i}
                    {...match.opponent}
                    delta={match.result}
                    avatar={<img src={BlankAvatar} width="80%" height="80%" />}
                  />
                ))}
              </VerticalButtonGroup>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
