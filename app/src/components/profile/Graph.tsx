import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

// should go for chart.js in the future
import graphSvg from '/graph.svg';
import { Chart } from './Chart';

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
    chart: {
      margin: theme.spacing(-2),
    },
  })
);

interface Props {
  rank: number;
  delta: number | 'N/A';
}

export const Graph = (props: Props) => {
  const classes = useStyles();

  const delta = props.delta === 'N/A' ? 0 : props.delta;

  return (
    <Grid item xs className={classes.container}>
      <Chart data={[1500]} />
      <Box className={classes.wrapper}>
        <Typography variant="h5" color="textPrimary">
          <b>Ranking</b>
        </Typography>
        <Typography variant="caption" color="textPrimary">
          {props.rank !== -1 && (
            <b>
              #{props.rank}{' '}
              <span
                style={{
                  color: delta > 0 ? '#99FF99' : '#DF5049',
                  display: delta === 0 ? 'none' : 'block',
                }}
              >
                {delta > 0 ? '+' : '-'}
                {delta}
              </span>
            </b>
          )}
        </Typography>
      </Box>
    </Grid>
  );
};
