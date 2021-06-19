import {useContext} from "react";
import {Route, Redirect} from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ component: Component, ...rest }) => {
  const {auth} = useContext(AuthContext);

  return (
    <Route {...rest}>
      {auth.isAuthenticated
        ? <Component />
        : <Redirect to="/signup" />
      }
    </Route>
  );
}

export default PrivateRoute;
