import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./Common";

// handle the private routes (when we are already in the admin session)
function PrivateRouteAdmin({ children }) {
  return getToken() ? children : <Navigate to="/admin/login" />;
}
export default PrivateRouteAdmin;
