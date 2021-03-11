import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from "../../../Store/actions/index";
export class Logout extends Component {
  componentDidMount() {
    this.props.onlogout();
  }
  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
}
const mapdispatchtoprops = (dispatch) => {
  return {
    onlogout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapdispatchtoprops)(Logout);
