import {useContext} from "react";
import {Route, Redirect} from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";

// A wrapper for <Route> that redirects to the dashboard
// screen if you're authenticated.
const PublicRoute = ({ component: Component, ...rest }) => {
  const {auth} = useContext(AuthContext);

  return (
    <Route {...rest}>
      {!auth.isAuthenticated
        ? <Component />
        : <Redirect to="/" />
      }
    </Route>
  );
}

export default PublicRoute;
