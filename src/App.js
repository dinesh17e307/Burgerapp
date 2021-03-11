import classes from "./App.module.css";
import Layout from "./Components/Layout/Layout";
import Burgerbuilder from "./Container/BurgerBuilder/Burgerbuilder";
import Http from "./Container/BurgerBuilder/HTTP/Http";
import { Route, Switch, withRouter } from "react-router-dom";
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
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={Burgerbuilder} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/auth" component={Auth} />
            {/* <Route path="/burger" component={Burgerbuilder} /> */}
            <Route path="/checkout" component={Checkout} />
            <Route path="/logout" component={Logout} />
            {/* <Redirect from="/" to="/burger" /> */}
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapdispatchtoprops = (dispatch) => {
  return {
    onauthcheck: () => dispatch(actions.authcheckstate()),
  };
};
export default withRouter(connect(null, mapdispatchtoprops)(App));
