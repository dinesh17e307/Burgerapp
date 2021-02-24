import axios from "axios";
import React from "react";
import classes from "./Http.module.css";
class Fullpost extends React.Component {
  state = {
    loadedpost: null,
  };

  componentDidMount = () => {
    console.log(this.props);
    if (this.props.match.params.id) {
      if (
        !this.state.loadedpost ||
        (this.state.loadedpost &&
          this.state.loadedpost.id !== this.props.selectpost)
      ) {
        axios.get("/posts/" + this.props.match.params.id).then((rep) => {
          this.setState({
            loadedpost: rep.data,
          });
        });
      }
    }
  };
  deleteposthandler = () => {
    axios.delete("/posts/" + this.props.selectpost).then((rep) => {
      console.log(rep);
    });
  };
  render() {
    let post = <p>please select the post</p>;
    if (this.props.selectpost) {
      post = <p>Loading....!</p>;
    }

    if (this.state.loadedpost) {
      post = (
        <div className={classes.fullpost}>
          <h1>{this.state.loadedpost.title}</h1>
          <h2>{this.state.loadedpost.body}</h2>
          <button onClick={this.deleteposthandler}>delete</button>
        </div>
      );
    }

    return post;
  }
}
export default Fullpost;
