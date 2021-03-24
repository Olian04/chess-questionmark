import React from 'react';
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { RoundedTextField } from '../components/common/RoundedTextField';
import Logo from '/sign-up-logo.svg';
import { LinkButton } from '../components/common/LinkButton';
import { StyledLink } from '../components/common/CustomLink';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
    },
    gridBase: {
      zIndex: 1,
      position: 'relative',
    },
  })
);

export const SignUpView = (props: Props) => {
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
        <Grid item>
          <img src={Logo}></img>
        </Grid>
        <Grid item style={{ marginBottom: '1.25em' }}>
          <Typography variant="h4" align="center">
            Create an account
          </Typography>
        </Grid>
        <Grid item>
          <form noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <RoundedTextField
                  color="secondary"
                  autoComplete="name"
                  name="name"
                  variant="filled"
                  required
                  fullWidth
                  id="ingameName"
                  label="In-game Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <RoundedTextField
                  color="secondary"
                  autoComplete="email"
                  name="name"
                  variant="filled"
                  required
                  fullWidth
                  id="email"
                  label="Email"
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
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="checked"
                      />
                    }
                    label={
                      <Typography>
                        I agree to the <StyledLink to="#">Terms</StyledLink> and{' '}
                        <br />
                        <StyledLink to="#">Privacy Policy</StyledLink>
                      </Typography>
                    }
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '2em' }}>
                <LinkButton
                  type="submit"
                  fullWidth
                  color="secondary"
                  padding="1em"
                >
                  Sign up
                </LinkButton>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Already got an account?{' '}
                  <StyledLink to="/sign-in">Sign in</StyledLink>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
