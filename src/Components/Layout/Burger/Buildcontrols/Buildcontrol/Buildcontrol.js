import React from "react";
import classes from "./Buildcontrol.module.css";
const Buildcontrol = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.ingredient}>{props.ingredient}</div>
      <div>
        <button
          className={classes.Less}
          onClick={props.remove}
          disabled={props.disabled}
        >
          Less
        </button>
      </div>
      <div>
        <button className={classes.More} onClick={props.add}>
          More
        </button>
      </div>
    </div>
  );
};
export default Buildcontrol;
