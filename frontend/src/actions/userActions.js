import axios from "axios";
import Cookies from "js-cookie";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const signin = (email, password) => {
  return async function (dispatch) {
    try {
      dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
      // THE TYPE WASNT GIVEN
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookies.set("userInfo", JSON.stringify(data), { expires: 7 });
      console.log("data:" + JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
  };
};

export const register = (name, email, password) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
        payload: { name, email, password },
      });
      // THE TYPE WASNT GIVEN
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      Cookies.set("userInfo", JSON.stringify(data), { expires: 7 });
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  };
};
