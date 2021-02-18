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
      {controls.map((e) => {
        return <Buildcontrol key={e.ingredient} ingredient={e.type} />;
      })}
    </div>
  );
};

export default Buildcontrols;
