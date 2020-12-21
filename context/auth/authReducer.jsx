import { LOGIN_GOOGLE } from "../../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_GOOGLE:
      return {
        ...state,
        usuario: action.payload,
      };
    default:
      return state;
  }
};
export default AuthReducer;
