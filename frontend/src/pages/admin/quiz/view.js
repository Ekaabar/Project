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

class ViewQuizAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data_category: [],
      data_quiz_users: [],
      loading: false,
      defaultPageSize: 10,
      pages: 1,
      filterable: true,
      quiz_id: this.props.params.id,
    };
  }

  componentDidMount() {
    API.get(`quiz/` + this.state.quiz_id).then((res) => {
      const data = res.data;
      this.setState({
        data: data,
      });
    });
    API.get(`quiz/category/quiz/` + this.state.quiz_id).then((res) => {
      const data_category = res.data;
      console.log(data_category);
      this.setState({ data_category });
    });

    API.get("user/quiz/?quiz=" + this.state.quiz_id).then((res) => {
      const data = res.data;
      console.log(data);
      this.setState({ data_quiz_users: data });
    });
  }

  deleteOnClick = (row) => {
    window.confirm("Veuillez vous supprimer ce produit d'id :" + row._id);

    API.delete(`quiz/category/` + row._id)
      .then((res) => {
        API.get(`quiz/category/quiz/` + this.state.quiz_id).then((res) => {
          const data_category = res.data;
          this.setState({ data_category });
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error: "Un problème est survenu. Veuillez réessayer plus tard.",
        });
      });
  };

  deleteUserQuizOnClick = (row) => {
    window.confirm("Veuillez vous supprimer ce produit d'id :" + row._id);

    API.delete(`user/quiz/` + row._id)
      .then((res) => {
        API.get("user/quiz/?quiz=" + this.state.quiz_id).then((res) => {
          const data = res.data;
          console.log(data);
          this.setState({ data_quiz_users: data });
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error: "Un problème est survenu. Veuillez réessayer plus tard.",
        });
      });
  };
  //list of all existing quiz
  render() {
    const columns = [
      {
        Header: "Id",
        accessor: "_id",
      },
      {
        Header: "Name",
        accessor: "name",
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
              <Link
                type="button"
                className="btn btn-outline-primary"
                to={"/admin/category/" + props.row._id + "/view/"}
              >
                <i className="far fa-eye action mr-2"></i>
              </Link>

              <Link
                type="button"
                className="btn btn-outline-primary"
                to={"/admin/category/" + props.row._id}
              >
                <i className="far fa-edit action mr-2"></i>
              </Link>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={(row) => this.deleteOnClick(props.row)}
              >
                <i className="fas fa-trash action"></i>
              </button>
            </div>
          );
        },
      },
    ];

    const columnsQuiz = [
      {
        Header: "Id",
        accessor: "_id",
      },
      {
        Header: "User",
        accessor: "user.name",
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
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          return (
            <div className="btn-group text-center" role="group">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={(row) => this.deleteUserQuizOnClick(props.row)}
              >
                <i className="fas fa-trash action"></i>
              </button>
            </div>
          );
        },
      },
    ];
    //list of all list categories and answer quiz
    return (
      <div>
        <HeaderAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBareAdmin />
            <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <ToolbarAdmin />
              <h2>Quiz {this.state.data.name}</h2>
              <p>{this.state.data.description}</p>
              <h2>
                List categories
                <Link
                  type="button"
                  className="btn btn-primary btn-sm float-end small"
                  to={"/admin/category/new/" + this.state.quiz_id}
                >
                  {" "}
                  <i className="fas fa-plus action mx-2"></i>
                </Link>
              </h2>
              <ReactTable
                defaultPageSize={this.state.defaultPageSize}
                data={this.state.data_category}
                resolveData={(data) => data.map((row) => row)}
                columns={columns}
                filterable={this.state.filterable}
              />
              <hr />
              <h2>Answers quiz </h2>
              <ReactTable
                defaultPageSize={this.state.defaultPageSize}
                data={this.state.data_quiz_users}
                resolveData={(data) => data.map((row) => row)}
                columns={columnsQuiz}
                filterable={this.state.filterable}
              />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(ViewQuizAdmin);
