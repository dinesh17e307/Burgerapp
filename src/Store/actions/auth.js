import * as actiontypes from "../actions/actionTypes";
import axios from "axios";
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
        dispatch(authsuccess(res.data.idToken, res.data.localId));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authfail(err.response.data.error));
      });
  };
};
