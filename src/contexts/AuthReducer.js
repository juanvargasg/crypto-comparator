const types = {
  updateUser: 'updateUser',
  signUp: 'signUp',
  logout: 'logout',
};

const STORAGE_USER = 'user';

/**
 * Reducer to control the authentication flow throughout the application
 * @param {*} state Actual state
 * @param {*} action 
 * @returns New state
 */
const AuthReducer = (state, action) => {
  let user = {};
  switch (action.type) {
    case types.updateUser:
      user = {
        ...state.user,
        [action.name]: action.value,
      }
      return {
        ...state,
        user,
      };
    case types.signUp:
      localStorage.setItem(STORAGE_USER, JSON.stringify(state.user));
      return {
        ...state,
        isAuthenticated: true,
      };
    case types.logout:
      localStorage.removeItem(STORAGE_USER);
      return {
        user: action.user,
        isAuthenticated: false,
      };
    default:
      return state;
  };
};

export {types};
export default AuthReducer;
