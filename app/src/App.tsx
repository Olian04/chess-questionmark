import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { DemoRoute } from './routes/DemoRoute';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { LoginView } from './views/Login';
import { SignUpView } from './views/SignUp';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginView} />
        <Route exact path="/sign-up" component={SignUpView} />
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
      {/* <BottomNavBar /> */}
    </Router>
  );
};
