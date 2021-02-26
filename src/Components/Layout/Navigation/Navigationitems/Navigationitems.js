import React from "react";
import Navigationitem from "../Navigationitem/Navigationitem";
import classes from "./Navigationitems.module.css";

const Navigationitems = () => (
  <ul className={classes.Navigationitems}>
    <Navigationitem active link="/">
      Burger Builder
    </Navigationitem>
    <Navigationitem link="/checkout">Checkout </Navigationitem>
  </ul>
);

export default Navigationitems;
