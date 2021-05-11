import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import {
  Avatar,
  Box,
  Container,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { NavigationBar } from './components/navigation/NavigationBar';
import { LoginRoute } from './routes/LoginRoute';
import { SignUpRoute } from './routes/SignUpRoute';
import { SignInRoute } from './routes/SignInRoute';
import { PuzzleRoute } from './routes/PuzzleRoute';
import { ReplayRoute } from './routes/ReplayRoute';
import { AccountRoute } from './routes/AccountRoute';
import { AboutRoute } from './routes/AboutRoute';
import { PlayRoute } from './routes/PlayRoute';
import { RecoilRoute } from './providers/stateProvider';
import { BackgroundCircle } from './components/common/BackgroundCircle';
import { LoadingView } from './views/LoadingView';
import { isBrowser, isMobile } from 'react-device-detect';
import clsx from 'clsx';

import frame from '/iphone12maxpro.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
      minHeight: '100%',
      width: '100%',
      position: 'relative',
    },
    container: {
      height: 'calc(100% - 60px)',
    },
    browserWrapper: {
      height: 650,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      aspectRatio: '6 / 13',

      //cursor: 'none',

      backgroundImage: 'url(/iphone12maxpro.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      padding: 10,
      // transform: 'rotate(-35deg) skew(20deg, 5deg)',
    },
    browserContainer: {
      borderRadius: 40,
      width: '100%',
      height: 'calc(100% - 16px)',
      overflowY: 'auto',
      position: 'relative',
      scrollbarWidth: 'none', // only mozilla
    },
    mobileContainer: {
      height: '100vh',
    },
    center: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      padding: theme.spacing(4),
    },
    info: {
      width: '36em',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4),
      display: 'flex',
      borderRadius: theme.shape.borderRadius,
    },
    row: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
    highlight: {
      color: theme.palette.primary.light,
    },
    leftContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  })
);

export const AppContainer = () => {
  const classes = useStyles();
  if (isMobile) {
    return (
      <Box className={classes.mobileContainer}>
        <App />
      </Box>
    );
  }
  return (
    <Box className={classes.center}>
      <Box className={classes.wrapper}>
        <Box className={classes.leftContainer}>
          <Box className={clsx(classes.info, classes.row)}>
            <Box>
              <Typography
                variant="h2"
                align="left"
                gutterBottom
                color="textPrimary"
              >
                Welcome to <span className={classes.highlight}>chess?</span>
              </Typography>
              <Typography variant="h6" align="left" color="textPrimary">
                <span className={classes.highlight}>chess?</span> is definitely
                best viewed on a mobile phone.
              </Typography>
              <Typography variant="subtitle2" align="left" color="textPrimary">
                Try it out on your mobile, or here. The experience will be the
                same.
              </Typography>
            </Box>

            <Typography variant="h1">🥸</Typography>
          </Box>
        </Box>
        <Box className={classes.browserWrapper}>
          <Box className={classes.browserContainer}>
            <App />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.background}>
        <Switch>
          <RecoilRoute path="/login">
            <Container maxWidth="sm" className={classes.container}>
              <React.Suspense
                fallback={<LoadingView message="Fetching state" />}
              >
                <Switch>
                  <RecoilRoute exact path="/login" component={LoginRoute} />
                  <RecoilRoute
                    exact
                    path="/login/sign-up"
                    component={SignUpRoute}
                  />
                  <RecoilRoute
                    exact
                    path="/login/sign-in"
                    component={SignInRoute}
                  />
                  <RecoilRoute>
                    <Redirect to="/login" />
                  </RecoilRoute>
                </Switch>
              </React.Suspense>
            </Container>
          </RecoilRoute>
          <RecoilRoute path="/">
            <NavigationBar
              menuItems={[
                { title: 'Account', to: '/account' },
                { title: 'Play', to: '/play' },
                { title: 'About', to: '/about' },
              ]}
            />
            <Container maxWidth="sm" className={classes.container}>
              <React.Suspense
                fallback={<LoadingView message="Fetching state" />}
              >
                <Switch>
                  <RecoilRoute
                    guarded
                    exact
                    path="/puzzle"
                    component={PuzzleRoute}
                  />
                  <RecoilRoute
                    guarded
                    path="/replay/:id"
                    component={ReplayRoute}
                  />
                  <RecoilRoute
                    guarded
                    exact
                    path="/account"
                    component={AccountRoute}
                  />
                  <RecoilRoute
                    guarded
                    exact
                    path="/about"
                    component={AboutRoute}
                  />
                  <RecoilRoute
                    guarded
                    exact
                    path="/play"
                    component={PlayRoute}
                  />
                  <RecoilRoute guarded exact path="/">
                    <Redirect to="/play" />
                  </RecoilRoute>
                </Switch>
              </React.Suspense>
            </Container>
          </RecoilRoute>
        </Switch>
      </div>
      <BackgroundCircle />
    </Router>
  );
};
