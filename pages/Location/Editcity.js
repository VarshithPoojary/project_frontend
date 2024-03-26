import Link from 'next/link';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import Sidebar from '../sidebar';
//import Topbar from '../topbar';
// import { AddCaretaker, CaretakerList, EditCaretaker, DeleteCaretaker } from '../../actions/caretakerAction';
// import { UserList } from '../../actions/userAction';
//import { add_country } from '../../actions/countryAction';
// import { areaListById, stateList, countryList, stateListById } from '../../actions/locationAction';
import axios from 'axios';
import { API } from '../../config';


const cookies = new Cookies();

const CityEdit = () => {
    const [values, setValues] = useState({
        country_code:'',
        country_name:''

    });

    const [msg, setmsg] = useState('');
    const { country_code, country_name,loading} = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        var country_data={country_code,country_name}

        add_country(country_data).then(res => {

            if (res.error) {
                setValues({ ...values });
            } else {
                setTimeout(() => {
                    setValues({ ...values, loading: true })
                });
                setTimeout(() => {
                    setValues({ ...values, loading: false })
                    Router.push(`/country/viewCountry`);
                }, 1000);

            }
        });
    };
    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
        
    };

    return (
        <div id="wrapper">
            {/* <Head>
                <title>Country Add</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Country' />
                <meta property="og:image" content="/icons/app_logo.jpeg" />
                <meta itemprop="image" content="/icons/app_logo.jpeg"></meta>
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
            </Head>
            <Topbar />
            <Sidebar /> */}
            <div className="content-page">
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12"  >
                            <div className="card mb-4" style={{ width: "600px", marginTop: "40px" }}>
                                <div className="card-header">Edit City here</div>
                                <div className="card-body" style={{ maxWidth: "400px" }}>
                                    <form onSubmit={handleSubmit}>
                                    <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="text">Country Id</label>
                                                <input className="form-control" id="country_id" type="number" placeholder="Enter Country Id" name="country_id" onChange={handleChange('country_id')} required style={{ width: "105%" }} />
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="text">State Id</label>
                                                <input className="form-control" id="state_id" type="number" placeholder="Enter State Id" name="state_id" onChange={handleChange('state_id')} required style={{ width: "105%" }} />
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="country_id">City Name</label>
                                            <select className="form-control" id="country_id" name="country_id" onChange={handleChange('country_id')} required style={{ width: "105%" }}>
                                                <option value="">Select City</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="number">Pincode</label>
                                                <input className="form-control" id="pincode" type="number" placeholder="Enter Pincode" name="pincode" onChange={handleChange('pincode')} required style={{ width: "105%" }} />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: "#87CEFA", borderColor: "#87CEFA" }}>Submit</button>
                                        {loading ? (<div className="alert alert-success margin-top-10">Edited Successfully</div>) : null}
                                    </form>
                                </div>
                            </div>
                            {msg ? (<div className="alert alert-success margin-top-10"> {msg}</div>) : null}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        
    );
};
export default CityEdit;