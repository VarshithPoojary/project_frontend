import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { patient_list,DeletePatientDetails } from '../../actions/patientprofileAction';

const PatientView = () => {
    const [patientDetail, setPatientDetail] = useState([]);
    const [values, setValues] = useState({
        patient_profile:'',
        patientdetail: []
    });

    const defaultProfileImage = '/images/userLogo.png';
    const [msg, setMsg] = useState('')
    const {patient_profile, patientdetail} = values;
    useEffect(() => {
        loadPatientDetails();
    }, []);

    const loadPatientDetails = () => {
        patient_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                const loggedInPatientId = localStorage.getItem('id');
                const filteredPatients = data.patient_list.filter(patient => patient._id !== loggedInPatientId);
                setValues({
                    ...values,
                    patient_profile: data.patient_list[0].patient_profile || defaultProfileImage,
                    patientdetail: filteredPatients
                });
            }
        });
    }

    const handleEdit = (row) => {
        Swal.fire({
            title: 'Choose Edit Option',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Profile Edit',
            cancelButtonText: 'Password Edit',
            showCloseButton: true,
            focusCancel: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Router.push({
                    pathname: '/Patient/EditPatient',
                    query: {
                        _id: row._id,
                    }
                });
                    
            } else {
                Router.push({
                    pathname: '/Patient/ViewPatientList' ,
                    query: {
                        _id: row._id,
                    }
                });
            }
        });
    };
    


    const handleDelete = (row) => {
        const patient_deleted_by_id = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this patient!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                let query = { "_id": row._id, "patient_deleted_by_id": patient_deleted_by_id }
                DeletePatientDetails(query).then(data => {
                    loadPatientDetails();
                setMsg(`Patient "${row.patient_first_name}" deleted successfully.`);
                setTimeout(() => {
                    setMsg('');
                }, 2000); 
            });
         }
        });
    }

    function displayImage(cell, row) {
        return (
            <img
                src={row.patient_profile ? row.patient_profile : defaultProfileImage}
                alt="Profile Image"
                height="50px"
                width="50px"
                style={{ borderRadius: "50%" }}
            />
        );
    }
    

    const actionFormatter = (cell, row) => {
        return (
            <div>
                <button className="icons-edit"  style={{ backgroundColor: "#3085d6", borderColor: "#3085d6",width:"40px"}}  onClick={() => handleEdit(row)}>
                    <FiEdit  />
                </button>
                <button className="icons-delete"  style={{ backgroundColor: "rgb(225, 76, 76)", borderColor: "rgb(225, 76, 76)",width:"40px",marginLeft:"10%" }} onClick={() => handleDelete(row)}>
                    <FiTrash2 />
                </button>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>Patient List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <Topbar/>
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>PATIENT LIST</b></h2></center>
                    <Link href="/Patient/AddPatient">
                        <a className="btn btn-success mb-3"  style={{  background: "#3085d6",borderColor: "#0c9da8", width:'20%' }}>Add Patient</a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    
                    <BootstrapTable data={patientdetail} search={true}>
                        <TableHeaderColumn dataField="sno" width="70" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_unique_number" dataAlign="center" dataSort><b>Unique Number</b></TableHeaderColumn>
                        <TableHeaderColumn dataField='patient_profile'  dataAlign="center" editable={false} dataFormat={displayImage} dataSort>Profile</TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_first_name" dataAlign="center" dataSort><b>FirstName</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_phone_number" dataAlign="center" dataSort><b>Mobile No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_gender" dataAlign="center" dataSort><b>Gender</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_email" width='150px' dataAlign="center" dataSort><b>Email</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_register_status" width='150px' dataAlign="center" dataSort><b>Status</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="actions" width='130px' dataAlign="center" dataFormat={actionFormatter}  ><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </Fragment>
    );
};

export default PatientView;
