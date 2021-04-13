import React from 'react';
import { Grid, Typography, Button as MaterialButton } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperButton: {
      textAlign: 'left',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(1),
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
  onClick: () => void;
}

export const Button = (props: Props) => {
  const classes = useStyles();

  return (
    <Grid xs item>
      <MaterialButton
        onClick={props.onClick}
        className={classes.paperButton}
        variant="contained"
        fullWidth
      >
        <Grid container>
          <Grid xs={8} item>
            <Typography variant="h5">{props.text}</Typography>
            <Typography variant="subtitle2">{props.subText}</Typography>
          </Grid>
          <Grid xs={4} item>
            <img src={props.icon} height="100%" width="100%" />
          </Grid>
        </Grid>
      </MaterialButton>
    </Grid>
  );
};
