import * as actionTypes from "../actions/actionTypes";

const initialstate = {
  orders: [],
  loading: false,
};
const reducer = (state = initialstate, action) => {
  switch (action) {
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
        orders: state.orders.conact(neworders),
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
