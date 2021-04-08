import { AUTH, GET, LOGIN } from "../Constaints/Auth";

const User = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case GET:
      return { authData: action?.data };
    default:
      return state;
  }
};

export default User;
