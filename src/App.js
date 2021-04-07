import classes from "./App.module.css";
import Layout from "./Components/Layout/Layout";
import Burgerbuilder from "./Container/BurgerBuilder/Burgerbuilder";
import Http from "./Container/BurgerBuilder/HTTP/Http";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Auth from "./Container/Auth/Auth";
import Logout from "./Container/Auth/logout/Logout";
import { connect } from "react-redux";
import * as actions from "./Store/actions/index";
import React, { useEffect, Suspense } from "react";
const Order = React.lazy(() => {
  return import("./Components/Orders/Orders");
});
const Checkout = React.lazy(() => {
  return import("./Container/Checkout/Checkout");
});
const Auths = React.lazy(() => {
  return import("./Container/Auth/Auth");
});
const App = (props) => {
  useEffect(() => {
    props.onauthcheck();
  }, []);
  let route = (
    <Switch>
      <Route exact path="/" component={Burgerbuilder} />
      <Route exact path="/auth" component={Auth} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isauth) {
    route = (
      <Switch>
        <Route exact path="/" component={Burgerbuilder} />
        <Route exact path="/orders" render={() => <Order />} />
        <Route exact path="/auth" render={() => <Auths />} />
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>loading............</p>}>{route} </Suspense>
      </Layout>
    </div>
  );
};

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
