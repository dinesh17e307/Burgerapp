import React, { Component } from "react";
import axios from "axios";
import Posts from "./Posts";
import Fullpost from "./Fullpost";
import Newpost from "./Newpost";
import classes from "./Http.module.css";
import Postroute from "./Postroute";
import { Route, NavLink, Switch } from "react-router-dom";
export class Http extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <header>
          <nav className={classes.blog}>
            <ul>
              <li>
                <NavLink activeClassName={classes.active} exact to="/">
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
          <Route exact path="/" component={Postroute} />
          <Route path="/new-post" component={Newpost} />
          <Route path="/:id" exact component={Fullpost} />
        </Switch>
      </div>
    );
  }
}

export default Http;
