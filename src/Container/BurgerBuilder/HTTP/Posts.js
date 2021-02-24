import classes from "./Http.module.css";
import React from "react";
import { withRouter } from "react-router";
const Posts = (props) => {
  console.log(props);
  return (
    <div className={classes.Http}>
      <ul onClick={props.clicked} className={classes.box}>
        {<li>{props.titl}</li>}
        <li>{props.au}</li>
      </ul>
    </div>
  );
};

export default withRouter(Posts);
