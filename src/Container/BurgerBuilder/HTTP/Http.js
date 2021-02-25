import React, { Component } from "react";
import axios from "axios";
import Posts from "./Posts";
import Fullpost from "./Fullpost";
import classes from "./Http.module.css";
import Postroute from "./Postroute";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Asynccomponent from "./Hoc/Asynccomponent";
const lozyloader = Asynccomponent(() => {
  return import("./Newpost");
});
export class Http extends Component {
  state = {
    auth: true,
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <header>
          <nav className={classes.blog}>
            <ul>
              <li>
                <NavLink activeClassName={classes.active} exact to="/posts">
                  Home
                </NavLink>
                <NavLink
                  activeStyle={{
                    color: "greenyellow",
                    textDecoration: "underline",
                  }}
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick =true",
                  }}
                >
                  New post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route path="/posts" component={Postroute} />
          {this.state.auth ? (
            <Route path="/new-post" component={lozyloader} />
          ) : null}
          <Route render={() => <h1>not found 404 error</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Http;
