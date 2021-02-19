import React from "react";
import Aux from "../../Hoc/Auxiliary";
import classes from "./Layout.module.css";
import Sidedrawer from "./Navigation/Sidedrawer/Sidedrawer";
import Toolbar from "./Navigation/Toolbar/Toolbar";
class Layout extends React.Component {
  state = {
    isshown: false,
  };
  render() {
    return (
      <Aux>
        <Toolbar />
        <Sidedrawer />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
