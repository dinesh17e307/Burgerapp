import React from "react";
import { connect } from "react-redux";
import Aux from "../../Hoc/Auxiliary";
import classes from "./Layout.module.css";
import Sidedrawer from "./Navigation/Sidedrawer/Sidedrawer";
import Toolbar from "./Navigation/Toolbar/Toolbar";
class Layout extends React.Component {
  state = {
    sidedraw: false,
  };
  closesidedrawhandler = () => {
    this.setState({
      sidedraw: false,
    });
  };
  togglesidedrawerhandler = () => {
    this.setState({
      sidedraw: true,
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          isauth={this.props.isauth}
          toggle={this.togglesidedrawerhandler}
          istog={this.state.sidedraw}
        />
        <Sidedrawer
          isauth={this.props.isauth}
          open={this.state.sidedraw}
          closed={this.closesidedrawhandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapstatetoprops = (state) => {
  return {
    isauth: state.Auth.tokenid !== null,
  };
};
export default connect(mapstatetoprops)(Layout);
