import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  user: null,
  myprofile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        user: action.user,
        myprofile: action.myprofile
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
