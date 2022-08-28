import React, { Component } from "react";
import SideBareAdmin from "../../../components/SideBareAdmin";
import HeaderAdmin from "../../../components/HeaderAdmin";
import ToolbarAdmin from "../../../components/ToolbarAdmin";
import "../../../components/SideBare.css";
import API from "../../../services/api";
import { withParams } from "../../../services/HOC";

class EditUserLevelAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      description: "",
      enable: "",
      error: null,
      id: this.props.params.id,
      url_action: "user/level/",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    API.get(this.state.url_action + this.state.id).then((res) => {
      const data = res.data;
      console.log(data);
      this.setState({
        data: data,
        id: data._id,
        name: data.name,
        description: data.description,
        enable: data.enable,
      });
    });
  }

  //submit of all properties proper to userlevel
  handleSubmit(event) {
    event.preventDefault();

    API.put(this.state.url_action + this.state.id, {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      enable: this.state.enable,
    })
      .then((res) => {
        this.props.navigate("/admin/user-level/");
      })
      .catch((error) => {
        this.setState({
          error: "A problem has occurred. Please try again later.",
        });
      });
  }
  //list all possible userlevels
  render() {
    return (
      <div>
        <HeaderAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBareAdmin />
            <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <ToolbarAdmin />
              <h2>level education {this.state.data.name}</h2>
              {this.state.error && (
                <>
                  <div className="alert alert-danger" role="alert">
                    {" "}
                    {this.state.error}
                  </div>
                </>
              )}
              <form onSubmit={this.handleSubmit}>
                <div className="form-group my-2">
                  <label className="form-label" htmlFor="formControlInputName">
                    Name
                  </label>
                  <input
                    defaultValue={this.state.name}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    name="name"
                    id="formControlInputName"
                    required
                  />
                </div>

                <div className="form-group my-2">
                  <label
                    className="form-label"
                    htmlFor="formControlInputDescription"
                  >
                    Description
                  </label>
                  <textarea
                    defaultValue={this.state.description}
                    onChange={this.handleChange}
                    className="form-control"
                    name="description"
                    id="formControlInputDescription"
                    required
                  />
                </div>

                <div className="form-check my-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={this.state.enable}
                    name="enable"
                    onChange={this.handleChange}
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Enable
                  </label>
                </div>
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(EditUserLevelAdmin);
