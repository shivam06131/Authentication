import * as api from "../Api/AuthApi";
import { AUTH, LOGIN, GET } from "../Constaints/Auth";

export const CreatePost = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.createUser(formData);
    dispatch({ type: AUTH, data });
    history.push("/main");
  } catch (error) {
    console.log(error);
  }
};

export const GetPOst = () => async (dispatch) => {
  try {
    const { data } = await api.getPost();
    dispatch({ type: GET, data });
  } catch (error) {
    console.log(error);
  }
};

export const LogIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.LogIn(formData);
    dispatch({ type: LOGIN, data });
    history.push("/main");
  } catch (error) {
    console.log(error);
  }
};
