import React, { Component } from "react";
import SideBareAdmin from "../../../components/SideBareAdmin";
import HeaderAdmin from "../../../components/HeaderAdmin";
import ToolbarAdmin from "../../../components/ToolbarAdmin";
import "../../../components/SideBare.css";
import API from "../../../services/api";
// import Moment from 'react-moment';
import "moment-timezone";
// import ReactTable from "react-table-v6";
import { withParams } from "../../../services/HOC";

class NewQuestionAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      enable: true,
      imageUrl: "",
      error: null,
      cat_id: this.props.params.cat_id,
      url_quiz_cat_quest: "quiz/category/question/",
      data: [],
      imageUrlFile: [],
      quiz_id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleChangeImage(e) {
    console.log(e.target.files[0]);
    this.setState({ imageUrlFile: e.target.files });
  }

  handleSubmitOld(event) {
    event.preventDefault();
    API.post(`quiz/category/question/`, {
      title: this.state.title,
      description: this.state.description,
      enable: this.state.enable,
      imageUrl: this.state.imageUrl,
      quizCategory: this.state.cat_id,
    })
      .then((res) => {
        this.props.navigate("/admin/category/" + this.state.cat_id + "/view");
      })
      .catch((error) => {
        this.setState({
          error: "A problem has occurred. Please try again later.",
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(); //formdata object

    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("enable", this.state.enable);
    formData.append("quizCategory", this.state.cat_id);
    if (this.state.imageUrlFile)
      formData.append("imageUrl", this.state.imageUrlFile[0]);

    API.post(this.state.url_quiz_cat_quest, formData, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
      .then((res) => {
        console.log(res);
        this.props.navigate("/admin/category/" + this.state.cat_id + "/view");
      })
      .catch((error) => {
        this.setState({
          error: "A problem has occurred. Please try again later.",
        });
      });
  }

  render() {
    return (
      <div>
        <HeaderAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBareAdmin />
            <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <ToolbarAdmin />
              <h2>Question add </h2>
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
                    Title
                  </label>
                  <input
                    defaultValue={this.state.title}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    name="title"
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

                <div className="mb-3">
                  <label for="formFile" className="form-label">
                    Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="imageUrlFile"
                    onChange={this.handleChangeImage}
                    id="formFile"
                  />

                  {this.state.imageUrl && (
                    <>
                      <img
                        src={this.state.imageUrl}
                        className="img-thumbnail"
                        alt="..."
                      />
                    </>
                  )}
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

export default withParams(NewQuestionAdmin);
