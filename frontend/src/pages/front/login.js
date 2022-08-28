import React, { useState } from "react";
import {
  getInfoCartSession,
  getQuizId,
  getUserQuizSession,
  getUser,
  setUserQuizSession,
  setUserSession,
} from "../../services/Common";
import "./login.css";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import ApiNoS from "../../services/ApiNoS";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const adminname = useFormInput("test@gmail.com");
  const password = useFormInput("123456");
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);

    Axios.post(`http://localhost:3000/api/user/b/login`, {
      email: adminname.value,
      password: password.value,
    })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        console.log(response);
        const user = response.data.user;
        ApiNoS.get(
          "user/quiz/findone?enable=1&user=" + user._id + "&quiz=" + getQuizId()
        ).then((res) => {
          const data = res.data;
          console.log(res);
          if (data) {
            setUserQuizSession(data);
          } else {
            ApiNoS.post(`user/quiz/u/`, {
              user: user._id,
              quiz: getQuizId(),
            })
              .then((res) => {
                console.log(res);
                setUserQuizSession(res.data.value);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);

        if (error.response.status === 401) setError(error.response.data.error);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="container">
        <main role="main" className="flex-shrink-0">
          <div className="container container-body">
            <div className="row">
              <div className="login-body my-5 m-auto">
                <div className="login">
                  <form className="form-signin text-center">
                    <img
                      className="mb-4"
                      src="https://fakeimg.pl/150x75/f8f9fa/000?text=Application"
                      alt=""
                      width="150"
                      height="75"
                    />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">
                      {" "}
                      Email{" "}
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      {...adminname}
                      autoComplete="new-email"
                    />
                    <label htmlFor="inputPassword" className="sr-only">
                      {" "}
                      Password{" "}
                    </label>
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      {...password}
                      autoComplete="new-password"
                      required
                    />
                    {error && (
                      <>
                        {" "}
                        <small style={{ color: "red" }}> {error} </small>
                        <br />{" "}
                      </>
                    )}

                    <button
                      className="w-100 btn btn-lg btn-primary my-3"
                      type="button"
                      value={loading ? "Loading..." : "Login"}
                      onClick={handleLogin}
                      disabled={loading}
                    >
                      Sign in
                    </button>

                    <Link
                      className="w-100 btn btn-lg btn-secondary my-3"
                      to="/singup"
                    >
                      Registration
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return { value, onChange: handleChange };
};
export default Login;
