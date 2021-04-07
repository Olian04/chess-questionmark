import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      textAlign: 'center',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
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
    <Grid item xs>
      <Paper className={classes.paper}>
        <Typography variant="h4">{props.text}</Typography>
        <Typography variant="subtitle2">{props.subText}</Typography>
      </Paper>
    </Grid>
  );
};
