import React, { Component } from "react";
import Header from "../../components/Header";
import "./front.css";
import {
  getUser,
  getUserLevels,
  getUserLevelsOptions,
  setUserInfoSession,
} from "../../services/Common";
import Select from "react-select";
import ApiNoS from "../../services/ApiNoS";
import moment from "moment";
import { withParams } from "../../services/HOC";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    const userSession = getUser();
    this.state = {
      user: getUser(),
      error: null,
      userLevelSelected: null,
      selectedOption: null,
      userLevel: "",
      age: moment(userSession.age).format("YYYY-MM-DD"),
      email: userSession.email,
      name: userSession.name,
      password: userSession.password,
      _id: userSession._id,
      errorMessage: null,
      url_get_user_level: "user/level/",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const optionsUserLevels = getUserLevelsOptions();
    this.setState({ optionsUserLevels });

    const userLevels = getUserLevels();
    if (this.state.user.userLevel) {
      const userLevelObject = userLevels.find(
        (element) => element._id === this.state.user.userLevel._id
      );
      if (userLevelObject) {
        var element = {
          value: userLevelObject._id,
          label: userLevelObject.name,
        };
        this.setState({ selectedOption: element });
      }
    }
  }

  handleChange(event) {
    const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    var value;
    switch (target.type) {
      case "checkbox":
        value = target.checked;
        break;

      // case 'date':
      //     value = moment(target.value).format("DD/MM/YYYY");
      //     console.log(value)
      //     break;
      default:
        value = target.value;
        break;
    }
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleChangeSelect(selectedOption) {
    this.setState({
      userLevelSelected: selectedOption.value,
    });
    this.setState({ selectedOption });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.userLevel);
    console.log(this.state.userLevelSelected);

    ApiNoS.put(`user/p/` + this.state.user._id, {
      _id: this.state.user._id,
      name: this.state.name,
      password: this.state.password,
      age: new Date(this.state.age),
      email: this.state.email,
      userLevel: this.state.userLevelSelected,
    })
      .then((res) => {
        console.log(res.data.user);

        setUserInfoSession(res.data.user);
        this.props.navigate("/profile");
      })
      .catch((error) => {
        if (error.response.status === "404") {
          this.setState({
            errorMessage: "A problem has occurred. Please try again later.",
          });
        } else if (error.response) {
          console.log(error.response);
          // client received an error response (5xx, 4xx)
          // this.setState({ errorMessage: "A problem has occurred. Please try again later." });

          this.setState({ errorMessage: error.response.data.error.message });
        } else if (error.request) {
          console.log(error.request);
          // client never received a response, or request never left
        } else {
          this.setState({
            errorMessage: "A problem has occurred. Please try again later.",
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
                <div className="col-lg-8">
                  <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Profile</span>
                    <span className="badge badge-secondary badge-pill">
                      {" "}
                      {this.state.user._id}{" "}
                    </span>
                  </h4>

                  <div className="col-lg-6 offset-3">
                    {this.state.errorMessage && (
                      <>
                        <div className="alert alert-danger" role="alert">
                          {" "}
                          {this.state.errorMessage}
                        </div>
                      </>
                    )}
                    <h4 className="mb-3 text-center">Edit</h4>
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
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>

                      {/* <div className="mb-3">
                                            <label htmlFor="email">Password</label>
                                            <input value={this.state.password} onChange={this.handleChange} type="password" className="form-control" name="password" id="password" required />
                                            <div className="invalid-feedback">
                                                Please enter a valid password address for shipping updates.
                                            </div>
                                        </div> */}
                      <div className="mb-3">
                        <label htmlFor="age">Age</label>
                        <input
                          value={this.state.age}
                          onChange={this.handleChange}
                          type="date"
                          className="form-control"
                          name="age"
                          id="age"
                          max="2004-01-01"
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
                          value={this.state.selectedOption}
                        />
                      </div>

                      <hr className="mb-4" />
                      <div className="text-center">
                        <button
                          className="w-100 btn btn-lg btn-secondary my-3"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
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
}

export default withParams(ProfileEdit);
