import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Error404 from '../pages/Error404';
import SignUp from '../pages/SignUp';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

/**
 * Component for application navigation
 * consists of private and public routes
 */
const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
