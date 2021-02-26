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
  componentDidMount() {
    const paramingredient = new URLSearchParams(this.props.location.search);
    const searchingredient = [];
    for (let param of paramingredient) {
      searchingredient[param[0]] = +param[1];
    }
    this.setState({
      ingredient: searchingredient,
    });
  }
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
