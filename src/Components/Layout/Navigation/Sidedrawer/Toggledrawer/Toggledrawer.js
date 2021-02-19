import classes from "./Toggledrawer.module.css";
import React from "react";

const Toggledrawer = (props) => (
  <div className={classes.DrawerToggle} onClick={props.toggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Toggledrawer;
