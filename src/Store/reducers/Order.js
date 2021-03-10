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
      return updateobject(state, { loading: false, orders: action.orders });
    case actionTypes.FETCHORDER_FAIL:
      return updateobject(state, { loading: false });

    case actionTypes.PURCHASE_INIT:
      return updateobject(state, { purchased: false });

    case actionTypes.PURCHASE_BURGER_START:
      return updateobject(state, { loading: true });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const neworders = updateobject(action.orderdata, { id: action.orderid });

      return updateobject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(neworders),
      });
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateobject(state, { loading: false });
    default:
      return state;
  }
};
export default reducer;
