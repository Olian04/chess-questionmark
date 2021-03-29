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
import { SettingsRoute } from './routes/SettingsRoute';
import { GameView } from './views/GameView.tsx';
import { ReplayView } from './views/ReplayView.tsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      backgroundColor: theme.palette.background.default,
      height: '100vh',
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
        <NavigationBar
          menuItems={[
            { title: 'Play', active: false },
            { title: 'Profile', active: false },
            { title: 'Settings', active: true },
          ]}
        />
        <Container maxWidth="sm" className={classes.container}>
          <Switch>
            <Route exact path="/game" component={GameView} />
            <Route exact path="/replay" component={ReplayView} />
            <Route exact path="/settings" component={SettingsRoute} />
            <Route path="/">
              <Redirect to="/demo" />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
};
