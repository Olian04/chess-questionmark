import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { DemoRoute } from './routes/DemoRoute';
import { BottomNavBar } from './components/navigation/BottomNavBar';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/demo" component={DemoRoute} />
        <Route path="/">
          <Redirect to="/demo" />
        </Route>
      </Switch>
      {/* <BottomNavBar /> */}
    </Router>
  );
};
