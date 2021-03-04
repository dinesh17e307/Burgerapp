import React, { Component } from "react";
import Buildcontrols from "../../Components/Layout/Burger/Buildcontrols/Buildcontrols";
import Burger from "../../Components/Layout/Burger/Burger";
import Ordersummary from "../../Components/Layout/Burger/Ordersummary/Ordersummary";
import Modal from "../../Components/Layout/UI/Modal/Modal";
import withErrorhandler from "../../Hoc/Withwraped/witherrorhandler";
import Aux from "../../Hoc/Auxiliary";
import axios from "../../Axiox-order";
import Spinner from "../../Components/Layout/UI/Spinner/Spinner";
import * as actiontypes from "./../../Store/action";
import { connect } from "react-redux";
const INGREDIENTCOST = {
  salad: 0.5,
  meat: 1.5,
  bacon: 0.8,
  cheese: 0.5,
};
export class Burgerbuilder extends Component {
  state = {
    totalprice: 10,
    purchase: false,
    ishow: false,
    Loading: false,
    error: false,
  };
  componentDidMount() {
    // axios
    //   .get("/ingredient.json")
    //   .then((response) => {
    //     this.setState({
    //       ingredient: response.data,
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       error: true,
    //     });
    //   });
  }
  showmodalhandler = () => {
    this.setState({ ishow: true });
  };
  cancelmodalhandler = () => {
    this.setState({ ishow: false });
  };
  continueModalHandler = () => {
    // this.setState({ Loading: true });
    // const Orders = {
    //   ingredient: this.state.ingredient,
    //   price: this.state.totalprice,
    //   customer: {
    //     name: "dinesh sellappan",
    //     Address: {
    //       street: "154.bungala thottam",
    //       pincode: 638401,
    //       country: "india",
    //     },
    //     email: "dineshsellappan.com",
    //     DeliveryMethod: "fastest",
    //   },
    // };

    // this.setState({ ishow: false });
    // axios
    //   .post("/Orders.json", Orders)
    //   .then((response) => {
    //     this.setState({ Loading: false, ishow: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ Loading: false, ishow: false });
    //   });
    const paramingredient = [];
    for (let i in this.state.ingredient) {
      paramingredient.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredient[i])
      );
    }
    paramingredient.push("price=" + this.state.totalprice);
    const stringparam = paramingredient.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + stringparam,
    });
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
      ...this.props.ings,
    };
    for (let key in disabledinfo) {
      disabledinfo[key] = disabledinfo[key] <= 0;
    }
    let ordersummary = null;
    let burger = this.state.error ? (
      <p>ingredients cant loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredient={this.props.ings} />
          <Buildcontrols
            additem={this.props.oningredientadd}
            removeitem={this.props.oningredientremove}
            disabled={disabledinfo}
            purchase={this.state.purchase}
            purchasing={this.showmodalhandler}
            ordered={this.state.ishow}
            clickedbackdrop={this.cancelmodalhandler}
            price={this.state.totalprice}
          />
        </Aux>
      );
      ordersummary = (
        <Ordersummary
          ingredient={this.props.ings}
          price={this.state.totalprice}
          close={this.cancelmodalhandler}
          cont={this.continueModalHandler}
        />
      );
    }

    if (this.state.Loading) {
      ordersummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          ordered={this.state.ishow}
          clickedbackdrop={this.cancelmodalhandler}
        >
          {ordersummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapstatetoprops = (state) => {
  return {
    ings: state.ingredients,
  };
};
const mapdispatchtoprops = (dispatch) => {
  return {
    oningredientadd: (ingname) =>
      dispatch({ type: actiontypes.ADD_INGREDIENT, ingredientname: ingname }),
    oningredientremove: (ingname) =>
      dispatch({
        type: actiontypes.REMOVE_INGREDIENT,
        ingredientname: ingname,
      }),
  };
};

export default connect(
  mapstatetoprops,
  mapdispatchtoprops
)(withErrorhandler(Burgerbuilder, axios));
