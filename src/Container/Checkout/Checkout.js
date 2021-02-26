import React, { Component } from "react";
import Checkoutsummary from "../../Components/Order/Checkoutsummary/Checkoutsummary";

export class Checkout extends Component {
  state = {
    ingredient: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1,
    },
  };
  checkoutcancelhandler = () => {
    this.props.history.goBack();
  };
  checkoutcontinuehandler = () => {
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Checkoutsummary
          ingredient={this.state.ingredient}
          checkoutcancelled={this.checkoutcancelhandler}
          checkoutcontinued={this.checkoutcontinuehandler}
        />
      </div>
    );
  }
}

export default Checkout;
