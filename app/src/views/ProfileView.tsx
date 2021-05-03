import React, { useEffect, useRef, useState } from 'react';
import { Grid, List, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { User } from '../types/User';
import { Graph } from '../components/profile/Graph';
import { Tile } from '../components/play/Tile';
import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';
import AiIcon from '/aiicon.svg';
import { ThreeRowButton } from '../components/settings/ThreeRowButton';

import BlankAvatar from '/preview.svg';
import { Gravatar } from '../components/common/Gravatar';
import { useRecoilValue } from 'recoil';
import { profileState } from '../state/user';
import { Button } from '../components/play/Button';

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
  onClickStartPuzzle: () => void;
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
      <Button
            onClick={props.onClickStartPuzzle}
            text="Beat our AI"
            subText={
              <p>
                Battle your way up from a randomized blunder
              </p>
            }
            icon={AiIcon}
          />
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
                    name={match}
                    delta={1}
                    avatar={
                      <Gravatar
                        variant="circular"
                        opponent={{ email: `fix@db.side${i}` }}
                      />
                    }
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
