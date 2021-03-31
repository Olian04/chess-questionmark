import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { NavigationBar } from './components/navigation/NavigationBar';
import { LoginRoute } from './routes/LoginRoute';
import { SignUpRoute } from './routes/SignUpRoute';
import { SignInRoute } from './routes/SignInRoute';
import { PlayRoute } from './routes/PlayRoute';
import { GameRoute } from './routes/GameRoute';
import { ReplayRoute } from './routes/ReplayRoute';
import { SettingsRoute } from './routes/SettingsRoute';
import { useRecoilState } from 'recoil';
import { globalNavBar } from './state/navbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
      height: '100vh',
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
  const [_, setPosition] = useRecoilState(globalNavBar);
  const renderComponent = (component: React.ReactElement, position: number) => {
    setPosition(position);
    return component;
  };
  return (
    <Router>
      <div className={classes.background}>
        <Switch>
          <Route path="/login">
            <Container maxWidth="sm" className={classes.container}>
              <Switch>
                <Route exact path="/login" component={LoginRoute} />
                <Route exact path="/login/sign-up" component={SignUpRoute} />
                <Route exact path="/login/sign-in" component={SignInRoute} />
              </Switch>
            </Container>
          </Route>
          <Route path="/">
            <NavigationBar
              menuItems={[
                { title: 'Play', active: false, path: '/play' },
                { title: 'Profile', active: false, path: '/profile' },
                { title: 'Settings', active: true, path: '/settings' },
              ]}
            />
            <Container maxWidth="sm" className={classes.container}>
              <Switch>
                <Route
                  exact
                  path="/game"
                  render={() => renderComponent(<GameRoute />, -1)}
                />
                <Route
                  exact
                  path="/replay"
                  render={() => renderComponent(<ReplayRoute />, -1)}
                />
                <Route
                  exact
                  path="/settings"
                  render={() => renderComponent(<SettingsRoute />, 2)}
                />
                <Route
                  exact
                  path="/play"
                  render={() => renderComponent(<PlayRoute />, 0)}
                />
                <Route>
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
