import React, { Component } from "react";
import Input from "../../Components/Layout/UI/Forms/Input/Input";
import Button from "../../Components/Layout/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../Store/actions/index";
import { connect } from "react-redux";
import Spinner from "./../../Components/Layout/UI/Spinner/Spinner";
import { Redirect } from "react-router";

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementtype: "input",
        elementconfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        Validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touch: false,
      },
      password: {
        elementtype: "input",
        elementconfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        Validation: {
          required: true,
          minlength: 7,
        },
        valid: false,
        touch: false,
      },
    },
    issignup: true,
  };
  componentDidMount() {
    if (!this.props.building && this.props.redirectpath !== "/") {
      this.props.onsetredirectpath();
    }
  }
  checkvalid(value, rules) {
    let isvalid = true;
    if (rules.required) {
      isvalid = value.trim() !== "" && isvalid;
    }
    if (rules.minlength) {
      isvalid = value.length >= rules.minlength && isvalid;
    }
    if (rules.maxlength) {
      isvalid = value.length <= rules.maxlength && isvalid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isvalid = pattern.test(value) && isvalid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isvalid = pattern.test(value) && isvalid;
    }
    return isvalid;
  }
  onauthswitchmodehandler = () => {
    this.setState((prevState) => {
      return { issignup: !prevState.issignup };
    });
  };
  onchangeformhandler = (event, controlname) => {
    const updatedcontrols = {
      ...this.state.controls,
      [controlname]: {
        ...this.state.controls[controlname],
        value: event.target.value,
        valid: this.checkvalid(
          event.target.value,
          this.state.controls[controlname].Validation
        ),
        touch: true,
      },
    };
    this.setState({
      controls: updatedcontrols,
    });
  };
  onsubmithandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.issignup
    );
  };
  render() {
    let orderarray = [];
    for (let key in this.state.controls) {
      orderarray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = orderarray.map((res) => (
      <Input
        key={res.id}
        elementtype={res.config.elementtype}
        elementconfig={res.config.elementconfig}
        value={res.config.value}
        invalid={!res.config.valid}
        shouldvalidate={res.config.Validation}
        touched={res.config.touch}
        changed={(event) => this.onchangeformhandler(event, res.id)}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errormsg = null;
    if (this.props.error) {
      errormsg = <p>{this.props.error.message}</p>;
    }
    let isauthenticate = null;
    if (this.props.isauth) {
      isauthenticate = <Redirect to={this.props.redirectpath} />;
    }
    console.log(this.props.isauth, this.props.redirectpath);
    return (
      <div className={classes.Auth}>
        {isauthenticate}
        {errormsg}
        <form onSubmit={this.onsubmithandler}>
          {form}
          <Button btntype="Success">SUBMIT</Button>
        </form>
        <Button
          clicked={this.onauthswitchmodehandler}
          btntype={this.state.issignup ? "Danger" : "Success"}
        >
          {" "}
          SWITCH TO {this.state.issignup ? "SIGNUP" : "SIGNIN"}
        </Button>
      </div>
    );
  }
}
const mapstatetoprops = (state) => {
  return {
    loading: state.Auth.loading,
    error: state.Auth.error,
    isauth: state.Auth.tokenid !== null,
    building: state.burgerbuilder.building,
    redirectpath: state.Auth.redirectpath,
  };
};
const mapdispatchtoprops = (dispatch) => {
  return {
    onAuth: (email, password, issignup) =>
      dispatch(actions.auth(email, password, issignup)),
    onsetredirectpath: () => dispatch(actions.setauthredirectpath("/")),
  };
};
export default connect(mapstatetoprops, mapdispatchtoprops)(Auth);
