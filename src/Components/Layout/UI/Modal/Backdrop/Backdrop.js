import classes from "./Backdrop.module.css";
import React from "react";

const Backdrop = (props) =>
  props.show ? <div className={classes.Backdrop}></div> : null;

export default Backdrop;
