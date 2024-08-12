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
        })
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
                let query = { "_id": row._id, "admin_deleted_by_id": admin_deleted_by_id }
                DeleteCountryDetails(query).then(data => {
                    loadCountryDetails();
                    setMsg(`Country "${row.admin_country_name}" deleted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 2000);
                });
            }
        });
    }

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
            backgroundColor: 'rgba(160, 212, 104, 0.2)', // light green
            color: '#A0D468'
        };

        const deleteStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(229, 115, 115, 0.2)', // light red
            color: '#E57373'
        };

        return (
            <div>
                <button style={editStyle} onClick={() => handleEdit(row)}>
                    <FaEdit />
                </button>
                <button style={deleteStyle} onClick={() => handleDelete(row)}>
                    <FaTrash />
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
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>COUNTRY LIST</b></h2></center>
                    <Link href="/Location/Addcountry">
                        <a className="btn-add-country">
                            <FaUserPlus style={{ marginRight: '8px' }} />
                            Add Country
                        </a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <div className="custom-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Country Name</th>
                                    <th>Created Admin</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countrydetail.map((country, index) => (
                                    <tr key={country._id}>
                                        <td>{index + 1}</td>
                                        <td>{country.admin_country_name}</td>
                                        <td>{country.admin_firstname}</td>
                                        <td>{actionFormatter(null, country)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container-viewLocation {
                    padding: 20px;
                    margin-left: 50px;
                    margin-top: 10px;
                }
                .center-table {
                    margin: auto;
                    width: 100%;
                }
                .custom-table {
                    width: 50%;
                    border-collapse: collapse;
                    margin: 50px 0;
                    font-size: 1em;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }
                .custom-table th,
                .custom-table td {
                    padding: 15px;
                    text-align: left;
                }
                .custom-table thead tr {
                    background-color: #B4A3E1;
                    color: #ffffff;
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
                .btn-add-country {
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
                .btn-add-country:hover {
                    background-color: #9575CD;
                    border-color: #6F42C1;
                    color: white;
                }
            `}</style>
        </Fragment>
    );
};

export default CountryView;
