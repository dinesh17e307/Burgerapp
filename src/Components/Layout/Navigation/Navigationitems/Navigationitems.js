import React from "react";
import Navigationitem from "../Navigationitem/Navigationitem";
import classes from "./Navigationitems.module.css";

const Navigationitems = () => (
  <ul className={classes.Navigationitems}>
    <Navigationitem exact link="/">
      Burger Builder
    </Navigationitem>
    <Navigationitem link="/orders">Orders</Navigationitem>
  </ul>
);

export default Navigationitems;
