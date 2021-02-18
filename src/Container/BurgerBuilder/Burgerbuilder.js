import React, { Component } from "react";
import Buildcontrols from "../../Components/Layout/Burger/Buildcontrols/Buildcontrols";
import Burger from "../../Components/Layout/Burger/Burger";
import Aux from "../../Hoc/Auxiliary";
export class Burgerbuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
  };
  render() {
    return (
      <Aux>
        <Burger ingredient={this.state.ingredient} />
        <Buildcontrols />
      </Aux>
    );
  }
}

export default Burgerbuilder;
