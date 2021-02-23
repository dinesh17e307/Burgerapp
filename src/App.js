import classes from "./App.module.css";
import Layout from "./Components/Layout/Layout";
import Burgerbuilder from "./Container/BurgerBuilder/Burgerbuilder";
import Http from "./Container/BurgerBuilder/HTTP/Http";
function App() {
  return (
    <div>
      <Layout>
        <Burgerbuilder />
      </Layout>
      {/* <Http /> */}
    </div>
  );
}

export default App;
