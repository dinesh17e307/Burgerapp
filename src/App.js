import classes from "./App.module.css";
import Layout from "./Components/Layout/Layout";
import Burgerbuilder from "./Container/BurgerBuilder/Burgerbuilder";
import Http from "./Container/BurgerBuilder/HTTP/Http";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Layout>
        <Burgerbuilder />
      </Layout> */}
        <Http />
      </div>
    </BrowserRouter>
  );
}

export default App;
