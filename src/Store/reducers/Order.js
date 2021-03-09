import * as actionTypes from "../actions/actionTypes";
import { updateobject } from "../utilitty";

const initialstate = {
  orders: [],
  loading: false,
  purchased: false,
};
const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.FETCHORDER_START:
      return updateobject(state, { loading: true });
    case actionTypes.FETCHORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case actionTypes.FETCHORDER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const neworders = {
        ...action.orderdata,
        id: action.orderid,
      };

      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(neworders),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
