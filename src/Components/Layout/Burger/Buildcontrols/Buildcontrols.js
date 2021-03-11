import React from "react";
import classes from "./Buildcontrols.module.css";
import Buildcontrol from "./Buildcontrol/Buildcontrol";
// import Backdrop from "../../UI/Modal/Backdrop/Backdrop";

const controls = [
  { ingredient: "Salad", type: "salad" },
  { ingredient: "Meat", type: "meat" },
  { ingredient: "Cheese", type: "cheese" },
  { ingredient: "Bacon", type: "bacon" },
];
const Buildcontrols = (props) => {
  return (
    <div className={classes.Buildcontrols}>
      {/* <Backdrop show={props.ordered} closemodal={props.clickedbackdrop} /> */}
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
      <button
        className={classes.OrderButton}
        disabled={!props.purchase}
        onClick={props.purchasing}
      >
        {props.isauth ? "ORDER NOW" : "SIGNUP TO ORDER"}
      </button>
    </div>
  );
};

export default Buildcontrols;
