import React from "react";
import { getAdmin, removeAdminSession } from '../../services/Common';
import { useNavigate } from "react-router-dom";


function Logout(props) {

  const admin = getAdmin();
  const navigate = useNavigate();

  // handle click event of logout button
  const handleLogout = () => {
    removeAdminSession();
    navigate('/admin/login');
  }

  return (
    <a className="nav-link" href="/admin" onClick={handleLogout}> Logout {admin.email}</a>
  );
}

export default Logout;