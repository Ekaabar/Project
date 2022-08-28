import React, { Component } from "react";
import SideBareAdmin from "../../components/SideBareAdmin";
import HeaderAdmin from "../../components/HeaderAdmin";
import ToolbarAdmin from "../../components/ToolbarAdmin";
import "../../components/SideBare.css";
import { getAdmin } from "../../services/Common";

export default class HomeAdmin extends Component {
  /*     componentWillMount() {
            document.querySelector('body').id = 'homeAdmin'
        }
     */

  render() {
    const admin = getAdmin();

    return (
      <div>
        <HeaderAdmin />
        <div className="container-fluid">
          <div className="row">
            <SideBareAdmin />
            <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <ToolbarAdmin />
              <h2>Profil : {admin.email}</h2>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
