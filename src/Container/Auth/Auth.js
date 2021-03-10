import React, { Component } from "react";
import Input from "../../Components/Layout/UI/Forms/Input/Input";
import Button from "../../Components/Layout/UI/Button/Button";
import classes from "./Auth.module.css";

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
  };
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

    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btntype="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
