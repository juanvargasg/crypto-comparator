import React, {createContext, useReducer} from 'react';
import AuthReducer, {types} from './AuthReducer';

const AuthContext = createContext();

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

const AuthProvider = ({children}) => {
  const [auth, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: false,
    user: initialUser,
  });

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
