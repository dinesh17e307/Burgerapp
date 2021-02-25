import React, { Component } from "react";
import classes from "./Http.module.css";
import axios from "axios";
import Posts from "./Posts";
import { Link, Route } from "react-router-dom";
import Fullpost from "./Fullpost";
export class Postroute extends Component {
  state = {
    post: [],
  };
  componentDidMount = () => {
    console.log(this.props);
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
    this.props.history.push("/posts/" + id);
    //  this.props.history.push({pathname:'/'+id});
  };
  render() {
    let posts;

    posts = <p>something went wrong!!!!!!</p>;
    if (!this.state.errmsg) {
      posts = this.state.post.map((e) => {
        return (
          // <Link to={"/" + e.id} >
          <Posts
            key={e.title}
            titl={e.title}
            au={e.author}
            clicked={() => this.selectposthandler(e.id)}
          />
          // </Link>
        );
      });
    }
    return (
      <div className={classes.posts}>
        <section className={classes.Layout}> {posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={Fullpost}
        />
      </div>
    );
  }
}

export default Postroute;
