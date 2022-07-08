import axios from "axios";

export default axios.create({
  baseURL: "https://bisell-backend.herokuapp.com/v1",
  withCredentials: true,
});
