import React from "react";
import Navigationitem from "../Navigationitem/Navigationitem";
import classes from "./Navigationitems.module.css";

const Navigationitems = (props) => (
  <ul className={classes.Navigationitems}>
    <Navigationitem exact link="/">
      Burger Builder
    </Navigationitem>
    <Navigationitem link="/orders">Orders</Navigationitem>
    {!props.isauth ? (
      <Navigationitem link="/auth">Authenticate</Navigationitem>
    ) : (
      <Navigationitem link="/logout">logout</Navigationitem>
    )}
  </ul>
);

export default Navigationitems;
