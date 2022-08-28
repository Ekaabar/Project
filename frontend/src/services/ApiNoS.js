import axios from "axios";
import { getUserToken } from "./Common";
//authentification for User setting axios
export default axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    authorization: `Bearer ${getUserToken()}`,
  },
});
