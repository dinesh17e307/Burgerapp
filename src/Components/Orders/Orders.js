import React, { Component } from "react";
import Order from "../Order/Order";
import axios from "../../Axiox-order";
import witherrorhandler from "../../Hoc/Withwraped/witherrorhandler";
export class Orders extends Component {
  state = {
    order: [],
    loading: true,
  };
  componentDidMount() {
    let fetchedorder = [];
    axios
      .get("/Orders.json")
      .then((res) => {
        for (let key in res.data) {
          fetchedorder.push({
            ...res.data[key],
            id: key,
          });
        }

        this.setState({
          loading: false,
          order: fetchedorder,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.order.map((order) => {
          return (
            <Order
              key={order.id}
              ingredient={order.ingredient}
              price={+order.price}
            />
          );
        })}
      </div>
    );
  }
}

export default witherrorhandler(Orders, axios);