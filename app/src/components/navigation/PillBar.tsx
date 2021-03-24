import React from 'react';
import {
  Button as MaterialButton,
  ButtonGroup as MaterialButtonGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      backgroundColor: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
    },
    button: {
      backgroundColor: theme.palette.secondary.main,
      width: '100%',
    },
    active: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

interface Props {
  items: {
    title: string;
    active: boolean;
  }[];
}

export const PillBar = (props: Props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.background}
      justify="center"
      alignContent="stretch"
      alignItems="stretch"
    >
      {props.items.map((item, i) => (
        <Grid item key={i} xs>
          <MaterialButton
            variant="contained"
            disableElevation={true}
            className={
              item.active
                ? clsx(classes.button, classes.active)
                : classes.button
            }
          >
            <Typography variant="caption" color="textPrimary">
              {item.title}
            </Typography>
          </MaterialButton>
        </Grid>
      ))}
    </Grid>
  );
};
