import React from "react";
import classes from "./Burger.module.css";
import Burgeringredient from "./BurgerIngredient/Burgeringredient";

const Burger = (props) => {
  let transingredient = Object.keys(props.ingredient)
    .map((ig) => {
      return [...Array(props.ingredient[ig])].map((_, indx) => {
        return <Burgeringredient key={ig + indx} type={ig} />;
      });
    })
    .reduce((prev, cur) => {
      return prev.concat(cur);
    });

  if (transingredient.length === 0) {
    transingredient = <p>please add ingredient to taste</p>;
  }
  return (
    <div className={classes.Burger}>
      <Burgeringredient type="bread-top" />
      {transingredient}
      <Burgeringredient type="bread-bottom" />
    </div>
  );
};
export default Burger;
