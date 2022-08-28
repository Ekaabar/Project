import React, { Component } from "react";
import Header from "../../components/Header";
import "./front.css";
import {
  getInfoCartSession,
  getQuizId,
  getUserLevelsOptions,
  setUserInfoSession,
  setUserLevels,
  setUserQuizSession,
  setUserSession,
} from "../../services/Common";
import api from "../../services/ApiNoS";
import { withParams } from "../../services/HOC";
import ApiNoS from "../../services/ApiNoS";
import Select from "react-select";

class Singup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoCart: getInfoCartSession(),
      name: "test",
      userLevel: "",
      selectedOption: null,
      age: "",
      email: "test@gmail.com",
      password: "123456",
      errorMessage: null,
      url_get_user_level: "user/level/",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var optionsUserLevels = getUserLevelsOptions();
    if (!optionsUserLevels) {
      ApiNoS.get(this.state.url_get_user_level + "enable/").then((res) => {
        const data = res.data;
        setUserLevels(data);
        this.setState({ optionsUserLevels: getUserLevelsOptions() });
      });
    } else {
      this.setState({ optionsUserLevels });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleChangeSelect(selectedOption) {
    this.setState({
      userLevel: selectedOption.value,
    });
    this.setState({ selectedOption });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props.name);

    api
      .post(`user/b/signup`, {
        name: this.state.name,
        password: this.state.password,
        age: new Date(this.state.age),
        email: this.state.email,
        userLevel: this.state.userLevel,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);

        this.props.navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.error);
          // client received an error response (5xx, 4xx)
          // this.setState({ errorMessage: "A problem has occurred. Please try again later." });

          this.setState({ errorMessage: error.response.data.error.message });
        } else if (error.request) {
          console.log(error.request);
          // client never received a response, or request never left
        } else {
          this.setState({
            errorMessage: "A problem is occurred. Please try again later.",
          });
          // anything else
        }
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="container">
          <main role="main" className="flex-shrink-0">
            <div className="container container-body">
              <div className="row">
                <div className="col-md-6 offset-3">
                  {this.state.errorMessage && (
                    <>
                      <div className="alert alert-danger" role="alert">
                        {" "}
                        {this.state.errorMessage}
                      </div>
                    </>
                  )}
                  <h4 className="mb-3 text-center">Registration</h4>
                  <form
                    className="needs-validation"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="mb-3">
                      <label htmlFor="adminname">Username</label>
                      <div className="input-group">
                        <input
                          value={this.state.name}
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="Username"
                          required
                        />
                        <div
                          className="invalid-feedback"
                          style={{ width: 100 + "%" }}
                        >
                          Your username is required.
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email">Email</label>
                      <input
                        value={this.state.email}
                        onChange={this.handleChange}
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email">Password</label>
                      <input
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter a valid password address for shipping
                        updates.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="age">Age</label>
                      <input
                        value={this.state.age}
                        onChange={this.handleChange}
                        type="date"
                        className="form-control"
                        name="age"
                        id="age"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping age.
                      </div>
                    </div>

                    <div className="form-group my-2">
                      <label htmlFor="exampleFormControlEducation">
                        Education Level
                      </label>
                      <Select
                        onChange={this.handleChangeSelect}
                        options={this.state.optionsUserLevels}
                        required
                      />
                    </div>

                    <hr className="mb-4" />
                    <div className="text-center">
                      <button
                        className="w-100 btn btn-lg btn-secondary my-3"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
export default withParams(Singup);
