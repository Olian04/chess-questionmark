import React from 'react';
import { ButtonProps, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { LinkButton } from '../common/LinkButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      height: '60px',
    },
  })
);

interface Props extends ButtonProps {
  title: string;
  subTitle?: string;
}

export const TwoRowButton = (props: Props) => {
  const classes = useStyles();
  const { title, subTitle, className, ...innerProps } = props;
  return (
    <LinkButton
      margin={0.1}
      className={clsx(className || '', classes.button)}
      {...innerProps}
    >
      <Grid item container direction="column" xs>
        <Grid item container alignItems="flex-start" xs>
          <Typography variant="button" color="textPrimary">
            <b>{title}</b>
          </Typography>
        </Grid>
        {subTitle ? (
          <Grid item container alignItems="flex-start" xs>
            <Typography variant="caption" color="textPrimary">
              {subTitle}
            </Typography>
          </Grid>
        ) : null}
      </Grid>
    </LinkButton>
  );
};
