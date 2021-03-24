import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  Typography,
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import { LinkButton } from '../components/common/LinkButton';
import { LeftCircle } from '../components/common/Circle';
import { useHistory } from 'react-router-dom';
interface Props {}

export const LoginView = (props: Props) => {
  const theme = useTheme();
  const palette = theme.palette;

  const history = useHistory();
  const handleSignUp = () => {
    history.push('/sign-up'), [history];
  };
  const handleSignIn = () => {
    history.push('/sign-in'), [history];
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
          style={{
            minHeight: '80%',
          }}
          spacing={1}
          alignItems="flex-start"
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
            <LinkButton color="primary" width="160px" onClick={handleSignUp}>
              Sign up!
            </LinkButton>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          style={{
            minHeight: '20%',
          }}
          spacing={1}
        >
          <Grid item>
            <Typography variant="h5">Already a member?</Typography>
          </Grid>
          <Grid item>
            <LinkButton
              color="secondary"
              width="100%"
              padding="1.25em"
              onClick={handleSignIn}
            >
              Login
            </LinkButton>
          </Grid>
        </Grid>
      </Box>
      <LeftCircle />
    </div>
  );
};
