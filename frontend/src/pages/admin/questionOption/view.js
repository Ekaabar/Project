import React, { Component } from "react";
import SideBareAdmin from "../../../components/SideBareAdmin";
import HeaderAdmin from "../../../components/HeaderAdmin";
import ToolbarAdmin from "../../../components/ToolbarAdmin";
import "../../../components/SideBare.css";
import API from "../../../services/api";
import Moment from "react-moment";
import "moment-timezone";
import ReactTable from "react-table-v6";
import { Link } from "react-router-dom";
import { withParams } from "../../../services/HOC";

class ViewQuestionOptionAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: "",
      description: "",
      enable: "",
      error: null,
      option_id: this.props.params.id,
      quest_id: "",
      url_action_quest_option: "quiz/category/question/option/",
    };
  }

  componentDidMount() {
    API.get(this.state.url_action_quest_option + this.state.option_id).then(
      (res) => {
        const data = res.data;
        this.setState({
          data: data,
          title: data.title,
          description: data.description,
          enable: data.enable,
          quest_id: data.quizCategoryQuestion._id,
        });
      }
    );
  }
  //list all possible options proper to the selected question
  render() {
    return (
      <div>
        <HeaderAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBareAdmin />
            <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <ToolbarAdmin />
              <h2>Response : {this.state.data.title}</h2>
              <p>Description : {this.state.data.description}</p>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(ViewQuestionOptionAdmin);
