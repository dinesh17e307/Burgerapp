import React, { useState, useEffect, useCallback } from "react";
import Buildcontrols from "../../Components/Layout/Burger/Buildcontrols/Buildcontrols";
import Burger from "../../Components/Layout/Burger/Burger";
import Ordersummary from "../../Components/Layout/Burger/Ordersummary/Ordersummary";
import Modal from "../../Components/Layout/UI/Modal/Modal";
import withErrorhandler from "../../Hoc/Withwraped/witherrorhandler";
import Aux from "../../Hoc/Auxiliary";
import axios from "../../Axiox-order";
import Spinner from "../../Components/Layout/UI/Spinner/Spinner";
import * as actions from "../../Store/actions/index";
import { connect, useSelector, useDispatch } from "react-redux";

const Burgerbuilder = (props) => {
  const [isshow, setisshow] = useState(false);
  const dispatch = useDispatch();

  const oningredientadd = (ingname) => dispatch(actions.addIngredient(ingname));
  const oningredientremove = (ingname) =>
    dispatch(actions.removeIngredient(ingname));

  const initingredient = useCallback(() => dispatch(actions.initingredient()), [
    dispatch,
  ]);

  const onpurchaseinit = () => dispatch(actions.purchaseinit());
  const onauthredirectpath = (path) =>
    dispatch(actions.setauthredirectpath(path));

  const ings = useSelector((state) => state.burgerbuilder.ingredients);
  const prc = useSelector((state) => state.burgerbuilder.totalprice);
  const error = useSelector((state) => state.burgerbuilder.error);
  const isauth = useSelector((state) => state.Auth.tokenid !== null);

  useEffect(() => {
    initingredient();
  }, [initingredient]);

  const showmodalhandler = () => {
    if (isauth) {
      setisshow(true);
    } else {
      onauthredirectpath("/checkout");
      props.history.push("/auth");
    }
  };
  const cancelmodalhandler = () => {
    setisshow(false);
  };
  const continueModalHandler = () => {
    onpurchaseinit();
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
    ...ings,
  };
  for (let key in disabledinfo) {
    disabledinfo[key] = disabledinfo[key] <= 0;
  }
  let ordersummary = null;
  let burger = error ? <p>ingredients cant loaded</p> : <Spinner />;
  if (ings) {
    burger = (
      <Aux>
        <Burger ingredient={ings} />
        <Buildcontrols
          additem={oningredientadd}
          removeitem={oningredientremove}
          disabled={disabledinfo}
          purchase={purchase(ings)}
          purchasing={showmodalhandler}
          ordered={isshow}
          clickedbackdrop={cancelmodalhandler}
          isauth={isauth}
          price={prc}
        />
      </Aux>
    );
    ordersummary = (
      <Ordersummary
        ingredient={ings}
        price={prc}
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

// const mapstatetoprops = (state) => {
//   return {
//     ings: state.burgerbuilder.ingredients,
//     prc: state.burgerbuilder.totalprice,
//     error: state.burgerbuilder.error,
//     isauth: state.Auth.tokenid !== null,
//   };
// };
// const mapdispatchtoprops = (dispatch) => {
//   return {
//     oningredientadd: (ingname) => dispatch(actions.addIngredient(ingname)),
//     oningredientremove: (ingname) =>
//       dispatch(actions.removeIngredient(ingname)),
//     initingredient: () => dispatch(actions.initingredient()),
//     onpurchaseinit: () => dispatch(actions.purchaseinit()),
//     onauthredirectpath: (path) => dispatch(actions.setauthredirectpath(path)),
//   };
// };

export default withErrorhandler(Burgerbuilder, axios);
