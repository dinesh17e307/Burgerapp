import classes from "./Navigationitem.module.css";
import React from "react";
import { NavLink } from "react-router-dom";

const Navigationitem = (props) => (
  <li className={classes.Navigationitem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);

export default Navigationitem;
