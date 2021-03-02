import classes from "./Input.module.css";
import React from "react";

const Input = (props) => {
  let inputelement = null;
  let inputclass = [classes.Inputelement];
  if (props.invalid && props.shouldvalidate) {
    inputclass.push(classes.Invalid);
  }
  switch (props.elementtype) {
    case "input":
      inputelement = (
        <input
          className={inputclass.join(" ")}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputelement = (
        <textarea
          className={classes.Inputelement}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputelement = (
        <select
          className={classes.Inputelement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementconfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayvalue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputelement = (
        <input
          className={classes.Inputelement}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputelement}
    </div>
  );
};

export default Input;
