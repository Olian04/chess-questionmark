import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { DemoRoute } from './routes/DemoRoute';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { LoginRoute } from './routes/LoginRoute';
import { SignUpRoute } from './routes/SignUpRoute';
import { SignInRoute } from './routes/SignInRoute';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      padding: '0em 2em 0em 2em',
    },
  })
);

export const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.background}>
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <Route exact path="/sign-up" component={SignUpRoute} />
          <Route exact path="/sign-in" component={SignInRoute} />
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
      {/* <BottomNavBar /> */}
    </Router>
  );
};
