import React from 'react';
import {
  Grid,
  Typography,
  Button as MaterialButton,
  ButtonProps,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperButton: {
      textAlign: 'left',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(2),
      maxHeight: 160,
      '&:focus': {
        color: theme.palette.secondary.contrastText,
      },
    },
  })
);

interface Props extends ButtonProps {
  icon: any;
  text: string;
  subText: string | JSX.Element;
}

export const Button = (props: Props) => {
  const { icon, text, subText, ...innerProps } = props;
  const classes = useStyles();

  return (
    <Grid xs item>
      <MaterialButton
        className={classes.paperButton}
        variant="contained"
        fullWidth
        {...innerProps}
      >
        <Grid container>
          <Grid xs={8} item>
            <Typography variant="h5">
              <b>{text}</b>
            </Typography>
            <Typography variant="subtitle2">{subText}</Typography>
          </Grid>
          <Grid xs={4} item>
            <img src={icon} height="100%" width="100%" />
          </Grid>
        </Grid>
      </MaterialButton>
    </Grid>
  );
};
