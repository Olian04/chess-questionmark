import React from 'react';
import { ButtonProps, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { LinkButton } from '../common/LinkButton';
import { PlayCircleOutline } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';

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
  delta?: number | undefined;
  avatar?: JSX.Element;
}

export const ThreeRowButtonSkeleton = () => {
  const classes = useStyles();

  return (
    <LinkButton
      startIcon={
        <Skeleton
          animation="wave"
          variant="circle"
          width="40px"
          height="40px"
        />
      }
      endIcon={
        <Skeleton
          animation="wave"
          variant="circle"
          width="15px"
          height="15px"
        />
      }
      margin={0.1}
      className={classes.button}
    >
      <Grid item container direction="column" spacing={1} xs>
        <Grid item container alignItems="flex-start" xs>
          <Skeleton animation="wave" variant="text" width="60px" height="8px" />
        </Grid>
        <Grid item container alignItems="flex-start" xs>
          <Skeleton animation="wave" variant="text" width="40px" height="8px" />
        </Grid>
        <Grid item container alignItems="flex-start" xs>
          <Skeleton animation="wave" variant="text" width="20px" height="8px" />
        </Grid>
      </Grid>
    </LinkButton>
  );
};

export const ThreeRowButton = (props: Props) => {
  const classes = useStyles();
  const { name, rank, delta, avatar, className, ...innerProps } = props;
  return (
    <>
      {!name && <ThreeRowButtonSkeleton />}
      {name && (
        <LinkButton
          startIcon={avatar}
          endIcon={<PlayCircleOutline height="40px" width="40px" />}
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
                  <span style={{ color: delta > 0 ? '#99FF99' : '#DF5049' }}>
                    {delta === 0 ? '' : delta > 0 ? '+' : ''}
                    {delta}
                  </span>
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </LinkButton>
      )}
    </>
  );
};
