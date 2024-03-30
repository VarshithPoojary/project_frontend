import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { admin_list } from '../../actions/adminprofileAction';

const AdminView = () => {
    const [adminDetail, setAdminDetail] = useState([]);
    const [values, setValues] = useState({
        admindetail: []
    });

    const [msg, setMsg] = useState('')
    const { admindetail} = values;
    useEffect(() => {
        loadAdminDetails();
    }, []);

    const loadAdminDetails = () => {
        admin_list().then(data => {
              //alert(JSON.stringify(data));
            if (data.error) {
                console.log(data.error);
            } else {
                //alert(data.caretakerLists);
                // console.log(data.caretakerDetailLists);
                setValues({ ...values, admindetail: data.admin_list });
            }
        })
    }

    // const handleEdit = (row) => {
    //     Router.push({
    //         pathname: '/Location/Editcity',
    //         query: {
    //             _id: row._id,

    //         }
    //     })
    // }

    // const handleDelete = (row) => {
    //     let created_by_id = localStorage.getItem('id');
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'You will not be able to recover this country!',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         cancelButtonColor: '#3085d6',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             let query = { "_id": row._id, "created_by_id": created_by_id }
    //             DeleteCityDetails(query).then(data => {
    //                 loadCityDetails();
    //                 setMsg(`State "${row.city_name}" deleted successfully.`);
    //                 setTimeout(() => {
    //                     setMsg('');
    //                 }, 2000); 
    //             });
    //         }
    //     });
    // }

    // const actionFormatter = (cell, row) => {
    //     return (
    //         <div>
    //             <button className="icons-edit" style={{ backgroundColor: "#1fa4b5", borderColor: "#0c9da8" }} onClick={() => handleEdit(row)}>
    //                 <FiEdit  />
    //             </button>
    //             <button className="icons-delete" style={{ backgroundColor: "#1fa4b5", borderColor: "#0c9da8" }} onClick={() => handleDelete(row)}>
    //                 <FiTrash2 />
    //             </button>
    //         </div>
    //     );
    // }

    return (
        <Fragment>
            <Head>
                <title>Admin List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <Topbar/>
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>ADMIN LIST</b></h2></center>
                    {/* <Link href="/Location/Addcity">
                        <a className="btn btn-success mb-3" style={{ backgroundColor: "#1fa4b5", borderColor: "#0c9da8" }}>Add City</a>
                    </Link> */}
                    {/* {msg && <div className="alert alert-success">{msg}</div>} */}
                    <BootstrapTable data={admindetail} search={true}>
                        <TableHeaderColumn dataField="sno" width="100" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                        
                        <TableHeaderColumn dataField="admin_firstname" dataSort><b>Admin Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_mobile_no" dataSort><b>Mobile No.</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_email" dataSort><b>Email</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_type" dataSort><b>Type</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminView;
