import React, { Component } from "react";
import Order from "../Order/Order";
import axios from "../../Axiox-order";
import witherrorhandler from "../../Hoc/Withwraped/witherrorhandler";
import Spinner from "../Layout/UI/Spinner/Spinner";
import * as actions from "../../Store/actions/index";
import { connect } from "react-redux";
import classes from "./Orders.module.css";
export class Orders extends Component {
  componentDidMount() {
    this.props.onorderfetch(this.props.token, this.props.userid);
  }
  render() {
    let order;
    if (this.props.loading) {
      order = <Spinner />;
    } else {
      order = this.props.order.map((order) => {
        return (
          <Order
            key={order.id}
            ingredient={order.ingredient}
            price={+order.price}
            customer={order.customer}
          />
        );
      });
    }
    return <div className={classes.orders}>{order}</div>;
  }
}
const mapstatetoprops = (state) => {
  return {
    order: state.order.orders,
    loading: state.order.loading,
    token: state.Auth.tokenid,
    userid: state.Auth.userid,
  };
};
const mapdispatchtoprops = (dispatch) => {
  return {
    onorderfetch: (token, user) => dispatch(actions.fetchorders(token, user)),
  };
};
export default connect(
  mapstatetoprops,
  mapdispatchtoprops
)(witherrorhandler(Orders, axios));
