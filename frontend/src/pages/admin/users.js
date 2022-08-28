import React, { Component } from "react";
import SideBareAdmin from "../../components/SideBareAdmin";
import HeaderAdmin from "../../components/HeaderAdmin";
import ToolbarAdmin from "../../components/ToolbarAdmin";
import "../../components/SideBare.css";
import API from "../../services/api";
import Moment from "react-moment";
import "moment-timezone";
import ReactTable from "react-table-v6";

export default class UsersAdmin extends Component {
  state = {
    data: [],
    loading: false,
    defaultPageSize: 10,
    pages: 1,
    filterable: true,
  };

  componentDidMount() {
    API.get(`user/`).then((res) => {
      const data = res.data;
      console.log(data);
      this.setState({ data });
    });
  }
  //creation of a list/table with the following attributes
  render() {
    const columns = [
      {
        Header: "Id",
        accessor: "_id", // String-based value accessors!
      },
      {
        Header: "Name",
        accessor: "name", // String-based value accessors!
      },
      {
        Header: "Email",
        accessor: "email", // String-based value accessors!
      },
      {
        Header: "Level",
        accessor: "userLevel",
        Cell: (props) => <>{props.value ? props.value.name : " - "}</>, // Custom cell components!
      },
      {
        Header: "Age",
        accessor: "age",
        Cell: (props) => (
          <Moment toNow ago>
            {props.value}
          </Moment>
        ), // Custom cell components!
      },
      {
        Header: "date Created",
        accessor: "dateCreated", // String-based value accessors!,
        Cell: (props) => <Moment format="YYYY/MM/DD">{props.value}</Moment>, // Custom cell components!
      },
    ];
    //list of all existing users
    return (
      <div>
        <HeaderAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBareAdmin />
            <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <ToolbarAdmin />
              <h2>Users</h2>
              <ReactTable
                data={this.state.data}
                defaultPageSize={this.state.defaultPageSize}
                columns={columns}
                filterable={this.state.filterable}
              />
              {/* <ReactTable
                                columns={columns}
                                data={this.state.data} // should default to []
                                pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
                                loading={this.state.loading}
                                defaultPageSize={this.state.defaultPageSize}
                                manual // informs React Table that you'll be handling sorting and pagination server-side
                                onFetchData={(state, instance) => {
                                    // show the loading overlay
                                    this.setState({ loading: true })
                                    // fetch your data
                                    API.get('user/', {
                                        page: state.page,
                                        pageSize: state.pageSize,
                                        sorted: state.sorted,
                                        filtered: state.filtered
                                    }).then((res) => {
                                        // Update react-table
                                        this.setState({
                                            data: res.data.rows,
                                            pages: res.data.pages,
                                            loading: false
                                        })
                                    })
                                }}
                            /> */}
            </main>
          </div>
        </div>
      </div>
    );
  }
}
