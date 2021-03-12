import * as actiontypes from "./../actions/actionTypes";
import { updateobject } from "../../shared/utilitty";
const initialstate = {
  error: null,
  tokenid: null,
  userid: null,
  loading: false,
  redirectpath: "/",
};
const authstart = (state, action) => {
  return updateobject(state, { loading: true, error: null });
};
const authsuccess = (state, action) => {
  return updateobject(state, {
    loading: false,
    error: null,
    tokenid: action.tokenid,
    userid: action.userid,
  });
};
const authfails = (state, action) => {
  return updateobject(state, { loading: false, error: action.error });
};
const authlogout = (state, action) => {
  return updateobject(state, { tokenid: null, userid: null });
};
const setauthredirectpath = (state, action) => {
  return updateobject(state, { redirectpath: action.path });
};
const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actiontypes.AUTH_START:
      return authstart(state, action);
    case actiontypes.AUTH_SUCCESS:
      return authsuccess(state, action);
    case actiontypes.AUTH_FAIL:
      return authfails(state, action);
    case actiontypes.AUTH_LOGOUT:
      return authlogout(state, action);
    case actiontypes.SET_AUTHREDIRECT_PATH:
      return setauthredirectpath(state, action);
    default:
      return state;
  }
};
export default reducer;
