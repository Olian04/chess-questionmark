import React from 'react';
import { Grid, Typography, Button as MaterialButton } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
    },
  })
);

interface Props {
  icon: JSX.Element;
  text: string;
  subText: string;
}

export const Button = (props: Props) => {
  const classes = useStyles();

  return (
    <MaterialButton className={classes.button} endIcon={props.icon}>
      <Grid item container direction="column" justify="space-between">
        <Grid item container alignItems="flex-start" xs>
          <Typography variant="h5" color="textPrimary">
            <b>{props.text}</b>
          </Typography>
        </Grid>
        <Grid item container alignItems="flex-start" xs>
          <Typography
            variant="caption"
            color="textPrimary"
            dangerouslySetInnerHTML={{
              __html: props.subText,
            }}
          />
        </Grid>
      </Grid>
    </MaterialButton>
  );
};
