import axios from "axios";
import { getToken } from "./Common";
//authentification's Admin
export default axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    authorization: `Bearer ${getToken()}`,
    // 'content-type': 'multipart/form-data'
  },
});
