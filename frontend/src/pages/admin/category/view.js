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
import Image from "react-bootstrap/Image";

class ViewCategoryAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data_question: [],
      cat_id: this.props.params.id,
      loading: false,
      defaultPageSize: 10,
      pages: 1,
      filterable: true,
    };
  }

  componentDidMount() {
    API.get(`quiz/category/` + this.state.cat_id).then((res) => {
      const data = res.data;
      this.setState({
        data: data,
      });
    });
    API.get(`quiz/category/question/category/` + this.state.cat_id).then(
      (res) => {
        const data_question = res.data;
        console.log(data_question);
        this.setState({ data_question });
      }
    );
  }
  //create a table and list all possibles categories within it
  render() {
    const columns = [
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
        Header: "Image Url",
        accessor: "imageUrl",
        Cell: (props) => (
          <>
            {" "}
            <Image fluid="true" src={props.value} />{" "}
          </>
        ),
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
              <Link
                type="button"
                className="btn btn-outline-primary"
                to={"/admin/question/" + props.row._id + "/view/"}
              >
                <i className="far fa-eye action mr-2"></i>
              </Link>

              <Link
                type="button"
                className="btn btn-outline-primary"
                to={"/admin/question/" + props.row._id}
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
    return (
      <div>
        <HeaderAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBareAdmin />
            <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <ToolbarAdmin />
              <h2>Category {this.state.data.name}</h2>
              <p>{this.state.data.description}</p>
              <h2>
                List questions
                <Link
                  type="button"
                  className="btn-danger btn-sm float-end small"
                  to={"/admin/question/new/" + this.state.cat_id}
                >
                  <i className="fas fa-plus action mr-2"></i>
                </Link>
              </h2>
              <ReactTable
                defaultPageSize={this.state.defaultPageSize}
                data={this.state.data_question}
                resolveData={(data) => data.map((row) => row)}
                columns={columns}
                filterable={this.state.filterable}
              />
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default withParams(ViewCategoryAdmin);
