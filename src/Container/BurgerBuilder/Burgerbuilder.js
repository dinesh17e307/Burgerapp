import React, { Component } from "react";
import Buildcontrols from "../../Components/Layout/Burger/Buildcontrols/Buildcontrols";
import Burger from "../../Components/Layout/Burger/Burger";
import Ordersummary from "../../Components/Layout/Burger/Ordersummary/Ordersummary";
import Modal from "../../Components/Layout/UI/Modal/Modal";
import withErrorhandler from "../../Hoc/Withwraped/witherrorhandler";
import Aux from "../../Hoc/Auxiliary";
import axios from "../../Axiox-order";
import Spinner from "../../Components/Layout/UI/Spinner/Spinner";
import * as actions from "../../Store/actions/index";
import { connect } from "react-redux";

export class Burgerbuilder extends Component {
  state = {
    ishow: false,
  };
  componentDidMount() {
    this.props.initingredient();
  }
  showmodalhandler = () => {
    if (this.props.isauth) {
      this.setState({ ishow: true });
    } else {
      this.props.onauthredirectpath("/checkout");
      this.props.history.push("/auth");
    }
  };
  cancelmodalhandler = () => {
    this.setState({ ishow: false });
  };
  continueModalHandler = () => {
    this.props.onpurchaseinit();
    this.props.history.push("/checkout");
  };
  purchase(ingredient) {
    const sum = Object.keys(ingredient)
      .map((key) => {
        return ingredient[key];
      })
      .reduce((sum, cur) => {
        return sum + cur;
      }, 0);
    return sum > 0;
  }
  render() {
    const disabledinfo = {
      ...this.props.ings,
    };
    for (let key in disabledinfo) {
      disabledinfo[key] = disabledinfo[key] <= 0;
    }
    let ordersummary = null;
    let burger = this.props.error ? (
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
            purchase={this.purchase(this.props.ings)}
            purchasing={this.showmodalhandler}
            ordered={this.state.ishow}
            clickedbackdrop={this.cancelmodalhandler}
            isauth={this.props.isauth}
            price={this.props.prc}
          />
        </Aux>
      );
      ordersummary = (
        <Ordersummary
          ingredient={this.props.ings}
          price={this.props.prc}
          close={this.cancelmodalhandler}
          cont={this.continueModalHandler}
        />
      );
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
    ings: state.burgerbuilder.ingredients,
    prc: state.burgerbuilder.totalprice,
    error: state.burgerbuilder.error,
    isauth: state.Auth.tokenid !== null,
  };
};
const mapdispatchtoprops = (dispatch) => {
  return {
    oningredientadd: (ingname) => dispatch(actions.addIngredient(ingname)),
    oningredientremove: (ingname) =>
      dispatch(actions.removeIngredient(ingname)),
    initingredient: () => dispatch(actions.initingredient()),
    onpurchaseinit: () => dispatch(actions.purchaseinit()),
    onauthredirectpath: (path) => dispatch(actions.setauthredirectpath(path)),
  };
};

export default connect(
  mapstatetoprops,
  mapdispatchtoprops
)(withErrorhandler(Burgerbuilder, axios));
