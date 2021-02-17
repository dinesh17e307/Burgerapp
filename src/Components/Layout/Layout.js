import React from "react";
import Aux from "../../Hoc/Auxiliary";
import classes from "./Layout.module.css";
const Layout = (props) => (
  <Aux>
    <div>side menu bar</div>
    <main className={classes.content}>{props.children}</main>
  </Aux>
);

export default Layout;
