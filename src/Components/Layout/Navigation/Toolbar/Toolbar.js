import classes from "./Toolbar.module.css";
import React from "react";
import Logo from "../../Logo/Logo";
import Navigationitems from "../Navigationitems/Navigationitems";
import Sidedrawer from "../Sidedrawer/Sidedrawer";

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div onClick={props.onclick}>
      MENU
      {props.sideshow ? <Sidedrawer /> : null}
    </div>
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.desktop}>
      <Navigationitems />
    </nav>
  </header>
);

export default Toolbar;
