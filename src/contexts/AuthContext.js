import React, {createContext, useReducer} from 'react';
import AuthReducer, {types} from './AuthReducer';

// Creation of the context
const AuthContext = createContext();

// Default value for the initial state of the user
const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

/**
 * Check if there is a user stored in local storage
 * If not, declare the default values
 * @returns Initial state object
 */
const initialState = () => {
  let user = localStorage.getItem('user');
  const isAuthenticated = !!user;
  user = user ? JSON.parse(user) : initialUser;
  return {
    isAuthenticated,
    user,
  };
}

/**
 * Allows consuming components to subscribe to context changes
 * @param {component} children
 */
const AuthProvider = ({children}) => {
  const [auth, dispatch] = useReducer(AuthReducer, initialState());

  const updateUserData = (name, value) => {
    dispatch({
      type: types.updateUser,
      name,
      value,
    });
  };

  const signUp = () => {
    dispatch({type: types.signUp});
  };

  const logout = () => {
    dispatch({
      type: types.logout,
      user: initialUser,
    });
  };

  return (
    <AuthContext.Provider value={{auth, updateUserData, signUp, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider};
export default AuthContext;
