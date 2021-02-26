import classes from "./Contactform.module.css";
import React, { Component } from "react";
import Button from "../../../Components/Layout/UI/Button/Button";
import axios from "../../../Axiox-order";
import Spinner from "../../../Components/Layout/UI/Spinner/Spinner";
let con;
export class Contactform extends Component {
  state = {
    ingredient: [],
    name: "",
    email: "",
    Address: {
      street: "",
      postalcode: "",
    },

    loading: false,
  };
  componentDidMount() {
    con = { ...this.props.ingredient };
    this.setState({
      ingredient: this.props.ingredient,
    });
    console.log(con);
  }

  orderhandler = (event) => {
    event.preventDefault();

    this.setState({ Loading: true });
    const Orders = {
      ingredient: con,
      price: this.props.totalprice,
      customer: {
        name: "dinesh sellappan",
        Address: {
          street: "154.bungala thottam",
          pincode: 638401,
          country: "india",
        },
        email: "dineshsellappan.com",
        DeliveryMethod: "fastest",
      },
    };

    axios
      .post("/Orders.json", Orders)
      .then((response) => {
        this.setState({ Loading: false });
        // this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ Loading: false });
      });
  };
  render() {
    console.log(this.props.ingredient);
    let form = (
      <form>
        <h1>Enter the contact details</h1>
        <input className={classes.input} name="name" placeholder="Your Name" />
        <input className={classes.input} name="email" placeholder="Your Mail" />
        <input
          className={classes.input}
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.input}
          name="postal"
          placeholder="Your Postalcode"
        />
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
