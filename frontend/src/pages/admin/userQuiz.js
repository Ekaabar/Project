import React, { Component } from 'react';
import SideBareAdmin from '../../components/SideBareAdmin';
import HeaderAdmin from '../../components/HeaderAdmin';
import ToolbarAdmin from '../../components/ToolbarAdmin';
import '../../components/SideBare.css';
import API from '../../services/api';
import Moment from 'react-moment';
import 'moment-timezone';
import ReactTable from "react-table-v6";


export default class UserQuizAdmin extends Component {

    state = {
        data: [],
        loading: false,
        defaultPageSize: 10,
        pages: 1,
        filterable: true
    }

    componentDidMount() {

        API.get(`user/quiz/`)
            .then(res => {
                const data = res.data;
                console.log(data)
                this.setState({ data });
            });

    }
    editOnClick = () => {
        console.log("open");
    }
    deleteOnClick = () => {
        console.log("deleteTutorial");
    }

    render() {
        const columns = [{
            Header: 'Id',
            accessor: '_id'
        }, {
            Header: 'Name',
            accessor: 'user.name'
        }, {
            Header: 'Quiz',
            accessor: 'quiz.name'
        }, {
            Header: 'Enable',
            accessor: 'enable'
        }, {
            Header: 'Date Created',
            accessor: 'dateCreated',
            Cell: props => <Moment format="YYYY/MM/DD">{props.value}</Moment>
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
                            <h2>User Quiz</h2>
                            <ReactTable
                                defaultPageSize={this.state.defaultPageSize}
                                data={this.state.data}
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

