import React, { useState, useEffect } from "react";
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

const Burgerbuilder = (props) => {
  const [isshow, setisshow] = useState(false);
  useEffect(() => {
    props.initingredient();
  }, []);

  const showmodalhandler = () => {
    if (props.isauth) {
      setisshow(true);
    } else {
      props.onauthredirectpath("/checkout");
      props.history.push("/auth");
    }
  };
  const cancelmodalhandler = () => {
    setisshow(false);
  };
  const continueModalHandler = () => {
    props.onpurchaseinit();
    props.history.push("/checkout");
  };
  const purchase = (ingredient) => {
    const sum = Object.keys(ingredient)
      .map((key) => {
        return ingredient[key];
      })
      .reduce((sum, cur) => {
        return sum + cur;
      }, 0);
    return sum > 0;
  };

  const disabledinfo = {
    ...props.ings,
  };
  for (let key in disabledinfo) {
    disabledinfo[key] = disabledinfo[key] <= 0;
  }
  let ordersummary = null;
  let burger = props.error ? <p>ingredients cant loaded</p> : <Spinner />;
  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredient={props.ings} />
        <Buildcontrols
          additem={props.oningredientadd}
          removeitem={props.oningredientremove}
          disabled={disabledinfo}
          purchase={purchase(props.ings)}
          purchasing={showmodalhandler}
          ordered={isshow}
          clickedbackdrop={cancelmodalhandler}
          isauth={props.isauth}
          price={props.prc}
        />
      </Aux>
    );
    ordersummary = (
      <Ordersummary
        ingredient={props.ings}
        price={props.prc}
        close={cancelmodalhandler}
        cont={continueModalHandler}
      />
    );
  }
  return (
    <Aux>
      <Modal ordered={isshow} clickedbackdrop={cancelmodalhandler}>
        {ordersummary}
      </Modal>
      {burger}
    </Aux>
  );
};

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
