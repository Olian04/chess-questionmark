import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      padding: '10px',
    },
  })
);

interface Props {
  text: string;
  subText: string;
}

export const Tile = (props: Props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.background}>
      <Grid container direction="column">
        <Grid item container justify="center" alignItems="center" xs>
          <Typography variant="h4" color="textPrimary">
            {props.text}
          </Typography>
        </Grid>
        <Grid item container justify="center" alignItems="center" xs>
          <Typography variant="button" color="textPrimary">
            <b>{props.subText}</b>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
