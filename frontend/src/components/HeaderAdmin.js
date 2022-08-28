// Header.js
import React, { Component } from "react";
import Logout from "../pages/admin/logout";
import { withParams } from "../services/HOC";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";
import { FaHome, FaUsers, FaArrowUp, FaQuestionCircle } from "react-icons/fa";

class HeaderAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseMenu: true,
    };

    this.showHide = this.showHide.bind(this);
  }

  showHide(e) {
    e.preventDefault();

    this.setState({
      collapseMenu: !this.state.collapseMenu,
    });
  }
  //redener the defferents links of our navbar
  render() {
    return (
      <>
        {/* <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                    <Link className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to="/admin">Dashboard</Link>
                    <Logout {...this.props} />
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                      <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenuAdmin" aria-controls="sidebarMenuAdmin" aria-expanded="false" aria-label="Toggle navigation" onClick={this.showHide}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                </nav> */}
        <Navbar
          className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
          bg="light"
          expand={false}
        >
          <Container fluid>
            <Navbar.Brand href="#">
              {" "}
              <Logout {...this.props} />
            </Navbar.Brand>
            <Navbar.Toggle
              className="d-md-none"
              aria-controls="offcanvasNavbar"
            />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  <Logout {...this.props} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    className={({ active }) =>
                      active ? "nav-link active" : "nav-link "
                    }
                    href="/admin/"
                  >
                    <FaHome style={{ fontSize: "20px", marginRight: "10px" }} />
                    Home
                  </Nav.Link>
                  <Nav.Link
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link "
                    }
                    href="/admin/users"
                  >
                    <FaUsers
                      style={{ fontSize: "20px", marginRight: "10px" }}
                    />
                    Users
                  </Nav.Link>
                  <Nav.Link
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link "
                    }
                    href="/admin/user-level"
                  >
                    <FaArrowUp
                      style={{ fontSize: "20px", marginRight: "10px" }}
                    />
                    Level education
                  </Nav.Link>
                  <Nav.Link
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link "
                    }
                    href="/admin/quiz"
                  >
                    <FaQuestionCircle
                      style={{ fontSize: "20px", marginRight: "10px" }}
                    />
                    Quiz
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default withParams(HeaderAdmin);
