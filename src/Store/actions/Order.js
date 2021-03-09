import * as actiontypes from "../actions/actionTypes";
import axios from "../../Axiox-order";
export const purchaseburgersuccess = (id, orderdata) => {
  return {
    type: actiontypes.PURCHASE_BURGER_SUCCESS,
    orderid: id,
    orderdata: orderdata,
  };
};
export const purchaseburgerfail = (error) => {
  return {
    type: actiontypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};
export const purchaseburgerstart = () => {
  return {
    type: actiontypes.PURCHASE_BURGER_START,
  };
};
export const purchaseburger = (orderdata) => {
  return (dispatch) => {
    dispatch(purchaseburgerstart());

    axios
      .post("/Orders.json", orderdata)
      .then((response) => {
        console.log(response.data);

        dispatch(purchaseburgersuccess(response.data.name, orderdata));
      })
      .catch((error) => {
        dispatch(purchaseburgerfail(error));
      });
  };
};
export const purchaseinit = () => {
  return {
    type: actiontypes.PURCHASE_INIT,
  };
};
