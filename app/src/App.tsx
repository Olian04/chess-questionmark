import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { LoadingAnimation } from './components/common/LoadingAnimation';
import { NavigationBar } from './components/navigation/NavigationBar';
import { LoginRoute } from './routes/LoginRoute';
import { SignUpRoute } from './routes/SignUpRoute';
import { SignInRoute } from './routes/SignInRoute';
import { PlayRoute } from './routes/PlayRoute';
import { GameRoute } from './routes/GameRoute';
import { PuzzleRoute } from './routes/PuzzleRoute';
import { ReplayRoute } from './routes/ReplayRoute';
import { SettingsRoute } from './routes/SettingsRoute';
import { ProfileRoute } from './routes/ProfileRoute';
import { RecoilRoute } from './providers/stateProvider';
import { BackgroundCircle } from './components/common/BackgroundCircle';
import { GameHydrationProvider } from './providers/GameHydrationProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
      height: '100vh',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
    },
    container: {
      height: 'calc(100vh - 60px)',
    },
  })
);

export const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.background}>
        <React.Suspense fallback={<LoadingAnimation />}>
          <Switch>
            <RecoilRoute path="/login">
              <Container maxWidth="sm" className={classes.container}>
                <React.Suspense fallback={<LoadingAnimation />}>
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
                  { title: 'Play', to: '/play' },
                  { title: 'Profile', to: '/profile' },
                  { title: 'Settings', to: '/settings' },
                ]}
              />
              <Container maxWidth="sm" className={classes.container}>
                <React.Suspense fallback={<LoadingAnimation />}>
                  <Switch>
                    <RecoilRoute
                      guarded
                      exact
                      path="/game"
                      component={GameRoute}
                    />
                    <RecoilRoute
                      guarded
                      exact
                      path="/puzzle"
                      component={PuzzleRoute}
                    />
                    <RecoilRoute
                      guarded
                      exact
                      path="/replay"
                      component={ReplayRoute}
                    />
                    <RecoilRoute
                      guarded
                      exact
                      path="/settings"
                      component={SettingsRoute}
                    />
                    <RecoilRoute
                      guarded
                      exact
                      path="/play"
                      component={PlayRoute}
                    />
                    <RecoilRoute
                      guarded
                      exact
                      path="/profile"
                      component={ProfileRoute}
                    />
                    <RecoilRoute guarded exact path="/">
                      <Redirect to="/profile" />
                    </RecoilRoute>
                  </Switch>
                </React.Suspense>
              </Container>
            </RecoilRoute>
          </Switch>
        </React.Suspense>
      </div>
      <BackgroundCircle />
    </Router>
  );
};
