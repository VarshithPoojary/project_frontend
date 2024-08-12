import React, { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Header from '../Header';
import Topbar from '../topbar';
import { contactDetail_list } from '../../actions/ContactUsAction';

const ContactUsView = () => {
    const [values, setValues] = useState({
        contactusdetail: []
    });
    const [msg, setMsg] = useState('');
    const { contactusdetail } = values;

    useEffect(() => {
        loadContactusDetails();
    }, []);

    const loadContactusDetails = () => {
        contactDetail_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, contactusdetail: data.contactDetail_list });
            }
        });
    }

    const handleDelete = (row) => {
        let admin_deleted_by_id = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this country!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let query = { "_id": row._id, "admin_deleted_by_id": admin_deleted_by_id };
                DeleteCountryDetails(query).then(data => {
                    if (data.error) {
                        setMsg(data.error);
                    } else if (data.message) {
                        setMsg(data.message);
                    } else {
                        setMsg(`Country "${row.user_name}" deleted successfully.`);
                        contactusdetail();
                    }
                    setTimeout(() => {
                        setMsg('');
                    }, 2000);
                });
            }
        });
    }

    const actionFormatter = (cell, row) => {
        const editStyle = {
            backgroundColor: 'rgba(160, 212, 104, 0.4)', 
            color: '#000',
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

        const deleteStyle = {
            backgroundColor: 'rgba(229, 115, 115, 0.5)', 
            color: '#000',
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

        return (
            <div>
                <button style={editStyle} onClick={() => handleEdit(row)}>
                    <FiEdit />
                </button>
                <button style={deleteStyle} onClick={() => handleDelete(row)}>
                    <FiTrash2 />
                </button>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>Contact Us List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Country List' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Header />
            <Topbar />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>Contact Us List</b></h2></center>
                    
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <div className="custom-table">
                        <BootstrapTable data={contactusdetail} search>
                            <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="user_name" dataAlign="center" dataSort><b>Name</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="user_email" dataAlign="center" dataSort><b>Email</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="user_phone" dataAlign="center" dataSort><b>Phone number</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="user_message" dataAlign="center" dataSort dataFormat={cell => <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{cell}</div>}><b>Message</b></TableHeaderColumn>
                            <TableHeaderColumn dataFormat={actionFormatter} dataAlign="center"><b>Actions</b></TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container-viewLocation {
                    padding: 20px;
                    margin-left: -50px;
                    margin-top: 10px;
                }
                .center-table {
                    margin: auto;
                    width: 90%;
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
                    padding: 15px;
                    text-align: left;
                    border: 2px solid #000;
                }
                .custom-table thead tr {
                    background-color: #E6E6FA;
                    color: #4B0082;
                    text-align: left;
                    border-bottom: 3px solid #4B0082;
                }
                .custom-table tbody tr {
                    border-bottom: 2px solid #4B0082;
                }
                .custom-table tbody tr:nth-of-type(even) {
                    background-color: #F3F3FF;
                }
                .custom-table tbody tr:last-of-type {
                    border-bottom: 3px solid #4B0082;
                }
                .alert-success {
                    color: #3c763d;
                    background-color: #dff0d8;
                    border-color: #d6e9c6;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .card-header {
                    background-color: #E6E6FA;
                    color: #4B0082;
                }
            `}</style>
        </Fragment>
    );
};

export default ContactUsView;
