import React, { useState, useEffect } from "react";
import Input from "../../Components/Layout/UI/Forms/Input/Input";
import Button from "../../Components/Layout/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../Store/actions/index";
import { connect } from "react-redux";
import Spinner from "./../../Components/Layout/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import { updateobject, checkvalid } from "../../shared/utilitty";
const Auth = (props) => {
  const [controls, setcontrols] = useState({
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
        placeholder: "Password length greater than 7",
      },
      value: "",
      Validation: {
        required: true,
        minlength: 7,
      },
      valid: false,
      touch: false,
    },
  });
  const [issignup, setissignup] = useState(true);

  useEffect(() => {
    if (!props.building && props.redirectpath !== "/") {
      this.props.onsetredirectpath();
    }
  }, []);

  const onauthswitchmodehandler = () => {
    setissignup(!issignup);
  };
  const onchangeformhandler = (event, controlname) => {
    const updatedcontrols = updateobject(controls, {
      [controlname]: updateobject(controls[controlname], {
        value: event.target.value,
        valid: checkvalid(event.target.value, controls[controlname].Validation),
        touch: true,
      }),
    });
    setcontrols(updatedcontrols);
  };
  const onsubmithandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, issignup);
  };

  let orderarray = [];
  for (let key in controls) {
    orderarray.push({
      id: key,
      config: controls[key],
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
      changed={(event) => onchangeformhandler(event, res.id)}
    />
  ));
  if (props.loading) {
    form = <Spinner />;
  }
  let errormsg = null;
  if (props.error) {
    errormsg = <p>{props.error.message}</p>;
  }
  let isauthenticate = null;
  if (props.isauth) {
    isauthenticate = <Redirect to={props.redirectpath} />;
  }

  return (
    <div className={classes.bg}>
      <div className={classes.Auth}>
        {isauthenticate}
        {errormsg}
        <form onSubmit={onsubmithandler}>
          {form}
          <Button btntype="Success">SUBMIT</Button>
        </form>

        <p>
          New user <strong>SIGNUP</strong> Existing user <strong>SIGNIN</strong>
        </p>
        <Button
          clicked={onauthswitchmodehandler}
          btntype={issignup ? "Danger" : "Success"}
        >
          {" "}
          SWITCHED TO {issignup ? "SIGNUP" : "SIGNIN"}
        </Button>
      </div>
    </div>
  );
};

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
