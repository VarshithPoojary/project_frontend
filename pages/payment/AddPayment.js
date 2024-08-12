import Link from 'next/link';
import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Head from 'next/head';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Topbar from '../topbar';
import Header from '../Header';
import axios from 'axios';
import { API } from '../../config';
import { add_payment } from '../../actions/paymentAction';

const PaymentAdd = () => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [values, setValues] = useState({
        admin_treatment_name: '',
        admin_amount: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const adminId = localStorage.getItem('id');
        try {
            const data = { admin_created_by_id: adminId, admin_treatment_name: values.admin_treatment_name, admin_amount: values.admin_amount };
            const res = await add_payment(data); 
            setLoading(false);
            if (res.msg) {
                setMsg(res.msg);
                setTimeout(() => setMsg(''), 1000);
            } else if (res.error) {
                setMsg('An error occurred. Please try again.');
            } else {
                setMsg('Added Successfully');
                setTimeout(() => {
                    setMsg('');
                    Router.push(`/payment/ViewPayment`);
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            setMsg('An unexpected error occurred. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <Fragment>
            <Head>
                <title>Add Treatment</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Add Payment' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="container-viewLocation">
                <div className="center-table">
                   
                    <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                        <div className="card-header">Add Treatment name</div>
                        <div className="card-body" style={{ maxWidth: "400px" }}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="treatment_name" className="col-sm-3 col-form-label">Treatment Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="admin_treatment_name" name="admin_treatment_name" value={values.admin_treatment_name} onChange={handleChange} required />
                                        <small className="text-muted">Enter Treatment Name</small>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="amount" className="col-sm-3 col-form-label">Amount</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="admin_amount" name="admin_amount" value={values.admin_amount} onChange={handleChange} required pattern="[0-9]*" />
                                        <small className="text-muted">Enter a number only</small>
                                    </div>
                                </div>
                                <button className="btn-submit" type="submit">Submit</button>
                                {loading ? (<div className="alert alert-success margin-top-10">Added successfully</div>) : null}
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

export default PaymentAdd;
