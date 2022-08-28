import React, { useState } from "react";
import axios from "axios";
import { setAdminSession } from "../../services/Common";
import "./login.css";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const adminname = useFormInput("test@gmail.com");
  const password = useFormInput("test");
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);

    axios
      .post(`http://localhost:3000/api/admin/login`, {
        email: adminname.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        setAdminSession(response.data.token, response.data.admin);
        /*         console.log(response); */
        window.location.reload(false);
        props.history.push("/admin");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.response.status === 401) setError(error.response.data.error);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="login-body my-5">
      <div className="login">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Espace Admin
          </h1>
          <label htmlFor="inputEmail" className="sr-only form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            {...adminname}
            autoComplete="new-email"
          />
          <label htmlFor="inputPassword" className="sr-only form-label">
            Password
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
              <small style={{ color: "red" }}>{error}</small>
              <br />
            </>
          )}
          <br />
          <input
            className="btn btn-lg btn-primary btn-block text-uppercase"
            type="button"
            value={loading ? "Loading..." : "Se Connecter"}
            onClick={handleLogin}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
