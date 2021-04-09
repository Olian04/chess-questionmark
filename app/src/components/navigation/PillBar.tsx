import React from 'react';
import { Button as MaterialButton, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      backgroundColor: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
    },
    button: {
      backgroundColor: theme.palette.primary.dark,
      width: '100%',
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
      },
      '&:active': {
        backgroundColor: theme.palette.primary.main,
      },
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
    onClick: () => void;
  }[];
}

export const PillBar = (props: Props) => {
  const classes = useStyles();

  const history = useHistory();

  const handleClick = (path: string) => {
    history.push(path);
  };

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
            onClick={item.onClick}
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
