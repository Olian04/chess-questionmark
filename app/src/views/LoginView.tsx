import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { LinkButton } from '../components/common/LinkButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
    },
    gridBase: {
      zIndex: 1,
      position: 'relative',
    },
    gridTop: {
      minHeight: '80%',
    },
    gridBottom: {
      minHeight: '20%',
    },
    loginButton: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.black,
    },
  })
);

interface Props {
  onClickSignUp: () => void;
  onClickSignIn: () => void;
}

export const LoginView = (props: Props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid
        container
        direction="column"
        justify="center"
        className={clsx(classes.gridBase, classes.gridTop)}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h4">Lets start!</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="subtitle1">
            Reshape your chess skills by playing against <b>others</b> and
            aswell as our <b>blunderAI</b>.
          </Typography>
        </Grid>
        <Grid item>
          <LinkButton
            color="primary"
            width="160px"
            onClick={props.onClickSignUp}
          >
            Sign up!
          </LinkButton>
        </Grid>
      </Grid>
      <Grid
        container
        className={clsx(classes.gridBase, classes.gridBottom)}
        direction="column"
        justify="center"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h5">Already a member?</Typography>
        </Grid>
        <Grid item>
          <LinkButton
            className={classes.loginButton}
            fullWidth
            padding="1.25em"
            onClick={props.onClickSignIn}
          >
            Login
          </LinkButton>
        </Grid>
      </Grid>
    </Container>
  );
};
