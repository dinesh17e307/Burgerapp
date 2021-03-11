import * as actiontypes from "../actions/actionTypes";
import axios from "axios";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actiontypes.AUTH_LOGOUT,
  };
};
export const checkAuthtimeout = (authentictime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, authentictime * 1000);
  };
};
export const authstart = () => {
  return {
    type: actiontypes.AUTH_START,
  };
};
export const authsuccess = (tokenid, userid) => {
  return {
    type: actiontypes.AUTH_SUCCESS,
    tokenid: tokenid,
    userid: userid,
  };
};
export const authfail = (error) => {
  return {
    type: actiontypes.AUTH_FAIL,
    error: error,
  };
};
export const auth = (email, password, signup) => {
  return (dispatch) => {
    dispatch(authstart());
    const authdata = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAl5yqwiKZjGHOYYI3sHghAkOWS0pMMWo0";
    if (!signup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAl5yqwiKZjGHOYYI3sHghAkOWS0pMMWo0";
    }
    axios
      .post(url, authdata)
      .then((res) => {
        console.log(res.data);
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authsuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthtimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authfail(err.response.data.error));
      });
  };
};
export const setauthredirectpath = (path) => {
  return {
    type: actiontypes.SET_AUTHREDIRECT_PATH,
    path: path,
  };
};
export const authcheckstate = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expiresdate = new Date(localStorage.getItem("expirationDate"));
      if (expiresdate <= new Date()) {
        dispatch(logout());
      } else {
        const user = localStorage.getItem("userId");
        dispatch(authsuccess(token, user));
        dispatch(
          checkAuthtimeout(
            (expiresdate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
