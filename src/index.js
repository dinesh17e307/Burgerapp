import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import burgerbuilderreducer from "./Store/reducers/Burgerbuilder";
import orderreducer from "./Store/reducers/Order";
import authreduecr from "./Store/reducers/auth";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import createSagaMiddleware from "react-saga";
import { sagalogout } from "./Saga/auth";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const sagaMiddleware = createSagaMiddleware();
const rootreducer = combineReducers({
  burgerbuilder: burgerbuilderreducer,
  order: orderreducer,
  Auth: authreduecr,
});
const store = createStore(
  rootreducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
sagaMiddleware.run(sagalogout);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
