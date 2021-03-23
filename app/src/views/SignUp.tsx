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

import Logo from '/sign-up-logo.svg';

interface Props {}

export const SignUpView = (props: Props) => {
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
          <Grid item>
            <img src={Logo}></img>
          </Grid>
          <Grid item style={{ marginBottom: '2em' }}>
            <Typography variant="h4" align="center">
              Create an account
            </Typography>
          </Grid>
          <Grid item>
            <form noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
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
                  <TextField
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
                  <TextField
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
                      label={'I agree to the Terms and Privacy Policy'}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '2em' }}>
                  {/* Should be able to incorporate this to "LinkButton" */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    style={{
                      paddingTop: '1em',
                      paddingBottom: '1em',
                      justifyContent: 'space-between',
                      textTransform: 'none',
                    }}
                    endIcon={<ArrowForwardIosRounded />}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Already got an account?{' '}
                    <Link
                      to="/sign-in"
                      style={{
                        textDecoration: 'none',
                        display: 'inline-block',
                        color: palette.secondary.main,
                      }}
                    >
                      Sign in
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
