import classes from "./App.module.css";
import Layout from "./Components/Layout/Layout";
import Burgerbuilder from "./Container/BurgerBuilder/Burgerbuilder";
import Http from "./Container/BurgerBuilder/HTTP/Http";
import { Route, Switch } from "react-router-dom";
import Checkout from "./Container/Checkout/Checkout";
import Orders from "./Components/Orders/Orders";
import Auth from "./Container/Auth/Auth";
function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path="/" component={Burgerbuilder} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/auth" component={Auth} />
          {/* <Route path="/burger" component={Burgerbuilder} /> */}
          <Route path="/checkout" component={Checkout} />
          {/* <Redirect from="/" to="/burger" /> */}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
