import classes from "./Sidedrawer.module.css";
import React from "react";
import Logo from "../../Logo/Logo";
import Navigationitems from "../Navigationitems/Navigationitems";
import Aux from "../../../../Hoc/Auxiliary";
import Backdrop from "../../UI/Modal/Backdrop/Backdrop";
const Sidedrawer = () => {
  return (
    <Aux>
      <Backdrop show />
      <div className={classes.sidedrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <Navigationitems />
        </nav>
      </div>
    </Aux>
  );
};

export default Sidedrawer;
