import classes from "./Toolbar.module.css";
import React from "react";
import Logo from "../../Logo/Logo";
import Navigationitems from "../Navigationitems/Navigationitems";
import Sidedrawer from "../Sidedrawer/Sidedrawer";
import Toggledrawer from "../Sidedrawer/Toggledrawer/Toggledrawer";

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Toggledrawer toggle={props.toggle} />
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.desktop}>
      <Navigationitems isauth={props.isauth} />
    </nav>
  </header>
);

export default Toolbar;
