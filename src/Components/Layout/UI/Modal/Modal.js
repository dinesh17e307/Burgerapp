import React from "react";
import Aux from "../../../../Hoc/Auxiliary";
import Backdrop from "./Backdrop/Backdrop";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.ordered} clicked={props.clickedbackdrop} />
      <div
        className={classes.Modal}
        style={{
          transform: props.ordered ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.ordered ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(Modal);
