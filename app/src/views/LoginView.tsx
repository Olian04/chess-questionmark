import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { LinkButton } from '../components/common/LinkButton';
import { ReplayComponent } from '../components/common/ReplayComponent';
import { RandomGame } from '../types/RandomGame';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
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
  game: RandomGame;
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
          <ReplayComponent
            fen={props.game.history[0]}
            size={0.3}
            player={{
              name: props.game.player.name ?? 'N/A',
              email: 'N/A',
              countryCode: props.game.player.countryCode ?? 'SE',
              rating: props.game.player.rank ?? -1,
              playerIsWhite: true,
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h4">Welcome to chess?</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="subtitle1">
            Sign up and play a game against our <b>BlunderAI</b>
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
