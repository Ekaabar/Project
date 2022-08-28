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
import { Image } from "react-bootstrap";

class ViewQuestionAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data_question_child: [],
      data_question_option: [],
      loading: false,
      defaultPageSize: 10,
      pages: 1,
      filterable: true,
      url_action_quest_child: "quiz/category/question/child/",
      url_action_quest_option: "quiz/category/question/option/",
      url_action_quest: "quiz/category/question/",
      quest_id: this.props.params.id,
    };
  }

  deleteQuestionChildOnClick = (row) => {
    window.confirm("Veuillez vous supprimer ce ligne d'id :" + row._id);
    API.delete(this.state.url_action_quest_child + row._id)
      .then((res) => {
        API.get(this.state.url_action_quest_child).then((res) => {
          const data_question_child = res.data;
          this.setState({ data_question_child });
        });
      })
      .catch((error) => {
        this.setState({
          error: "Un problème est survenu. Veuillez réessayer plus tard.",
        });
      });
  };

  deleteQuestionOptionOnClick = (row) => {
    window.confirm("Veuillez vous supprimer ce ligne d'id :" + row._id);
    API.delete(this.state.url_action_quest_option + row._id)
      .then((res) => {
        API.get(this.state.url_action_quest_option).then((res) => {
          const data_question_option = res.data;
          this.setState({ data_question_option });
        });
      })
      .catch((error) => {
        this.setState({
          error: "Un problème est survenu. Veuillez réessayer plus tard.",
        });
      });
  };

  componentDidMount() {
    API.get(this.state.url_action_quest + this.state.quest_id).then((res) => {
      const data = res.data;
      this.setState({
        data: data,
      });
    });
    API.get(
      this.state.url_action_quest_child + "question/" + this.state.quest_id
    ).then((res) => {
      const data_question_child = res.data;
      console.log(data_question_child);
      this.setState({ data_question_child });
    });
    API.get(
      this.state.url_action_quest_option + "question/" + this.state.quest_id
    ).then((res) => {
      const data_question_option = res.data;
      console.log(data_question_option);
      this.setState({ data_question_option });
    });
  }

  render() {
    const columnsQuestionChild = [
      {
        Header: "Id",
        accessor: "_id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Image",
        accessor: "imageUrl",
        Cell: (props) => (
          <>
            {" "}
            <Image fluid="true" src={props.value} />{" "}
          </>
        ),
      },
      {
        Header: "Type",
        accessor: "questionType",
      },
      {
        Header: "Answer selection type",
        accessor: "answerSelectionType",
      },
      {
        Header: "Point",
        accessor: "point",
      },
      {
        Header: "Enable",
        accessor: "enable",
        Cell: (props) => <span>{props.value ? "Enable" : "Disable"}</span>,
      },
      {
        Header: "Correct answer",
        accessor: "quizCategoryQuestionOptionCorrects",
        Cell: (props) => {
          console.log(props);
          return (
            <span>
              {props.value.map((option) => (
                <div>{option.title}</div>
              ))}
            </span>
          );
        },
      },
      {
        Header: "Date Created",
        accessor: "dateCreated",
        Cell: (props) => <Moment format="YYYY/MM/DD">{props.value}</Moment>,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          return (
            <div className="btn-group text-center" role="group">
              {/* <Link type="button" className="btn btn-outline-primary" to={"/admin/question-child/" + props.row._id + "/view/"}  >
                            <i className="far fa-eye action mr-2"></i>
                        </Link> */}

              <Link
                type="button"
                className="btn btn-outline-primary"
                to={"/admin/question-child/" + props.row._id}
              >
                <i className="far fa-edit action mr-2"></i>
              </Link>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={(row) => this.deleteQuestionChildOnClick(props.row)}
              >
                <i className="fas fa-trash action"></i>
              </button>
            </div>
          );
        },
      },
    ];

    const columnsQuestionOption = [
      {
        Header: "Id",
        accessor: "_id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Enable",
        accessor: "enable",
        Cell: (props) => <span>{props.value ? "Enable" : "Disable"}</span>,
      },
      {
        Header: "Date Created",
        accessor: "dateCreated",
        Cell: (props) => <Moment format="YYYY/MM/DD">{props.value}</Moment>,
        // }, {
        //     Header: 'Quiz parent',
        //     accessor: 'quiz',
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          return (
            <div className="btn-group text-center" role="group">
              {/* <Link type="button" className="btn btn-outline-primary" to={"/admin/question-option/" + props.row._id + "/view/"}  >
                            <i className="far fa-eye action mr-2"></i>
                        </Link> */}

              <Link
                type="button"
                className="btn btn-outline-primary"
                to={"/admin/question-option/" + props.row._id}
              >
                <i className="far fa-edit action mr-2"></i>
              </Link>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={(row) => this.deleteQuestionOptionOnClick(props.row)}
              >
                <i className="fas fa-trash action"></i>
              </button>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <HeaderAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBareAdmin />
            <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <ToolbarAdmin />
              <h2>Question {this.state.data.title}</h2>
              <p>{this.state.data.description}</p>
              <h2>
                List Questions child
                <Link
                  type="button"
                  className="btn-danger btn-sm float-end small"
                  to={"/admin/question-child/new/" + this.state.quest_id}
                >
                  <i className="fas fa-plus action mr-2"></i>
                </Link>
              </h2>
              <ReactTable
                defaultPageSize={this.state.defaultPageSize}
                data={this.state.data_question_child}
                resolveData={(data) => data.map((row) => row)}
                columns={columnsQuestionChild}
                filterable={this.state.filterable}
              />

              <h2 className="mt-5">
                List options
                <Link
                  type="button"
                  className="btn-danger btn-sm float-end small"
                  to={"/admin/question-option/new/" + this.state.quest_id}
                >
                  <i className="fas fa-plus action mr-2"></i>
                </Link>
              </h2>
              <ReactTable
                defaultPageSize={this.state.defaultPageSize}
                data={this.state.data_question_option}
                resolveData={(data) => data.map((row) => row)}
                columns={columnsQuestionOption}
                filterable={this.state.filterable}
              />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(ViewQuestionAdmin);
