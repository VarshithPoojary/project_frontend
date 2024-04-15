import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { admin_list,DeleteAdminDetails } from '../../actions/adminprofileAction';

const AdminView = () => {
    const [adminDetail, setAdminDetail] = useState([]);
    const [values, setValues] = useState({
        admin_profile_image:'',
        admindetail: []
    });

    const defaultProfileImage = '/images/userLogo.png';
    const [msg, setMsg] = useState('')
    const {admin_profile_image, admindetail} = values;
    useEffect(() => {
        loadAdminDetails();
    }, []);

    const loadAdminDetails = () => {
        admin_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                const loggedInAdminId = localStorage.getItem('id');
                const filteredAdmins = data.admin_list.filter(admin => admin._id !== loggedInAdminId);
                setValues({
                    ...values,
                    admin_profile_image: data.admin_list[0].admin_profile_image || defaultProfileImage,
                    admindetail: filteredAdmins
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
                    pathname: '/Admin/EditAdmin',
                    query: {
                        _id: row._id,
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Router.push({
                    pathname: '/Admin/EditAdminPassword',
                    query: {
                        _id: row._id,
                    }
                });            
            } else {
                Router.push({
                    pathname: '/Admin/viewAdminList' ,
                    query: {
                        _id: row._id,
                    }
                });
            }
        });
    };
    


    const handleDelete = (row) => {
        const admin_deleted_by_id = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this admin!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                let query = { "_id": row._id, "admin_deleted_by_id": admin_deleted_by_id }
                DeleteAdminDetails(query).then(data => {
                    loadAdminDetails();
                setMsg(`Admin "${row.admin_firstname}" deleted successfully.`);
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
                src={row.admin_profile_image ? row.admin_profile_image : defaultProfileImage}
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
                <button className="icons-edit"  style={{ backgroundColor: "#7ebce9", borderColor: "#1e7bb5",width:"40px"}}  onClick={() => handleEdit(row)}>
                    <FiEdit  />
                </button>
                <button className="icons-delete"  style={{ backgroundColor: "#7ebce9", borderColor: "#1e7bb5",width:"40px",marginLeft:"10%" }} onClick={() => handleDelete(row)}>
                    <FiTrash2 />
                </button>
            </div>
        );
    }

    

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
                    <Link href="/Admin/AddAdmin">
                        <a className="btn btn-success mb-3"  style={{  background: "linear-gradient(to bottom, #7ebce9, #1e7bb5)",borderColor: "#0c9da8", width:'20%' }}>Add Admin</a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    
                    <BootstrapTable data={admindetail} search={true}>
                        <TableHeaderColumn dataField="sno" width="70" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='admin_profile_image'  dataAlign="center" editable={false} dataFormat={displayImage} dataSort>Profile</TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_firstname" dataAlign="center" dataSort><b>Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_mobile_no" dataAlign="center" dataSort><b>Mobile No.</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_email" width='150px' dataAlign="center" dataSort><b>Email</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_type" width='100px' dataAlign="center" dataSort><b>Type</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="actions" width='130px' dataAlign="center" dataFormat={actionFormatter}  ><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminView;
