import React from "react";
import classes from "./Button.module.css";
const Button = (props) => (
  <button
    onClick={props.clicked}
    disabled={props.disabled}
    className={[classes.Button, classes[props.btntype]].join(" ")}
  >
    {props.children}
  </button>
);

export default Button;
