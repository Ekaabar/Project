// Header.js
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaArrowUp, FaQuestionCircle } from "react-icons/fa";
import "./SideBare.css";

export default class SideBareAdmin extends Component {
  render() {
    return (
      <nav
        id="sidebarMenuAdmin"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse mt-5"
      >
        <div className="sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link "
                }
                to="/admin/"
              >
                <FaHome style={{ fontSize: "20px", marginRight: "10px" }} />
                <span data-feather="admin"></span>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                a
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link "
                }
                to="/admin/users"
              >
                <FaUsers style={{ fontSize: "20px", marginRight: "10px" }} />
                <span data-feather="admins"></span>
                Users
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link "
                }
                to="/admin/user-level"
              >
                <FaArrowUp style={{ fontSize: "20px", marginRight: "10px" }} />
                <span data-feather="admins"></span>
                Level education
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link "
                }
                to="/admin/quiz"
              >
                <FaQuestionCircle
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
                <span data-feather="admins"></span>
                Quiz
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
