import React from "react";
import { Navigate } from "react-router-dom";
import { getUserToken } from "./Common";

// handle the public routes (when we are already in a user session)

function PrivateRoute({ children }) {
  return getUserToken() ? children : <Navigate to="/login" />;
}
export default PrivateRoute;
