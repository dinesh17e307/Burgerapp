import classes from "./App.module.css";
import Layout from "./Components/Layout/Layout";
import Burgerbuilder from "./Container/BurgerBuilder/Burgerbuilder";
import Http from "./Container/BurgerBuilder/HTTP/Http";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Checkout from "./Container/Checkout/Checkout";
import Orders from "./Components/Orders/Orders";
import Auth from "./Container/Auth/Auth";
import Logout from "./Container/Auth/logout/Logout";
import { connect } from "react-redux";
import * as actions from "./Store/actions/index";
import React, { Component } from "react";
class App extends Component {
  componentDidMount() {
    this.props.onauthcheck();
  }
  render() {
    let route = (
      <Switch>
        <Route exact path="/" component={Burgerbuilder} />
        <Route exact path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isauth) {
      route = (
        <Switch>
          <Route exact path="/" component={Burgerbuilder} />
          <Route exact path="/orders" component={Orders} />

          <Route path="/checkout" component={Checkout} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{route}</Layout>
      </div>
    );
  }
}
const mapstatetoprops = (state) => {
  return {
    isauth: state.Auth.tokenid !== null,
  };
};
const mapdispatchtoprops = (dispatch) => {
  return {
    onauthcheck: () => dispatch(actions.authcheckstate()),
  };
};
export default withRouter(connect(mapstatetoprops, mapdispatchtoprops)(App));
