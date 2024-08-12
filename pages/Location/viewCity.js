import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { city_list, DeleteCityDetails } from '../../actions/cityAction';

const CityView = () => {
    const [values, setValues] = useState({ citydetail: [] });
    const [msg, setMsg] = useState('');
    const { citydetail } = values;

    useEffect(() => {
        loadCityDetails();
    }, []);

    const loadCityDetails = async () => {
        try {
            const data = await city_list();
            if (!data.error) {
                setValues({ citydetail: data.city_list });
            } else {
                console.error(data.error);
                setMsg('Failed to load city details.');
            }
        } catch (error) {
            console.error(error);
            setMsg('An error occurred.');
        }
    };

    const handleEdit = (row) => {
        Router.push({
            pathname: '/Location/Editcity',
            query: { _id: row._id }
        });
    };

    const handleDelete = (row) => {
        const admin_deleted_by_id = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this city!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const query = { _id: row._id, admin_deleted_by_id };
                    const data = await DeleteCityDetails(query);
                    if (data.error) {
                        setMsg(data.error);
                    } else {
                        setMsg(`City "${row.city_name}" deleted successfully.`);
                        loadCityDetails();
                    }
                } catch (error) {
                    setMsg('Failed to delete city.');
                } finally {
                    setTimeout(() => setMsg(''), 2000);
                }
            }
        });
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

        const editStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(160, 212, 104, 0.4)',
            color: '#000',
        };

        const deleteStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(229, 115, 115, 0.5)',
            color: '#000',
        };

        return (
            <div>
                <button style={editStyle} onClick={() => handleEdit(row)} aria-label={`Edit ${row.city_name}`}>
                    <FiEdit />
                </button>
                <button style={deleteStyle} onClick={() => handleDelete(row)} aria-label={`Delete ${row.city_name}`}>
                    <FiTrash2 />
                </button>
            </div>
        );
    };

    return (
        <Fragment>
            <Head>
                <title>City List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='City List' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>

            <Header />
            <Topbar />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>CITY LIST</b></h2></center>
                    <Link href="/Location/Addcity">
                        <a className="btn-add-city">
                            Add City
                        </a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <div className="custom-table">
                        <BootstrapTable data={citydetail} search>
                            <TableHeaderColumn dataField="sno" width="100" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="city_name" dataAlign="center" dataSort><b>City Name</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="state_name" dataAlign="center" dataSort><b>State Name</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="country_name" dataAlign="center" dataSort><b>Country Name</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="admin_pincode" dataAlign="center" dataSort><b>Pincode</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="admin_firstname" dataAlign="center" dataSort><b>Created Admin</b></TableHeaderColumn>
                            <TableHeaderColumn dataField="actions" dataAlign="center" dataFormat={actionFormatter}><b>Actions</b></TableHeaderColumn>
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
                    width: 95%; /* Increased width for centering the table */
                }
                .custom-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 50px 0;
                    font-size: 1.1em; /* Increased font size for better readability */
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }
                .custom-table th,
                .custom-table td {
                    padding: 20px 15px; /* Increased padding for larger cells */
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
                .btn-add-city {
                    display: inline-flex;
                    align-items: center;
                    margin-bottom: -50px;
                    padding: 20px 20px;
                    font-size: 16px;
                    font-weight: bold;
                    color: white;
                    background-color:  #B4A3E1; 
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    transition: background-color 0.3s;
                    width: 20%;
                    text-align: center;
                }
                .btn-add-city:hover {
                    background-color: #B88BDF; /* Darker lavender for hover effect */
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

export default CityView;
