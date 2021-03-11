import classes from "./Sidedrawer.module.css";
import React from "react";
import Logo from "../../Logo/Logo";
import Navigationitems from "../Navigationitems/Navigationitems";
import Aux from "../../../../Hoc/Auxiliary";
import Backdrop from "../../UI/Modal/Backdrop/Backdrop";
const Sidedrawer = (props) => {
  let sideclass = [classes.sidedrawer, classes.open];
  if (props.open) {
    sideclass = [classes.sidedrawer, classes.close];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={sideclass.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <Navigationitems isauth={props.isauth} />
        </nav>
      </div>
    </Aux>
  );
};

export default Sidedrawer;
