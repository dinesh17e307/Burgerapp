import * as actiontypes from "./../actions/actionTypes";
import { updateobject } from "../../shared/utilitty";
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
  building: false,
};
const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actiontypes.ADD_INGREDIENT:
      const updatedingredient = {
        [action.ingredientname]: state.ingredients[action.ingredientname] + 1,
      };
      const updatedingredients = updateobject(
        state.ingredients,
        updatedingredient
      );
      const updatestate = {
        ingredients: updatedingredients,
        totalprice: state.totalprice + INGREDIENTCOST[action.ingredientname],
        building: true,
      };
      return updateobject(state, updatestate);
    case actiontypes.REMOVE_INGREDIENT:
      const updatedings = {
        [action.ingredientname]: state.ingredients[action.ingredientname] - 1,
      };
      const updateings = updateobject(state.ingredients, updatedings);
      const updatest = {
        ingredients: updateings,
        totalprice: state.totalprice + INGREDIENTCOST[action.ingredientname],
        building: true,
      };
      return updateobject(state, updatest);
    case actiontypes.SET_INGREDIENT:
      return updateobject(state, {
        ingredients: action.ingredients,
        totalprice: 4,
        error: false,
        building: false,
      });

    case actiontypes.FETCHINGREDIENT_FAILED:
      return updateobject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
