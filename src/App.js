import classes from "./App.module.css";
import Layout from "./Components/Layout/Layout";
import Burgerbuilder from "./Container/BurgerBuilder/Burgerbuilder";
import Http from "./Container/BurgerBuilder/HTTP/Http";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Checkout from "./Container/Checkout/Checkout";
import Orders from "./Components/Orders/Orders";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={Burgerbuilder} />
            <Route exact path="/orders" component={Orders} />
            {/* <Route path="/burger" component={Burgerbuilder} /> */}
            <Route path="/checkout" component={Checkout} />
            {/* <Redirect from="/" to="/burger" /> */}
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
