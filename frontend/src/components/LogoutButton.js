import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, removeUserSession } from "../services/Common";

function LogoutButton() {
  // const navigate = useNavigate();
  let navigate = useNavigate();
  const handleLogout = () => {
    removeUserSession();
    // navigate.push('login');
    navigate("/login");
  };

  let buttonCurrent;
  const user = getUser();

  if (user) {
    buttonCurrent = (
      <button
        className=" btn btn-sm btn-outline-secondary"
        onClick={handleLogout}
      >
        Logout
        {/* {user.email} */}
      </button>
    );
  }
  return <>{buttonCurrent}</>;
}
export default LogoutButton;
