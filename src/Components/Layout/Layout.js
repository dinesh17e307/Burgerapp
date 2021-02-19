import React from "react";
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
          toggle={this.togglesidedrawerhandler}
          istog={this.state.sidedraw}
        />
        <Sidedrawer
          open={this.state.sidedraw}
          closed={this.closesidedrawhandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
