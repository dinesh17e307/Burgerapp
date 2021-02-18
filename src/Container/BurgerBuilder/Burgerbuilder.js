import React, { Component } from "react";
import Buildcontrols from "../../Components/Layout/Burger/Buildcontrols/Buildcontrols";
import Burger from "../../Components/Layout/Burger/Burger";
import Ordersummary from "../../Components/Layout/Burger/Ordersummary/Ordersummary";
import Modal from "../../Components/Layout/UI/Modal/Modal";
import Aux from "../../Hoc/Auxiliary";
const INGREDIENTCOST = {
  salad: 0.5,
  meat: 1.5,
  bacon: 0.8,
  cheese: 0.5,
};
export class Burgerbuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalprice: 10,
    purchase: false,
    ishow: false,
  };
  showmodalhandler = () => {
    this.setState({ ishow: true });
  };
  cancelmodalhandler = () => {
    this.setState({ ishow: false });
  };
  continueModalHandler = () => {
    alert("your ordered placed successfully");
    this.setState({ ishow: false });
  };
  purchase(ingredient) {
    const sum = Object.keys(ingredient)
      .map((key) => {
        return ingredient[key];
      })
      .reduce((sum, cur) => {
        return sum + cur;
      }, 0);
    this.setState({
      purchase: sum > 0,
    });
  }
  onaddhandler = (type) => {
    const oldcount = this.state.ingredient[type];
    const newcount = oldcount + 1;
    const updatedingredient = {
      ...this.state.ingredient,
    };
    updatedingredient[type] = newcount;
    const oldprice = this.state.totalprice;
    const newprice = oldprice + INGREDIENTCOST[type];
    this.setState({
      totalprice: newprice,
      ingredient: updatedingredient,
    });
    this.purchase(updatedingredient);
  };
  onremovehandler = (type) => {
    const oldcount = this.state.ingredient[type];
    if (oldcount <= 0) {
      return;
    }
    const newcount = oldcount - 1;
    const updatedingredient = {
      ...this.state.ingredient,
    };
    updatedingredient[type] = newcount;
    const oldprice = this.state.totalprice;
    const newprice = oldprice - INGREDIENTCOST[type];
    this.setState({
      totalprice: newprice,
      ingredient: updatedingredient,
    });
    this.purchase(updatedingredient);
  };
  render() {
    const disabledinfo = {
      ...this.state.ingredient,
    };
    for (let key in disabledinfo) {
      console.log(key);
      disabledinfo[key] = disabledinfo[key] <= 0;
      console.log(disabledinfo);
    }
    return (
      <Aux>
        <Modal
          ordered={this.state.ishow}
          clickedbackdrop={this.cancelmodalhandler}
        >
          <Ordersummary
            ingredient={this.state.ingredient}
            price={this.state.totalprice}
            close={this.cancelmodalhandler}
            cont={this.continueModalHandler}
          />
        </Modal>
        <Burger ingredient={this.state.ingredient} />
        <Buildcontrols
          additem={this.onaddhandler}
          removeitem={this.onremovehandler}
          disabled={disabledinfo}
          purchase={this.state.purchase}
          purchasing={this.showmodalhandler}
          ordered={this.state.ishow}
          clickedbackdrop={this.cancelmodalhandler}
          price={this.state.totalprice}
        />
      </Aux>
    );
  }
}

export default Burgerbuilder;
