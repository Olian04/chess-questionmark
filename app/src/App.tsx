import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
      height: '100vh',
      width: '100vw',
      position: 'relative',
    },
    container: {
      height: 'calc(100vh - 60px)',
    },
  })
);

export const App = () => {
  const classes = useStyles();
  <RecoilRoute guarded path="/replay/:id" component={ReplayRoute} />;
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
          <RecoilRoute guarded path="/">
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
