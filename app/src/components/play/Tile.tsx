import React from 'react';
import { Grid, Typography, Paper, Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { LoadingAnimation } from '../common/LoadingAnimation';

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
  text: string | number;
  subText: string | number;
}

export const Tile = (props: Props) => {
  const classes = useStyles();

  return (
    <Grid item xs>
      <Paper className={classes.paper}>
        {props.text === -1 && (
          <Box>
            <LoadingAnimation />
          </Box>
        )}
        {props.text !== -1 && (
          <Box>
            <Typography variant="h4">{props.text}</Typography>
            <Typography variant="subtitle2">{props.subText}</Typography>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};
