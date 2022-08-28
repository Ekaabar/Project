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

class ViewQuestionChildAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: "",
      description: "",
      enable: "",
      error: null,
      child_id: this.props.params.id,
      quest_id: "",
      url_action_quest_child: "quiz/category/question/child/",
    };
  }

  componentDidMount() {
    API.get(this.state.url_action_quest_child + this.state.child_id).then(
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

export default withParams(ViewQuestionChildAdmin);
