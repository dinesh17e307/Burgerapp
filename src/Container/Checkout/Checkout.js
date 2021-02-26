import React, { Component } from "react";
import { Route } from "react-router-dom";
import Checkoutsummary from "../../Components/Order/Checkoutsummary/Checkoutsummary";
import Contactform from "./Contactform/Contactform";

export class Checkout extends Component {
  state = {
    ingredient: [],
    totalprice: 0,
  };
  componentWillMount() {
    const paramingredient = new URLSearchParams(this.props.location.search);
    const searchingredient = [];
    let price = 0;
    for (let param of paramingredient) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        searchingredient[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredient: searchingredient,
      totalprice: price,
    });
  }
  checkoutcancelhandler = () => {
    this.props.history.goBack();
  };
  checkoutcontinuehandler = () => {
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    return (
      <div>
        <Checkoutsummary
          ingredient={this.state.ingredient}
          checkoutcancelled={this.checkoutcancelhandler}
          checkoutcontinued={this.checkoutcontinuehandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <Contactform
              ingredient={this.state.ingredient}
              totalprice={this.state.totalprice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
