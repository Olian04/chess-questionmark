import React from 'react';
import { Grid, Typography, Button as MaterialButton } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperButton: {
      textAlign: 'left',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(2),
      '&:focus': {
        color: theme.palette.secondary.contrastText,
      },
    },
  })
);

interface Props {
  icon: any;
  text: string;
  subText: string | JSX.Element;
}

export const Button = (props: Props) => {
  const classes = useStyles();

  return (
    <Grid xs item>
      <MaterialButton className={classes.paperButton} variant="contained">
        <Grid container>
          <Grid xs={8} item>
            <Typography variant="h5">{props.text}</Typography>
            <Typography variant="subtitle2">{props.subText}</Typography>
          </Grid>
          <Grid xs={4} item>
            <img src={props.icon} width="100%" />
          </Grid>
        </Grid>
      </MaterialButton>
    </Grid>
  );
};
