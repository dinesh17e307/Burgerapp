import * as actiontypes from "../actions/actionTypes";

export const addIngredient = (name) => {
  return {
    type: actiontypes.ADD_INGREDIENT,
    ingredientname: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actiontypes.REMOVE_INGREDIENT,
    ingredientname: name,
  };
};
