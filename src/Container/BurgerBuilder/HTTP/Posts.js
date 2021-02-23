import classes from "./Http.module.css";
import React from "react";

const Posts = (props) => {
  return (
    <article className={classes.box}>
      <ul onClick={props.clicked} className={classes.Http}>
        {<li>{props.titl}</li>}
        <li>{props.au}</li>
      </ul>
    </article>
  );
};

export default Posts;
