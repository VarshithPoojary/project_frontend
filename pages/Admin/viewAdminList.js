import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { admin_list, DeleteAdminDetails } from '../../actions/adminprofileAction';
import moment from 'moment';

const AdminView = () => {
    const [adminDetail, setAdminDetail] = useState([]);
    const [values, setValues] = useState({
        admin_profile_image:'',
        admindetail: []
    });

    const defaultProfileImage = '/images/userLogo.png';
    const [msg, setMsg] = useState('');
    const { admin_profile_image, admindetail } = values;

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
    };

    const handleView = (row) => {
        Router.push({
            pathname: '/AdminProfile',
            query: {
                _id: row._id,
             adminProfile: JSON.stringify(row),
             
            }
        });
    };
    

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
                    pathname: '/Adminpasswordedit',
                    query: {
                        _id: row._id,
                    }
                });            
            } else {
                Router.push({
                    pathname: '/Admin/viewAdminList',
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
                let query = { "_id": row._id, "admin_deleted_by_id": admin_deleted_by_id };
                DeleteAdminDetails(query).then(data => {
                    loadAdminDetails();
                    setMsg(`Admin "${row.admin_firstname}" deleted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 2000); 
                });
            }
        });
    };

    const displayImage = (cell, row) => {
        return (
            <img
                src={row.admin_profile_image ? row.admin_profile_image : defaultProfileImage}
                alt="Profile Image"
                height="50px"
                width="50px"
                style={{ borderRadius: "50%" }}
            />
        );
    };

    const actionFormatter = (cell, row) => {
        const buttonStyle = {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '10px',
            transition: 'background-color 0.3s'
        };

        const viewStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(90, 155, 212, 0.2)', 
            color: '#5A9BD4'
        };

        const editStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(160, 212, 104, 0.2)', 
            color: '#A0D468'
        };

        const deleteStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(229, 115, 115, 0.2)', 
            color: '#E57373'
        };

        return (
            <div>
                <button style={viewStyle} onClick={() => handleView(row)}>
                    <FiEye />
                </button>
                <button style={editStyle} onClick={() => handleEdit(row)}>
                    <FiEdit />
                </button>
                <button style={deleteStyle} onClick={() => handleDelete(row)}>
                    <FiTrash2 />
                </button>
            </div>
        );
    };

    return (
        <Fragment>
            <Head>
                <title>Admin List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <Topbar/>
            <div className="container-admin-list">
                <div className="center-table">
                    <center><h2><b>ADMIN LIST</b></h2></center>
                    <Link href="/Admin/AddAdmin">
                        <a className="btn-add-admin">
                            <FiEdit style={{ marginRight: '8px' }} />
                            Add Admin
                        </a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <div className="custom-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>Mobile No.</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admindetail.map((admin, index) => (
                                    <tr key={admin._id}>
                                        <td>{index + 1}</td>
                                        <td>{displayImage(null, admin)}</td>
                                        <td>{admin.admin_firstname}</td>
                                        <td>{admin.admin_mobile_no}</td>
                                        <td>{admin.admin_email}</td>
                                        <td>{admin.admin_type}</td>
                                        <td>{actionFormatter(null, admin)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container-admin-list {
                    padding: 20px;
                    margin: 0 auto;
                    margin-top: 100px;
                    width: 65%;
                }
                .center-table {
                    margin: auto;
                    width: 100%;
                }
                .custom-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 50px 0;
                    font-size: 1em;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }
                .custom-table th,
                .custom-table td {
                    padding: 15px 15px;
                    text-align: left;
                }
                .custom-table thead tr {
                    background-color: #B4A3E1;
                    color: #ffffff;
                    text-align: left;
                }
                .custom-table tbody tr {
                    border-bottom: 1px solid #dddddd;
                }
                .custom-table tbody tr:nth-of-type(even) {
                    background-color: #f3f3f3;
                }
                .custom-table tbody tr:last-of-type {
                    border-bottom: 2px solid #009879;
                }
                .alert {
                    margin-top: 20px;
                }
                .btn-add-admin {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    border: 1px solid #9575CD;
                    color: #6F42C1;
                    padding: 0.375rem 0.75rem;
                    font-size: 15px;
                    border-radius: 10%;
                    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                    text-decoration: none;
                }
                .btn-add-admin:hover {
                    background-color: #9575CD;
                    border-color: #6F42C1;
                    color: white;
                }
                    /* Media Queries */
    @media (max-width: 1024px) {
        .container-admin-list {
            width: 80%;
        }
        .custom-table th, .custom-table td {
            padding: 10px;
            font-size: 0.9em;
        }
    }
    @media (max-width: 768px) {
        .container-admin-list {
            width: 90%;
            padding: 10px;
        }
        .btn-add-admin {
            padding: 0.3rem 0.6rem;
            font-size: 0.85em;
        }
    }
    @media (max-width: 480px) {
        .container-admin-list {
            width: 100%;
            margin-top: 50px;
            padding: 10px 5px;
        }
        .custom-table th, .custom-table td {
            font-size: 0.8em;
            padding: 8px;
        }
        .btn-add-admin {
            padding: 0.25rem 0.5rem;
            font-size: 0.75em;
        }
        .custom-table thead {
            display: none;
        }
        .custom-table, .custom-table tbody, .custom-table tr, .custom-table td {
            display: block;
            width: 100%;
        }
        .custom-table tr {
            margin-bottom: 15px;
        }
        .custom-table td {
            text-align: right;
            padding-left: 50%;
            position: relative;
        }
        .custom-table td:before {
            content: attr(data-label);
            position: absolute;
            left: 0;
            width: 50%;
            padding-left: 15px;
            font-weight: bold;
            text-align: left;
        }
    }
            `}</style>
        </Fragment>
    );
};

export default AdminView;
