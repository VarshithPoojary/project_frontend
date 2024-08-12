import Link from 'next/link';
import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Head from 'next/head';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Topbar from '../topbar';
import Header from '../Header';
import { country_list } from '../../actions/countryAction';
import { add_state } from '../../actions/stateAction';

const cookies = new Cookies();

const StateAdd = () => {
    const [msg, setMsg] = useState('');
    const [values, setValues] = useState({
        country_list: [],
        admin_country_id: '',
        admin_state_name: '',
        loading: false,
    });

    const { admin_country_id, admin_state_name, loading } = values;

    useEffect(() => {
        loadCountryNames();
    }, []);

    const loadCountryNames = () => {
        country_list().then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                setValues({ ...values, country_list: data.admin_country_list });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const admin_created_by_id = localStorage.getItem('id');
        const state_data = { admin_country_id, admin_state_name, admin_created_by_id };

        add_state(state_data).then(res => {
            if (res.msg) {
                setMsg(res.msg);
                setTimeout(() => {
                    setMsg('');
                }, 1000);
            } else if (res.error) {
                setMsg('Error adding state. Please try again.');
                setTimeout(() => {
                    setMsg('');
                }, 1000);
            } else {
                setValues({ ...values, loading: true });
                setTimeout(() => {
                    setValues({ ...values, loading: false });
                    Router.push('/Location/viewState');
                }, 1000);
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    return (
        <Fragment>
            <Head>
                <title>Add State</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Add State' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>Add State</b></h2></center>
                    <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                        <div className="card-header">Add State here</div>
                        <div className="card-body" style={{ maxWidth: "400px" }}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="admin_country_id" className="col-sm-3 col-form-label">Country Name</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" id="admin_country_id" name="admin_country_id" onChange={handleChange('admin_country_id')} required>
                                            <option value="">Select Country</option>
                                            {values.country_list.map(country => (
                                                <option key={country._id} value={country._id}>
                                                    {country.admin_country_name}
                                                </option>
                                            ))}
                                        </select>
                                        <small className="text-muted">Select Country</small>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="admin_state_name" className="col-sm-3 col-form-label">State Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="admin_state_name" name="admin_state_name" value={admin_state_name} onChange={handleChange('admin_state_name')} required />
                                        <small className="text-muted">Enter State Name</small>
                                    </div>
                                </div>
                                <button className="btn-submit" type="submit">Submit</button>
                                {loading && (<div className="alert alert-success margin-top-10">Added successfully</div>)}
                                {msg && (<div className="alert alert-success margin-top-10">{msg}</div>)}
                            </form>
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
                .card {
                    border-radius: 5px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }
                .card-header {
                    background-color: #B4A3E1;
                    color: white;
                    font-size: 1.25em;
                    font-weight: bold;
                    text-align: center;
                }
                .card-body {
                    padding: 20px;
                    background-color: white;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                .form-control {
                    border: 2px solid #B4A3E1;
                    border-radius: 4px;
                    padding: 10px;
                    font-size: 1em;
                    width: 100%;
                }
                .form-control:focus {
                    border-color: #9575CD;
                    box-shadow: none;
                }
                .btn-submit {
                    display: inline-flex;
                    align-items: center;
                    margin-bottom: 10px;
                    padding: 10px 20px;
                    font-size: 16px;
                    font-weight: bold;
                    color: white;
                    background-color: #B4A3E1;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    transition: background-color 0.3s;
                    cursor: pointer;
                }
                .btn-submit:hover {
                    background-color: #9575CD;
                }
                .alert-success {
                    color: #3c763d;
                    background-color: #dff0d8;
                    border-color: #d6e9c6;
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                .margin-top-10 {
                    margin-top: 10px;
                }
            `}</style>
        </Fragment>
    );
};

export default StateAdd;
