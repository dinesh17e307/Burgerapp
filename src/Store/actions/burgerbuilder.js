import * as actiontypes from "../actions/actionTypes";
import axios from "../../Axiox-order";
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
export const fetchingredient = (ingredients) => {
  return {
    type: actiontypes.SET_INGREDIENT,
    ingredients: ingredients,
  };
};
export const fetchingredientfailed = (ingredient) => {
  return {
    type: actiontypes.FETCHINGREDIENT_FAILED,
    ingredient: ingredient,
  };
};
export const initingredient = () => {
  return (dispatch) => {
    axios
      .get("/ingredient.json")
      .then((response) => {
        dispatch(fetchingredient(response.data));
      })
      .catch((error) => {
        dispatch(fetchingredientfailed());
      });
  };
};
