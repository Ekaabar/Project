// Header.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { getUser, getUserQuizSession } from "../services/Common";
import { withParams } from "../services/HOC";
import Moment from "react-moment";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleRetrunNav = this.handleRetrunNav.bind(this);
  }

  state = {
    user: getUser(),
    userQuiz: getUserQuizSession(),
  };

  handleRetrunNav() {
    this.props.navigate(-1);
  }

  componentDidMount() {
    this.setState({
      userQuiz: getUserQuizSession(),
      user: getUser(),
    });
  }

  render() {
    const user = this.state.user;
    // console.log(getUser());
    // console.log(getUserQuizSession());
    return (
      <div className="container-fluid bg-light mb-3">
        <div className="container">
          <header className="blog-header py-3">
            <div className="row flex-nowrap justify-content-between align-items-center">
              <div className="col-4 pt-1">
                {!user && (
                  <Link
                    className="btn btn-sm btn-outline-secondary p-2"
                    to="/login"
                  >
                    Sign in
                  </Link>
                )}
                <LogoutButton {...this.props} />
              </div>
              <div className="col-4 text-center">
                <Link className="blog-header-logo text-dark" to="/">
                  Application
                </Link>
              </div>

              <div className="col-4 d-flex justify-content-end align-items-center">
                {!user && (
                  <>
                    <Link
                      className="btn btn-sm btn-outline-secondary p-2"
                      to="/singup"
                    >
                      Registration
                    </Link>
                  </>
                )}
                {user && (
                  <Link
                    className="btn btn-sm btn-outline-secondary p-2"
                    to="/profile"
                  >
                    Profile
                  </Link>
                )}
              </div>
            </div>
          </header>
          <div className="nav-scroller py-1 mb-2 d-flex justify-content-between">
            <nav className="nav d-flex justify-content-center">
              {user && <span className="p-2 link-secondary">{user.name}</span>}
            </nav>
            <nav className="nav d-flex justify-content-center">
              <Link className="p-2 link-secondary" to="/">
                Quiz
              </Link>
              <Link className="p-2 link-secondary" to="/">
                Results
              </Link>
            </nav>
            <nav className="nav d-flex justify-content-center">
              <span
                className="p-2 link-secondary text-decoration-underline"
                onClick={this.handleRetrunNav}
              >
                Return
              </span>
            </nav>
          </div>
          <div className="nav-scroller py-1 mb-2 d-flex justify-content-between">
            <div></div>
            {this.state.userQuiz && (
              <span className="p-2 link-secondary">
                <strong>Answer quiz current:</strong> {this.state.userQuiz._id}{" "}
                ({" "}
                <Moment format="YYYY/MM/DD">
                  {this.state.userQuiz.dateCreated}
                </Moment>{" "}
                )
              </span>
            )}
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(Header);
