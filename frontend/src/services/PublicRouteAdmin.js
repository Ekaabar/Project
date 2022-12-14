import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./Common";

// handle the private routes Admin ()
function PublicRouteAdmin({ children }) {
  return !getToken() ? children : <Navigate to="/admin" />;
}
export default PublicRouteAdmin;
