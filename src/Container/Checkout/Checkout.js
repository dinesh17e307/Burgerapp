import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Checkoutsummary from "../../Components/Order/Checkoutsummary/Checkoutsummary";
import Contactform from "./Contactform/Contactform";
import { connect } from "react-redux";
import * as actionorder from "../../Store/actions/index";
const Checkout = (props) => {
  const checkoutcancelhandler = () => {
    props.history.goBack();
  };
  const checkoutcontinuehandler = () => {
    props.history.replace("checkout/contact-data");
  };

  let summary = <Redirect to="/" />;

  if (props.ings) {
    const purchasedinit = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedinit}
        <Checkoutsummary
          ingredient={props.ings}
          checkoutcancelled={checkoutcancelhandler}
          checkoutcontinued={checkoutcontinuehandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          render={(props) => (
            <Contactform
              ingredient={props.ings}
              totalprice={props.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
  return summary;
};

const mapstatetoprops = (state) => {
  return {
    ings: state.burgerbuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapstatetoprops)(Checkout);
