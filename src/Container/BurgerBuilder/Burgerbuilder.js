import React, { Component } from "react";
import Burger from "../../Components/Layout/Burger/Burger";
import Aux from "../../Hoc/Auxiliary";
export class Burgerbuilder extends Component {
  state = {
    ingredient: {
      salad: 1,
      cheese: 2,
      meat: 1,
      bacon: 2,
    },
  };
  render() {
    return (
      <Aux>
        <Burger ingredient={this.state.ingredient} />
        <div>Burger controls</div>
      </Aux>
    );
  }
}

export default Burgerbuilder;
