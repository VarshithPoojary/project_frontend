import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { DeleteCountryDetails, country_list } from '../../actions/countryAction';


const CountryView = () => {
    const [values, setValues] = useState({
        countrydetail: []
    });
    const [msg, setMsg] = useState('');
    const { countrydetail } = values;

    useEffect(() => {
        loadCountryDetails();
    }, []);

    const loadCountryDetails = () => {
        country_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, countrydetail: data.admin_country_list });
            }
        });
    }

    const handleEdit = (row) => {
        Router.push({
            pathname: '/Location/Editcountry',
            query: {
                _id: row._id,
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
                        setMsg(`Country "${row.admin_country_name}" deleted successfully.`);
                        loadCountryDetails();
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
                <title>Country List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Country List' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Header />
            <Topbar />
            <Header />
            <Topbar />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>COUNTRY LIST</b></h2></center>
                <div className="center-table">
                    <center><h2><b>COUNTRY LIST</b></h2></center>
                    <Link href="/Location/Addcountry">
                        <a className="btn-add-workexperience">
                            Add Country
                        </a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <div className="custom-table">
                        <BootstrapTable data={countrydetail} search>
                            <TableHeaderColumn dataField="sno" width="100" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="admin_country_name" dataAlign="center" dataSort><b>Country Name</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="admin_firstname" dataAlign="center" dataSort><b>Created Admin</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="actions" dataAlign="center" dataFormat={actionFormatter}><b>Actions</b></TableHeaderColumn>
                        </BootstrapTable>
                    </div>
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

export default CountryView;
