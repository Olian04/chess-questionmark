import React from 'react';
import { Grid, List, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { User } from '../types/User';
import { Graph } from '../components/profile/Graph';
import { Tile } from '../components/play/Tile';
import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';

import {
  ThreeRowButton,
  ThreeRowButtonSkeleton,
} from '../components/settings/ThreeRowButton';

import { Gravatar } from '../components/common/Gravatar';
import { Profile } from '../types/Profile';
import { LoadingView } from './LoadingView';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
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
  profile: Profile;
  greeting: string | undefined;
  isLoading: boolean;
  handleReplay: (a: string) => void;
}

export const ProfileView = (props: Props) => {
  const { user, profile } = props;
  const classes = useStyles();

  const reversed = (array: Array<any>) =>
    array.map((item, i) => array[array.length - 1 - i]);

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      className={classes.container}
      spacing={2}
    >
      <>
        <Grid item xs>
          <Grid
            container
            item
            alignItems="center"
            justify="center"
            className={classes.container}
          >
            <Typography variant="h5" color="textPrimary">
              {props.user.name !== 'N/A' && props.greeting}
            </Typography>
          </Grid>
        </Grid>

        <Graph
          recentMatches={props.profile.recentMatches}
          username={props.user.name}
          rank={profile.rank}
          delta={profile.rankDelta}
          isLoading={props.isLoading}
        />
        <Grid item xs>
          <Grid container direction="row" spacing={2}>
            <Tile
              isLoading={props.isLoading}
              text={profile.wins}
              subText="Wins"
            />
            <Tile
              isLoading={props.isLoading}
              text={profile.losses}
              subText="Losses"
            />
            <Tile
              isLoading={props.isLoading}
              text={profile.draws}
              subText="Draws"
            />
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid container direction="column">
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
                  {props.isLoading ? (
                    <ThreeRowButtonSkeleton />
                  ) : (
                    reversed(profile.recentMatches)
                      .slice(0, 5)
                      .map((match) => (
                        <ThreeRowButton
                          key={match.id}
                          name={
                            user.name === match.winner.name
                              ? match.loser.name
                              : match.winner.name
                          }
                          delta={
                            user.name === match.winner.name
                              ? match.material
                              : -1 * match.material
                          }
                          avatar={
                            <Gravatar
                              variant="circular"
                              opponent={{
                                email:
                                  user.name === match.winner.name
                                    ? match.loser.email
                                    : match.winner.email,
                                avatar:
                                  user.name === match.winner.name
                                    ? match.loser.avatar
                                    : match.winner.avatar,
                              }}
                            />
                          }
                          handleClick={() => props.handleReplay(match.id)}
                        />
                      ))
                  )}
                </VerticalButtonGroup>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </>
    </Grid>
  );
};
