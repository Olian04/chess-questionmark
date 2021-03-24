import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RoundedTextField } from '../components/common/RoundedTextField';
import { LinkButton } from '../components/common/LinkButton';
import { StyledLink } from '../components/common/CustomLink';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
    },
    gridBase: {
      zIndex: 1,
      position: 'relative',
    },
  })
);

export const SignInView = (props: Props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={1}
        alignItems="center"
        className={classes.gridBase}
      >
        <Grid item style={{ marginBottom: '2em' }}>
          <Typography variant="h4" align="center">
            Sign in
          </Typography>
        </Grid>
        <Grid item>
          <form noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <RoundedTextField
                  color="secondary"
                  autoComplete="email"
                  name="email"
                  variant="filled"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <RoundedTextField
                  color="secondary"
                  variant="filled"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>

              <Grid item xs={12} style={{ marginTop: '2em' }}>
                <LinkButton
                  type="submit"
                  color="secondary"
                  padding="1em"
                  fullWidth
                >
                  Take me to battle
                </LinkButton>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Don't have an account with us yet?{' '}
                  <StyledLink to="sign-up">Sign up</StyledLink>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
