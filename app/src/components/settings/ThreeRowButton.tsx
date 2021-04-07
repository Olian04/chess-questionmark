import React from 'react';
import { ButtonProps, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { LinkButton } from '../common/LinkButton';
import { PlayCircleOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      height: '60px',
    },
  })
);

interface Props extends ButtonProps {
  name: string;
  rank?: string;
  delta?: string;
  avatar?: JSX.Element;
}

export const ThreeRowButton = (props: Props) => {
  const classes = useStyles();
  const { name, rank, delta, avatar, className, ...innerProps } = props;
  return (
    <LinkButton
      startIcon={avatar}
      endIcon={<PlayCircleOutline />}
      margin={0.1}
      className={clsx(className || '', classes.button)}
      {...innerProps}
    >
      <Grid item container direction="column" xs>
        <Grid item container alignItems="flex-start" xs>
          <Typography variant="button" color="textPrimary">
            <b>{name}</b>
          </Typography>
        </Grid>
        {rank ? (
          <Grid item container alignItems="flex-start" xs>
            <Typography variant="caption" color="textPrimary">
              {rank}
            </Typography>
          </Grid>
        ) : null}
        {delta ? (
          <Grid item container alignItems="flex-start" xs>
            <Typography variant="caption" color="textPrimary">
              <span
                style={{ color: delta.includes('+') ? '#99FF99' : '#DF5049' }}
              >
                {delta}
              </span>
            </Typography>
          </Grid>
        ) : null}
      </Grid>
    </LinkButton>
  );
};
