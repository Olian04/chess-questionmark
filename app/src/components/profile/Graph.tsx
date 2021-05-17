import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { Chart } from './Chart';
import { StorageGameLocal } from '../../types/storage/StorageGame';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing(1),
      minHeight: '160px',
      position: 'relative',
      overflow: 'hidden',
    },
    wrapper: {
      position: 'absolute',
      top: 0,
      padding: theme.spacing(1),
    },
    stroke: {
      '-webkit-text-stroke-width': '0.2px',
      '-webkit-text-stroke-color': 'black',
      fontWeight: 900,
      fontSize: '1.1em',
      textShadow: `${theme.palette.background.paper} 1px 0 10px`,
    },
  })
);

interface Props {
  rank: number;
  username: string;
  recentMatches: StorageGameLocal[];
  delta: number | 'N/A';
  isLoading: boolean;
}

const getTick = (name: string, match: StorageGameLocal) =>
  match.material * (match.winner.name === name ? 1 : -1);

export const Graph = (props: Props) => {
  const classes = useStyles();

  const rankHistory = [
    500,
    ...props.recentMatches.map((match) => getTick(props.username, match)),
  ];
  // if (rankHistory.length === 1) rankHistory.push(props.rank);
  const rankUpdates = rankHistory.map((match, i) =>
    rankHistory.slice(0, i + 1).reduce((a, b) => a + b)
  );

  return (
    <Grid item xs className={classes.container}>
      {!props.isLoading && <Chart data={rankUpdates} />}
      <Box className={classes.wrapper}>
        <Typography variant="h5" color="textPrimary">
          <b>Points</b>
        </Typography>
        <Typography variant="caption" color="textPrimary">
          {props.isLoading ? (
            <Skeleton
              animation="wave"
              variant="rect"
              width="35px"
              height="10px"
            />
          ) : (
            <b className={classes.stroke}>{props.rank}</b>
          )}
        </Typography>
      </Box>
    </Grid>
  );
};
