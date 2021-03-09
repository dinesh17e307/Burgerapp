import * as actiontypes from "./../actions/actionTypes";

const INGREDIENTCOST = {
  salad: 0.5,
  meat: 1.5,
  bacon: 0.8,
  cheese: 0.5,
};
const initialstate = {
  ingredients: null,
  totalprice: 10,
  error: false,
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
    case actiontypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        totalprice: 4,
        error: false,
      };
    case actiontypes.FETCHINGREDIENT_FAILED:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
