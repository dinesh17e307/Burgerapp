import classes from "./Checkoutsummary.module.css";
import React from "react";
import Burger from "../../Layout/Burger/Burger";
import Button from "../../Layout/UI/Button/Button";

const Checkoutsummary = (props) => {
  return (
    <div className={classes.Checkoutsummary}>
      <h1>taste your burger</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredient={props.ingredient} />
      </div>
      <Button btntype={"Danger"} clicked={props.checkoutcancelled}>
        CANCEL
      </Button>
      <Button btntype={"Success"} clicked={props.checkoutcontinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default Checkoutsummary;
