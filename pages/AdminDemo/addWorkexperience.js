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
import { add_workexperience } from '../../actions/workexperienceAction';

const WorkexperienceAdd = () => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [values, setValues] = useState({
        admin_work_experience: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const adminId = localStorage.getItem('id');
        try {
            const data = { admin_created_by_id: adminId, admin_work_experience: values.admin_work_experience };
            const res = await add_workexperience(data);
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
                    Router.push(`/dashboard`);
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
      <title>Add Workexperience</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="title" content='Add Workexperience' />
      <link rel="icon" href="/images/title_logo.png" />
    </Head>
    <Topbar/>
    <Header/>
    <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                                    <div className="card-header" style={{ background: "#D3C8F1" ,color:"black"}}>Add Work Experience  here</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="admin_work_experience" className="col-sm-3 col-form-label">Years of Experience</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="admin_work_experience" name="admin_work_experience" value={values.admin_work_experience} onChange={handleChange} required pattern="[0-9]*" />
                                                    <small className="text-muted">Enter a number only</small>
                                                </div>
                                            </div>
                                            {/* <div className="form-group row">
                                                <div className="col-sm-9 offset-sm-3">
                                                    <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
                                                </div>
                                            </div> */}
                                           
                                            {/* {msg && <div className={`alert ${res.error ? 'alert-danger' : 'alert-success'}`}>{msg}</div>} */}
                                            <button className="btn btn-primary" type="submit" style={{  background: "#6F42C1", borderColor: "#9575CD" }}>Submit</button>
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

export default WorkexperienceAdd;
