import React from 'react';
import { Button as MaterialButton, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { globalNavBar } from '../../state/navbar';
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
    path: string;
  }[];
}

export const PillBar = (props: Props) => {
  const classes = useStyles();

  const position = useRecoilValue(globalNavBar);

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
            className={clsx(
              classes.button,
              i === position ? classes.active : ''
            )}
            onClick={() => handleClick(item.path)}
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
