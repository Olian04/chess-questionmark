import React from 'react';
import { Grid, Typography, Button as MaterialButton } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      padding: '5px',
    },
  })
);

interface Props {
  startIcon: JSX.Element;
  endIcon: JSX.Element;
  text: string;
  subText: string;
  subSubText: string;
}

export const MatchesButton = (props: Props) => {
  const classes = useStyles();

  return (
    <MaterialButton className={classes.button} endIcon={props.endIcon} startIcon={props.startIcon}>
      <Grid item container direction="column" justify="space-between">
        <Grid item container alignItems="flex-start" xs>
          <Typography variant="button" color="textPrimary">
            <b>{props.text}</b>
          </Typography>
        </Grid>
        <Grid item container alignItems="flex-start" xs>
        <Typography variant="caption" color="textPrimary">
              {props.subText}
            </Typography>
        </Grid>
        <Grid item container alignItems="flex-start" xs>
            <Typography variant="caption" color="textPrimary">
              {props.subSubText}
            </Typography>
          </Grid>
      </Grid>
    </MaterialButton>
  );
};
