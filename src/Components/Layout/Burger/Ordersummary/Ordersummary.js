import React from "react";
import Aux from "../../../../Hoc/Auxiliary";

const Ordersummary = (props) => {
  const summaryitems = Object.keys(props.ingredient).map((keys, indx) => {
    return (
      <li key={keys.concat(indx)}>
        <span style={{ textTransform: "capitalize" }}>{keys}</span>:
        {props.ingredient[keys]}
      </li>
    );
  });
  return (
    <Aux>
      <h1>
        Your Order :<strong>{props.price.toFixed(2)}</strong>
      </h1>
      <p>taste your delicious burger with these ingredients</p>
      <ul>{summaryitems}</ul>
      <p>continue to checkout?</p>
    </Aux>
  );
};

export default Ordersummary;
