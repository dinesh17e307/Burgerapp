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
      },
      street: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      pincode: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your ZIP code",
        },
        value: "",
      },
      country: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elementtype: "input",
        elementconfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
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
  componentDidMount() {
    con = { ...this.props.ingredient };
  }
  onchangeformhandler = (event, formidentifier) => {
    const updatedorderform = [...this.state.orderform];
    updatedorderform[formidentifier].value = event.target.value;
    this.setState({
      orderform: updatedorderform,
    });
  };
  orderhandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const Orders = {
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
    console.log(this.state.orderform);
    let orderarray = [];
    for (let key in this.state.orderform) {
      orderarray.push({
        id: key,
        config: this.state.orderform[key],
      });
    }
    let form = (
      <form>
        <h1>Enter the contact details</h1>
        {orderarray.map((res) => (
          <Input
            key={res.id}
            elementtype={res.config.elementtype}
            elementconfig={res.config.elementconfig}
            value={res.config.value}
            changed={(event) => this.onchangeformhandler(event.res.id)}
          />
        ))}
        <Button btntype="Success" clicked={this.orderhandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.Contactform}>{form}</div>;
  }
}

export default Contactform;
