import axios from "axios";
const instance = axios.create({
  baseURL: "https://burgerbuilder-31974-default-rtdb.firebaseio.com/",
});

export default instance;
