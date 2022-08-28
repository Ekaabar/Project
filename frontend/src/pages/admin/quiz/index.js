import React, { Component } from 'react';
import SideBareAdmin from '../../../components/SideBareAdmin';
import HeaderAdmin from '../../../components/HeaderAdmin';
import ToolbarAdmin from '../../../components/ToolbarAdmin';
import '../../../components/SideBare.css';
import API from '../../../services/api';
import Moment from 'react-moment';
import 'moment-timezone';
import ReactTable from "react-table-v6";
import { Link } from 'react-router-dom';


export default class IndexQuizAdmin extends Component {

    state = {
        data: [],
        loading: false,
        defaultPageSize: 10,
        pages: 1,
        filterable: true
    }

    componentDidMount() {

        API.get(`quiz/`)
            .then(res => {
                const data = res.data;
                console.log(data)
                this.setState({ data });
            });

    }
    editOnClick = () => {
        console.log("open");
    }
    deleteOnClick = (row) => {
        console.log(row)
        window.confirm("Veuillez vous supprimer ce produit d'id :" + row._id);

        API.delete(`quiz/` + row._id).then(res => {
            API.get(`quiz/`)
                .then(res => {
                    const data = res.data;
                    this.setState({ data });
                });
        }).catch(error => {
            this.setState({ error: "Un problème est survenu. Veuillez réessayer plus tard." });
        });
    }

    render() {
        const columns = [{
            Header: 'Id',
            accessor: '_id'
        }, {
            Header: 'Name',
            accessor: 'name'
        }, {
            Header: 'Description',
            accessor: 'description'
        }, {
            Header: 'Enable',
            accessor: 'enable',
            Cell: props => <span>{props.value ? "Enable" : "Disable"}</span>
        }, {
            Header: 'Date Created',
            accessor: 'dateCreated',
            Cell: props => <Moment format="YYYY/MM/DD">{props.value}</Moment>
        }, {
            Header: "Actions",
            accessor: "actions",
            Cell: (props) => {

                return (
                    <div className="btn-group text-center" role="group">
                        <Link type="button" className="btn btn-outline-primary" to={"/admin/quiz/" + props.row._id + "/view/"}  >
                            <i className="far fa-eye action mr-2"></i>
                        </Link>

                        <Link type="button" className="btn btn-outline-primary" to={"/admin/quiz/" + props.row._id}  >
                            <i className="far fa-edit action mr-2"></i>
                        </Link>
                         <button type="button" className="btn btn-outline-danger" onClick={(row) => this.deleteOnClick(props.row)}>
                            <i className="fas fa-trash action"></i>
                        </button>
                    </div>
                );
            },
        }
        ];

        return (
            <div>
                <HeaderAdmin />
                <div className="container-fluid">
                    <div className="row">
                        <SideBareAdmin />
                        <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <ToolbarAdmin />
                            <h2>Quiz <Link type="button" className="btn-danger btn-sm float-end small" to="/admin/quiz/new">
                                <i className="fas fa-plus action mr-2"></i>
                            </Link>
                            </h2>
                            <ReactTable
                                defaultPageSize={this.state.defaultPageSize}
                                data={this.state.data}
                                resolveData={data => data.map(row => row)}
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

