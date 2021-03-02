import classes from "./Contactform.module.css";
import React, { Component } from "react";
import Button from "../../../Components/Layout/UI/Button/Button";
import axios from "../../../Axiox-order";
import Spinner from "../../../Components/Layout/UI/Spinner/Spinner";
import Input from "../../../Components/Layout/UI/Forms/Input/Input";
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
        },
        valid: false,
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
        },
        valid: false,
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
        value: "",
      },
    },

    loading: false,
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
    return isvalid;
  }
  componentDidMount() {
    con = { ...this.props.ingredient };
  }
  onchangeformhandler = (event, formidentifier) => {
    const updatedorderform = { ...this.state.orderform };
    const updatedformelement = { ...updatedorderform[formidentifier] };
    updatedformelement.value = event.target.value;
    updatedformelement.valid = this.checkvalid(
      updatedformelement.value,
      updatedformelement.Validation
    );
    updatedorderform[formidentifier] = updatedformelement;
    console.log(updatedformelement);
    this.setState({
      orderform: updatedorderform,
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
      price: this.props.totalprice,
    };

    axios
      .post("/Orders.json", Orders)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
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
            changed={(event) => this.onchangeformhandler(event, res.id)}
          />
        ))}
        <Button btntype="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.Contactform}>{form}</div>;
  }
}

export default Contactform;
