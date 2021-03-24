import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import { LeftCircle } from '../components/common/Circle';
import { RoundedTextField } from '../components/common/RoundedTextField';
import { Link } from 'react-router-dom';
import Logo from '/sign-up-logo.svg';
import { LinkButton } from '../components/common/LinkButton';
import { StyledLink } from '../components/common/CustomLink';

interface Props {}

export const SignUpView = (props: Props) => {
  const theme = useTheme();
  const palette = theme.palette;

  const handleTermAndPrivacy = () => {
    return (
      <Typography>
        I agree to the <StyledLink to="#">Terms</StyledLink> and <br />
        <StyledLink to="#">Privacy Policy</StyledLink>
      </Typography>
    );
  };
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
                      label={handleTermAndPrivacy()}
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
      </Box>
      <LeftCircle />
    </div>
  );
};
