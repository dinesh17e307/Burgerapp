import React from "react";
import classes from "./Buildcontrols.module.css";
import Buildcontrol from "./Buildcontrol/Buildcontrol";

const controls = [
  { ingredient: "Salad", type: "salad" },
  { ingredient: "Meat", type: "meat" },
  { ingredient: "Cheese", type: "cheese" },
  { ingredient: "Bacon", type: "bacon" },
];
const Buildcontrols = (props) => {
  return (
    <div className={classes.Buildcontrols}>
      <p>
        Current price :<strong> {props.price.toFixed(2)}</strong>
      </p>
      {controls.map((e) => {
        return (
          <Buildcontrol
            key={e.ingredient}
            ingredient={e.type}
            add={() => props.additem(e.type)}
            remove={() => props.removeitem(e.type)}
            disabled={props.disabled[e.type]}
          />
        );
      })}
      <button className={classes.OrderButton} disabled={!props.purchase}>
        ORDER NOW
      </button>
    </div>
  );
};

export default Buildcontrols;
