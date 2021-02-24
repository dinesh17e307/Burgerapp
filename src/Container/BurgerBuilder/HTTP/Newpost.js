import axios from "axios";
import React, { Component } from "react";
import classes from "./Http.module.css";
export class Newpost extends Component {
  state = {
    title: "",
    content: "",
    author: "dinesh",
  };
  componentDidMount = () => {
    console.log(this.props);
  };
  postdatahandler = () => {
    const posts = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
    };
    axios.post("/posts", posts).then((rep) => {
      console.log(rep);
    });
  };
  render() {
    return (
      <div className={classes.Newpost}>
        <h1>title</h1>
        <input
          type="text"
          value={this.state.title}
          onChange={(e) =>
            this.setState({
              title: e.target.value,
            })
          }
        />
        <h1>content</h1>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={(e) =>
            this.setState({
              content: e.target.value,
            })
          }
        >
          {" "}
        </textarea>
        <br></br>
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={(e) =>
            this.setState({
              author: e.target.value,
            })
          }
        >
          <option>dinesh</option>
          <option>velu</option>
        </select>
        <br></br>
        <button onClick={this.postdatahandler}>Add Post</button>
      </div>
    );
  }
}

export default Newpost;
