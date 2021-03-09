import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Checkoutsummary from "../../Components/Order/Checkoutsummary/Checkoutsummary";
import Contactform from "./Contactform/Contactform";
import { connect } from "react-redux";
import * as actionorder from "../../Store/actions/index";
export class Checkout extends Component {
  checkoutcancelhandler = () => {
    this.props.history.goBack();
  };
  checkoutcontinuehandler = () => {
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedinit = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedinit}
          <Checkoutsummary
            ingredient={this.props.ings}
            checkoutcancelled={this.checkoutcancelhandler}
            checkoutcontinued={this.checkoutcontinuehandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            render={(props) => (
              <Contactform
                ingredient={this.props.ings}
                totalprice={this.props.price}
                {...props}
              />
            )}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapstatetoprops = (state) => {
  return {
    ings: state.burgerbuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapstatetoprops)(Checkout);
