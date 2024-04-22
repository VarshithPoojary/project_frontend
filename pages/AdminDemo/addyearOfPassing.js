import Link from 'next/link';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Topbar from '../topbar';
import Header from '../Header';
import axios from 'axios';
import { API } from '../../config';
import { add_yearOfPassing } from '../../actions/YearOfPassingAction';




const YearOfPassingAdd = () => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [values, setValues] = useState({
        admin_year_of_passing: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const adminId = localStorage.getItem('id');
        try {
            const data = { admin_created_by_id: adminId, admin_year_of_passing: values.admin_year_of_passing };
            const res = await add_yearOfPassing(data); 
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
                    Router.push(`/AdminDemo/addyearOfPassing`);
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
        <div id="wrapper">
            <Head>
                <title>Add Year of Passing</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Add Year of Passing' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                                    <div className="card-header">Add Year of Passing here</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="year_of_passing" className="col-sm-3 col-form-label">Year of Passing</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="year_of_passing" name="year_of_passing" value={values.year_of_passing} onChange={handleChange} required pattern="[0-9]*" />
                                                    <small className="text-muted">Enter a number only</small>
                                                </div>
                                            </div>
                                           
                                           <button className="btn btn-primary" type="submit" style={{  background: "#3085d6", borderColor: "#0c9da8" }}>Submit</button>
                                            {loading ? (<div className="alert alert-success margin-top-10">Added successfully</div>) : null}
                                            {msg && (<div className="alert alert-success margin-top-10">{msg}</div>)}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YearOfPassingAdd;
