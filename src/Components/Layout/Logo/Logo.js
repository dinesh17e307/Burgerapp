import classes from "./Logo.module.css";
import React from "react";
import burgerlogo from "../../../assets/images/burger-logo.png";
const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerlogo} alt="burger" />
  </div>
);

export default Logo;
