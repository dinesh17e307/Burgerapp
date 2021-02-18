import React from "react";
import Aux from "../../../../Hoc/Auxiliary";
import Button from "../../UI/Button/Button";

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
      <h1>Your Order</h1>
      <p>taste your delicious burger with these ingredients</p>
      <ul>{summaryitems}</ul>
      <p>
        <strong>Total Price :{props.price.toFixed(2)}</strong>
      </p>
      <p>continue to checkout?</p>
      <Button clicked={props.close} btntype={"Danger"}>
        CANCEL
      </Button>
      <Button clicked={props.cont} btntype={"Success"}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default Ordersummary;
