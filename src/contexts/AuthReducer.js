const types = {
  isAuthenticated: 'isAuthenticated',
  updateUser: 'updateUser',
  signUp: 'signUp',
  logout: 'logout',
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case types.isAuthenticated:
      return {
        ...state,
        isAuthenticated: false,
      };
    case types.updateUser:
      const user = {
        ...state.user,
        [action.name]: action.value,
      }
      return {
        ...state,
        user,
      };
    case types.signUp:
      return {
        ...state,
        isAuthenticated: true,
      };
    case types.logout:
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
