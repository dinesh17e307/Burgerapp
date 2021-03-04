import * as actiontypes from "./action";

const INGREDIENTCOST = {
  salad: 0.5,
  meat: 1.5,
  bacon: 0.8,
  cheese: 0.5,
};
const initialstate = {
  ingredients: {
    meat: 0,
    cheese: 0,
    bacon: 0,
    salad: 0,
  },
  totalprice: 10,
};
const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actiontypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientname]: state.ingredients[action.ingredientname] + 1,
        },
        totalprice: state.totalprice + INGREDIENTCOST[action.ingredientname],
      };
    case actiontypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientname]: state.ingredients[action.ingredientname] - 1,
        },
        totalprice: state.totalprice - INGREDIENTCOST[action.ingredientname],
      };

    default:
      return state;
  }
};

export default reducer;
