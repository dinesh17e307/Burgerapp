import * as actiontypes from "./action";

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
      };
    case actiontypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientname]: state.ingredients[action.ingredientname] - 1,
        },
      };

    default:
      return state;
  }
};

export default reducer;
