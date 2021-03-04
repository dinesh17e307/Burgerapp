import classes from "./Order.module.css";
import React from "react";

const Order = (props) => {
  let ingredient = [];
  for (let item in props.ingredient) {
    ingredient.push({ ingredient: item, amount: props.ingredient[item] });
  }
  let order = ingredient.map((res) => {
    return (
      <span
        key={res.ingredient}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          border: "1px solid #ccc",
          boxSizing: "border-box",
          padding: "5px",
          margin: "0 8px",
        }}
      >
        {res.ingredient}({res.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Customer Name: {props.customer.name}</p>
      <p>ingredients:{order}</p>
      <p>
        Price:<strong>{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
