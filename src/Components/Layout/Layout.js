import React, { useState } from "react";
import { connect } from "react-redux";
import Aux from "../../Hoc/Auxiliary";
import classes from "./Layout.module.css";
import Sidedrawer from "./Navigation/Sidedrawer/Sidedrawer";
import Toolbar from "./Navigation/Toolbar/Toolbar";
const Layout = (props) => {
  const [sidedrawer, setsidedrawer] = useState(false);
  const closesidedrawhandler = () => {
    setsidedrawer(false);
  };
  const togglesidedrawerhandler = () => {
    setsidedrawer(!sidedrawer);
  };

  return (
    <Aux>
      <Toolbar
        isauth={props.isauth}
        toggle={togglesidedrawerhandler}
        istog={sidedrawer}
      />
      <Sidedrawer
        isauth={props.isauth}
        open={sidedrawer}
        closed={closesidedrawhandler}
      />
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
};

const mapstatetoprops = (state) => {
  return {
    isauth: state.Auth.tokenid !== null,
  };
};
export default connect(mapstatetoprops)(Layout);
