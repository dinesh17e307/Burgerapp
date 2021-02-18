import classes from "./App.module.css";
import Layout from "./Components/Layout/Layout";
import Burgerbuilder from "./Container/BurgerBuilder/Burgerbuilder";
function App() {
  return (
    <div>
      <Layout>
        <Burgerbuilder />
      </Layout>
    </div>
  );
}

export default App;
