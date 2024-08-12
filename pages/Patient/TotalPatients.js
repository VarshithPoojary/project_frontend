import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import Header from '../Header';
import Topbar from '../topbar';

const TotalPatientView = () => {
    const [patientdetail] = useState([]);

    const actionFormatter = (cell, row) => {
        return (
            <div>
                <button className="icons-view" style={{ backgroundColor: "#3085d6", borderColor: "#3085d6", width: "40px" }}>
                    <FiEye />
                </button>
                <button className="icons-edit" style={{ backgroundColor: "#3085d6", borderColor: "#3085d6", width: "40px", marginLeft: "10%" }}>
                    <FiEdit />
                </button>
                <button className="icons-delete" style={{ backgroundColor: "rgb(225, 76, 76)", borderColor: "rgb(225, 76, 76)", width: "40px", marginLeft: "10%" }}>
                    <FiTrash2 />
                </button>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>Total Patient</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Topbar />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>TOTAL PATIENTS</b></h2></center>
                    <BootstrapTable data={patientdetail} search={true}>
                        <TableHeaderColumn dataField="sno" width="70" dataAlign="center"><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_unique_number" width="150" dataAlign="center"><b>Unique Number</b></TableHeaderColumn>
                        <TableHeaderColumn dataField='patient_profile_image' width="90" dataAlign="center" dataFormat={(cell, row) => <img src={row.patient_profile_image} alt="Profile" height="50px" width="50px" style={{ borderRadius: "50%" }} />} >Profile</TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_first_name" width="150" dataAlign="center"><b>FirstName</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_phone_number" width="150" dataAlign="center"><b>Mobile No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_gender" dataAlign="center"><b>Gender</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="actions" width='200px' dataAlign="center" dataFormat={actionFormatter}><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </Fragment>
    );
};

export default TotalPatientView;
