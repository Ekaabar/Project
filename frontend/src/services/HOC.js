import React from "react";
import { useParams, useNavigate } from "react-router-dom";

//take a component and give out a configured one with using the given props
export function withParams(Component) {
  return (props) => (
    <Component {...props} params={useParams()} navigate={useNavigate()} />
  );
}
