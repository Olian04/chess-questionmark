import React from 'react';
import { Grid, Typography, Paper, Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { borders, borderRadius, border } from '@material-ui/system';

// should go for chart.js in the future
import graphSvg from '/graph.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      borderRadius: theme.shape.borderRadius,
      background:
        theme.palette.background.paper +
        ` url(${graphSvg})` +
        ' bottom right no-repeat',

      backgroundOrigin: 'border-box',
      backgroundBlendMode: 'soft-light',
      margin: theme.spacing(1),
      minHeight: '160px',
    },
  })
);

interface Props {
  rank: string;
  delta: string;
}

export const Graph = (props: Props) => {
  const classes = useStyles();

  return (
    <Grid item xs className={classes.background}>
      <Box>
        <Typography variant="h5" color="textPrimary">
          <b>Ranking</b>
        </Typography>
        <Typography variant="caption" color="textPrimary">
          <b>
            #{props.rank}{' '}
            <span
              style={{
                color: props.delta.includes('+') ? '#99FF99' : '#DF5049',
              }}
            >
              {props.delta}
            </span>
          </b>
        </Typography>
      </Box>
    </Grid>
  );
};
