import * as actiontypes from "./action";

const initialstate = {
  infredient: [],
  totalprice: 10,
};
const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actiontypes.ADD_INGREDIENT:
      return {};
    case actiontypes.REMOVE_INGREDIENT:
      return {};
  }
  return state;
};

export default reducer;
