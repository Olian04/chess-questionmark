import React from 'react';
import {
  Avatar,
  CircularProgress,
  Grid,
  List,
  Typography,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import AiIcon from '/aiicon.svg';
import { green } from '@material-ui/core/colors';
import { Graph } from '../components/profile/Graph';
import { Tile } from '../components/play/Tile';
import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';
import { Button } from '../components/play/Button';
import {
  ThreeRowButton,
  ThreeRowButtonSkeleton,
} from '../components/settings/ThreeRowButton';
import { Profile } from '../types/Profile';
import { getGravatarUrl } from '../services/gravatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      zIndex: 1,
      position: 'relative',
    },
    padding: {
      padding: '5px',
    },
    buttonWrapper: {
      position: 'relative',
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

interface Props {
  username: string;
  email: string;
  profile: Profile;
  liveGame: boolean;
  greeting: string | undefined;
  isLoadingProfile: boolean;
  isLoadingPuzzle: boolean;
  handleReplay: (a: string) => void;
  onClickStartPuzzle: () => void;
}

export const PlayView = (props: Props) => {
  const classes = useStyles();

  const reversed = (array: Array<any>) =>
    array.map((item, i) => array[array.length - 1 - i]);

  const buttonMainText = props.liveGame ? 'Continue' : 'Beat our AI';
  const buttonSubText = props.liveGame ? (
    <p>You currently have an ongoing game</p>
  ) : (
    <p>Battle your way up from a randomized blunder</p>
  );

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
              {props.username !== 'N/A' && props.greeting}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs className={classes.buttonWrapper}>
          <Button
            onClick={props.onClickStartPuzzle}
            text={buttonMainText}
            subText={buttonSubText}
            icon={AiIcon}
            disabled={props.isLoadingPuzzle}
          />
          {props.isLoadingPuzzle && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Grid>

        <Graph
          recentMatches={props.profile.recentMatches}
          username={props.username}
          rank={props.profile.rank}
          delta={props.profile.rankDelta}
          isLoading={props.isLoadingProfile}
        />
        <Grid item xs>
          <Grid container direction="row" spacing={2}>
            <Tile
              isLoading={props.isLoadingProfile}
              text={props.profile.wins}
              subText="Wins"
            />
            <Tile
              isLoading={props.isLoadingProfile}
              text={props.profile.losses}
              subText="Losses"
            />
            <Tile
              isLoading={props.isLoadingProfile}
              text={props.profile.draws}
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
                Match Replays
              </Typography>
            </Grid>
            <Grid item xs>
              <List>
                <VerticalButtonGroup>
                  {props.isLoadingProfile ? (
                    <ThreeRowButtonSkeleton />
                  ) : (
                    reversed(props.profile.recentMatches)
                      .slice(0, 5)
                      .map((match) => (
                        <ThreeRowButton
                          key={match.id}
                          name={
                            props.username === match.winner.name
                              ? match.loser.name
                              : match.winner.name
                          }
                          delta={
                            props.username === match.winner.name
                              ? match.material
                              : -1 * match.material
                          }
                          avatar={
                            <Avatar
                              variant="circular"
                              src={getGravatarUrl({
                                defaultImage: 'retro',
                                email: props.email,
                                forceDefault: true,
                              })}
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
