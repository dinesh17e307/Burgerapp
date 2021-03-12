import classes from "./Contactform.module.css";
import React, { Component } from "react";
import Button from "../../../Components/Layout/UI/Button/Button";
import axios from "../../../Axiox-order";
import Spinner from "../../../Components/Layout/UI/Spinner/Spinner";
import Input from "../../../Components/Layout/UI/Forms/Input/Input";
import { connect } from "react-redux";
import withErrorhandler from "../../../Hoc/Withwraped/witherrorhandler";
import * as orderactions from "../../../Store/actions/index";
import * as actions from "../../../Store/actions/Order";
import { updateobject, checkvalid } from "../../../shared/utilitty";

let con;
export class Contactform extends Component {
  state = {
    orderform: {
      name: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        Validation: {
          required: true,
        },
        valid: false,
        touch: false,
      },
      street: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        Validation: {
          required: true,
        },
        valid: false,
        touch: false,
      },
      pincode: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your ZIP code",
        },
        value: "",
        Validation: {
          required: true,
          maxlength: 6,
          minlength: 5,
          isNumeric: true,
        },
        valid: false,
        touch: false,
      },
      country: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        Validation: {
          required: true,
        },
        valid: false,
        touch: false,
      },
      email: {
        elementtype: "input",
        elementconfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        Validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touch: false,
      },
      DeliveryMethod: {
        elementtype: "select",
        elementconfig: {
          options: [
            {
              value: "fastest",
              displayvalue: "fastest",
            },
            {
              value: "cheapest",
              displayvalue: "cheapest",
            },
          ],
        },
        value: "fastest",
        Validation: {},
        valid: true,
      },
    },

    formvalid: false,
  };

  componentDidMount() {
    con = { ...this.props.ings };
  }
  onchangeformhandler = (event, formidentifier) => {
    const updatedformelement = updateobject(
      this.state.orderform[formidentifier],
      {
        value: event.target.value,
        touch: true,
        valid: checkvalid(
          event.target.value,
          this.state.orderform[formidentifier].Validation
        ),
      }
    );
    const updatedorderform = updateobject(this.state.orderform, {
      [formidentifier]: updatedformelement,
    });

    let formvalidat = true;
    for (let item in updatedorderform) {
      formvalidat = updatedorderform[item].valid && formvalidat;
    }
    this.setState({
      orderform: updatedorderform,
      formvalid: formvalidat,
    });
  };
  orderhandler = (event) => {
    event.preventDefault();
    const formdata = {};
    for (let formidentifier in this.state.orderform) {
      formdata[formidentifier] = this.state.orderform[formidentifier].value;
    }
    const customerdata = { ...formdata };
    this.setState({ loading: true });
    const Orders = {
      customer: customerdata,
      ingredient: con,
      price: this.props.prc,
      user: this.props.userid,
    };
    this.props.onorderburger(Orders, this.props.token);
  };

  render() {
    let orderarray = [];
    for (let key in this.state.orderform) {
      orderarray.push({
        id: key,
        config: this.state.orderform[key],
      });
    }
    let form = (
      <form onSubmit={this.orderhandler}>
        <h1>Enter the contact details</h1>
        {orderarray.map((res) => (
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
        ))}
        <Button disabled={!this.state.formvalid} btntype="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={classes.Contactform}>{form}</div>;
  }
}
const mapstatetoprops = (state) => {
  return {
    ings: state.burgerbuilder.ingredients,
    prc: state.burgerbuilder.totalprice,
    loading: state.order.loading,
    token: state.Auth.tokenid,
    userid: state.Auth.userid,
  };
};
const mapdispatchtoprops = (dispatch) => {
  return {
    onorderburger: (orderdata, token) =>
      dispatch(orderactions.purchaseburger(orderdata, token)),
  };
};
export default connect(
  mapstatetoprops,
  mapdispatchtoprops
)(withErrorhandler(Contactform, axios));
