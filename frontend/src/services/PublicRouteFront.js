import React from "react";
import { Navigate } from "react-router-dom";
import { getUserToken } from "./Common";

// handle the private routes in user space
function PrivateRouteFront({ children }) {
  return !getUserToken() ? children : <Navigate to="/profile" />;
}
export default PrivateRouteFront;
