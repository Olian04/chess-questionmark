import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { SettingsRoute } from './routes/SettingsRoute';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/settings" component={SettingsRoute} />
        <Route path="/">
          <Redirect to="/demo" />
        </Route>
      </Switch>
      {/* <BottomNavBar /> */}
    </Router>
  );
};
