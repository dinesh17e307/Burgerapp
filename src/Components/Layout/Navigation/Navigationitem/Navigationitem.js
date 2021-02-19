import classes from "./Navigationitem.module.css";
import React from "react";

const Navigationitem = (props) => (
  <li className={classes.Navigationitem}>
    <a className={props.active ? classes.active : null} href={props.link}>
      {props.children}
    </a>
  </li>
);

export default Navigationitem;
