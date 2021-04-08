import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from "../../../Store/actions/index";
const Logout = (props) => {
  useEffect(() => {
    props.onlogout();
  });
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};

const mapdispatchtoprops = (dispatch) => {
  return {
    onlogout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapdispatchtoprops)(Logout);
