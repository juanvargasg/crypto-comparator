import React, { useContext } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Error404 from '../pages/Error404';
import SignUp from '../pages/SignUp';
import AuthContext from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
  const {auth} = useContext(AuthContext);

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
