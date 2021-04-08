import React, { useEffect } from "react";
import Order from "../Order/Order";
import axios from "../../Axiox-order";
import witherrorhandler from "../../Hoc/Withwraped/witherrorhandler";
import Spinner from "../Layout/UI/Spinner/Spinner";
import * as actions from "../../Store/actions/index";
import { connect } from "react-redux";
import classes from "./Orders.module.css";
const Orders = (props) => {
  useEffect(() => {
    props.onorderfetch(props.token, props.userid);
  }, []);

  let order;
  if (props.loading) {
    order = <Spinner />;
  } else {
    order = props.order.map((order) => {
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
};

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
