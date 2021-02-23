import React, { Component } from "react";
import axios from "axios";
import Posts from "./Posts";
import Fullpost from "./Fullpost";
import Newpost from "./Newpost";
export class Http extends Component {
  state = {
    post: [],
    selectpost: null,
    errmsg: false,
  };
  componentDidMount = () => {
    axios
      .get("/posts")
      .then((rep) => {
        const postred = rep.data.slice(0, 4);
        const postupdate = postred.map((ed) => {
          return {
            ...ed,
            author: "dinesh",
          };
        });
        this.setState({
          post: postupdate,
        });
        console.log(rep.data);
      })
      .catch((err) => {
        this.setState({
          errmsg: true,
        });
      });
  };

  selectposthandler = (id) => {
    this.setState({
      selectpost: id,
    });
  };
  render() {
    let posts;

    posts = <p>something went wrong!!!!!!</p>;
    if (!this.state.errmsg) {
      posts = this.state.post.map((e) => {
        return (
          <Posts
            titl={e.title}
            au={e.author}
            clicked={() => this.selectposthandler(e.id)}
          />
        );
      });
    }
    return (
      <div>
        {posts}

        <Fullpost selectpost={this.state.selectpost} />

        <Newpost />
      </div>
    );
  }
}

export default Http;
