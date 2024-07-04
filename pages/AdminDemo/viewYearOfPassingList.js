import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { yearOfPassing_delete, YearOfPassing_List } from '../../actions/YearOfPassingAction';

const YearOfPassingView = () => {
    const [values, setValues] = useState({
        yearOfPassingdetail: []
    });
    const [msg, setMsg] = useState('');
    const { yearOfPassingdetail } = values;

    useEffect(() => {
        loadYearOfPassingDetails();
    }, []);

    const loadYearOfPassingDetails = () => {
        YearOfPassing_List().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, yearOfPassingdetail: data.admin_yearofpassing_list });
            }
        });
    }

    const handleEdit = (row) => {
        Router.push({
            pathname: '/AdminDemo/EditYearOfPassing',
            query: {
                _id: row._id,
            }
        });
    }

    const handleDelete = (row) => {
        let admin_deleted_by_id = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this year of passing!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let query = { "_id": row._id, "admin_deleted_by_id": admin_deleted_by_id };
                yearOfPassing_delete(query).then(data => {
                    loadYearOfPassingDetails();
                    setMsg(`Year of passing "${row.admin_year_of_passing}" deleted successfully.`);
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
            color: '#F',
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
            color: '#F',
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
                <title>Year Of Passing List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Year Of Passing List' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Header />
            <Topbar />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>Year Of Passing List</b></h2></center>
                    <Link href="/AdminDemo/addyearOfPassing">
                        <a className="btn-add-workexperience">
                            Add Year Of Passing
                        </a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <div className="custom-table">
                        <BootstrapTable data={yearOfPassingdetail} search>
                            <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="admin_year_of_passing" dataAlign="center" dataSort>Year Of Passing</TableHeaderColumn>
                            <TableHeaderColumn dataField="actions" dataAlign="center" dataFormat={actionFormatter}>Actions</TableHeaderColumn>
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
                    padding: 15px 15px;
                    text-align: left;
                    border: 2px solid #000;
                }
                .custom-table thead tr {
                    background-color: #B4A3E1;
                    color: #ffffff;
                    text-align: left;
                    border-bottom: 3px solid #000000;
                }
                .custom-table tbody tr {
                    border-bottom: 2px solid #000000;
                }
                .custom-table tbody tr:nth-of-type(even) {
                    background-color: #f3f3f3;
                }
                .custom-table tbody tr:last-of-type {
                    border-bottom: 3px solid #000000;
                }
                .btn-add-workexperience {
                    display: inline-flex;
                    align-items: center;
                    margin-bottom: -50px;
                    padding: 20px 20px;
                    font-size: 16px;
                    font-weight: bold;
                    color: white;
                    background-color: #B4A3E1;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    transition: background-color 0.3s;
                }
                .btn-add-workexperience:hover {
                    background-color: #9575CD;
                }
                .alert-success {
                    color: #3c763d;
                    background-color: #dff0d8;
                    border-color: #d6e9c6;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
            `}</style>
        </Fragment>
    );
};

export default YearOfPassingView;
