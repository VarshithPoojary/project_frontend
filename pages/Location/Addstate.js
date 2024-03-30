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
import { loadCountryDetails } from '../../actions/countryAction';
import { add_state } from '../../actions/stateAction';

// import { areaListById, stateList, countryList, stateListById } from '../../actions/locationAction';
import axios from 'axios';
import { API } from '../../config';


const cookies = new Cookies();

const StateAdd = () => {
    //const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    //const [selectedState, setSelectedState] = useState('');
    const [values, setValues] = useState({
        
        country_list:[],
        admin_country_id:'',
        admin_state_name:''

    });
    
    const { admin_country_id,admin_state_name,loading } = values;

     useEffect(() =>{
        loadCountryNames() ;
    },[]);


    
    const loadCountryNames = () =>{
     
        loadCountryDetails().then(data => {
             
            if (data.error) {
                console.log(data.error);
            } else {
                 
             
                setValues({ ...values, country_list: data.admin_country_list });
            }
        })
    
}

const handleSubmit = (e) => {
    e.preventDefault();
    const admin_created_by_id = localStorage.getItem('id');

    
    var state_data={admin_country_id,admin_state_name,admin_created_by_id }

    add_state(state_data).then(res => {

        if (res.error) {
            setValues({ ...values });
            setMsg('Error adding state. Please try again.'); 

        } else {
            setTimeout(() => {
                setValues({ ...values, loading: true })
            });
            setTimeout(() => {
                setValues({ ...values, loading: false })
                Router.push('/login');
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
                            <div className="card mb-4" style={{ width: "600px", marginTop: "50px" }}>
                                <div className="card-header">Add State here</div>
                                <div className="card-body" style={{ maxWidth: "400px" }}>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="country_id">Country Name</label>
                                                    <select className="form-control" id="admin_country_id" name="admin_country_id" onChange={handleChange('admin_country_id')} required style={{ width: "105%" }}>
                                                        <option value="">Select Country</option>
                                                        {values.country_list.map(country => (
                                                    <option key={country._id} value={country._id}>
                                                        {country.admin_country_name}
                                                    </option>
                                                ))}
                                                    </select>
                                            </div>
                                        </div>
                                        
                                        <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="state_name">State Name</label>
                                            <input className="form-control" id="admin_state_name" type="text" placeholder="Enter State Name" name="admin_state_name" onChange={handleChange('admin_state_name')} required style={{ width: "105%" }} />
                                        </div>
                                    </div>
                                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: "#87CEFA", borderColor: "#87CEFA" }}>Submit</button>
                                        {loading ? (<div className="alert alert-success margin-top-10">Added Successfully</div>) : null}
                                        {msg ? (<div className="alert alert-success margin-top-10"> {msg}</div>) : null}
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
export default StateAdd;