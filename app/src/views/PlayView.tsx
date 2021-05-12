import React from 'react';
import { Avatar, Grid, List, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import AiIcon from '/aiicon.svg';
import { User } from '../types/User';
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
  })
);

interface Props {
  username: string;
  email: string;
  profile: Profile;
  greeting: string | undefined;
  isLoading: boolean;
  handleReplay: (a: string) => void;
  onClickStartPuzzle: () => void;
}

export const PlayView = (props: Props) => {
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
              {props.username !== 'N/A' && props.greeting}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs>
          <Button
            onClick={props.onClickStartPuzzle}
            text="Beat our AI"
            subText={<p>Battle your way up from a randomized blunder</p>}
            icon={AiIcon}
          />
        </Grid>

        <Graph
          recentMatches={props.profile.recentMatches}
          username={props.username}
          rank={props.profile.rank}
          delta={props.profile.rankDelta}
          isLoading={props.isLoading}
        />
        <Grid item xs>
          <Grid container direction="row" spacing={2}>
            <Tile
              isLoading={props.isLoading}
              text={props.profile.wins}
              subText="Wins"
            />
            <Tile
              isLoading={props.isLoading}
              text={props.profile.losses}
              subText="Losses"
            />
            <Tile
              isLoading={props.isLoading}
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
                Recent Matches
              </Typography>
            </Grid>
            <Grid item xs>
              <List>
                <VerticalButtonGroup>
                  {props.isLoading ? (
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
