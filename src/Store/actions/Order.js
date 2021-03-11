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
export const purchaseburger = (orderdata, token) => {
  return (dispatch) => {
    dispatch(purchaseburgerstart());

    axios
      .post("/Orders.json?auth=" + token, orderdata)
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
export const fetchordersuccess = (orders) => {
  return {
    type: actiontypes.FETCHORDER_SUCCESS,
    orders: orders,
  };
};
export const fetchorderfail = (error) => {
  return {
    type: actiontypes.FETCHORDER_FAIL,
    error: error,
  };
};
export const fetchorderstart = () => {
  return {
    type: actiontypes.FETCHORDER_START,
  };
};
export const fetchorders = (token, user) => {
  return (dispatch) => {
    dispatch(fetchorderstart());
    const queryparams =
      "?auth=" + token + '&orderBy="user"&equalTo="' + user + '"';
    axios
      .get("/Orders.json" + queryparams)
      .then((res) => {
        let fetchedorder = [];
        for (let key in res.data) {
          fetchedorder.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchordersuccess(fetchedorder));
      })
      .catch((error) => {
        dispatch(fetchorderfail(error));
      });
  };
};
