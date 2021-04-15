import React from 'react';
import { Grid, List, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { User } from '../types/User';
import { Graph } from '../components/profile/Graph';
import { Tile } from '../components/play/Tile';
import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';
import { ThreeRowButton } from '../components/settings/ThreeRowButton';
import { Gravatar } from '../components/common/Gravatar';
import { Profile } from '../types/Profile';
import { LoadingView } from './LoadingView';

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
  profile: Profile;
}

export const ProfileView = (props: Props) => {
  const { user, profile } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      className={classes.container}
      spacing={2}
    >
      {profile && (
        <>
          <Grid item xs>
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ height: '100%' }}
            >
              <Grid item xs>
                <Typography variant="h4" color="textPrimary">
                  Looking good {user.name}!
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
                        name={
                          user.name === match.winner.name
                            ? match.loser.name
                            : match.winner.name
                        }
                        delta={user.name === match.winner.name ? 10 : -10}
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
                      />
                    ))}
                  </VerticalButtonGroup>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      {!profile && <LoadingView message="fetching profile" />}
    </Grid>
  );
};
