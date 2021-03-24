import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import { LeftCircle } from '../components/common/Circle';
import { ArrowForwardIosRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { RoundedTextField } from '../components/common/RoundedTextField';
import { LinkButton } from '../components/common/LinkButton';

interface Props {}

export const SignInView = (props: Props) => {
  const theme = useTheme();
  const palette = theme.palette;
  return (
    <div
      style={{
        height: '100vh',
        padding: '0em 2em 0em 2em',
        backgroundColor: palette.background.default,
        color: palette.text.primary,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box zIndex={1} height="100%" position="relative">
        <Grid
          container
          direction="column"
          justify="center"
          spacing={1}
          alignItems="center"
          style={{ height: '100%' }}
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
                    <Link
                      to="/sign-up"
                      style={{
                        textDecoration: 'none',
                        display: 'inline-block',
                        color: palette.secondary.main,
                      }}
                    >
                      Sign up!
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
      <LeftCircle />
    </div>
  );
};
