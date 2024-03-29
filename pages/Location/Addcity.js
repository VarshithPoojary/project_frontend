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
import { add_city } from '../../actions/cityAction';
import { state_list_by_country_id } from '../../actions/stateAction';


// import { areaListById, stateList, countryList, stateListById } from '../../actions/locationAction';
import axios from 'axios';
import { API } from '../../config';


const cookies = new Cookies();

const CityAdd = () => {
    const [values, setValues] = useState({
        admin_state_id: '',
        admin_country_id: '', 
        admin_city_name:'',
        admin_pincode:'',
        country_list: [],
        statedetail: [],
        loading: false,
        msg: ''
    });

    const {  admin_city_name, admin_country_id, admin_state_id,admin_pincode, country_list, statedetail, loading, msg } = values;

    useEffect(() => {
        loadCountryDetail();  
    }, []);

    const loadCountryDetail = () => {
        loadCountryDetails()
            .then(country => {
                if (country.error) {
                    console.log(country.error);
                } else {
                      
                    setValues({ ...values, country_list: country.admin_country_list });
                    
                }
            })
            .catch(error => console.log(error));
};

const handleSubmit = e => {
    e.preventDefault();
    const adminId = localStorage.getItem('id');
    const city_data = { admin_created_by_id:adminId, admin_city_name, admin_country_id, admin_state_id,admin_pincode }; 
    console.log('Selected Country ID (handleSubmit):', admin_country_id);
   
    add_city(city_data)
        .then(res => {
            if (res.error) {
                setValues({ ...values });
            } else {
                setValues({ ...values, loading: true });
                setTimeout(() => {
                    setValues({ ...values, loading: false, msg: 'Added Successfully' });
                    Router.push('/login');
                }, 1000);12
            }
        })
        .catch(error => console.error(error));
};


const handleChange = name => e => {
    
    setValues({ ...values, [name]: e.target.value });
    
    if(name===("admin_country_id"))
   {
    
    state_list_by_country_id(e.target.value).then(data1 => {
          
        if (data1.error) {
            alert("error")
            console.log(data1.error);
        } else {
           
        setValues({ ...values,statedetail:data1.state_list,admin_country_id:e.target.value});
                     
            
      
        }
    })
}
   
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
                                <div className="card-header">Add City here</div>
                                <div className="card-body" style={{ maxWidth: "400px" }}>
                                    <form onSubmit={handleSubmit}>
                                    <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="text">Country Id</label>
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
                                                <label className="small mb-1" htmlFor="text">State Id</label>
                                                <select className="form-control" id="admin_state_id" name="admin_state_id" onChange={handleChange('admin_state_id')} required>
                                                 <option value="">Select state</option> 
                                                {values.statedetail.map(state => (
                                                    <option key={state._id} value={state._id}>
                                                        {state.admin_state_name}
                                                    </option>
                                                ))}
                                            </select>
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="admin_city_name">City Name</label>
                                            <input className="form-control" id="admin_city_name" type="text" placeholder="Enter City Name" name="admin_city_name" onChange={handleChange('admin_city_name')} required style={{ width: "105%" }} />
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                       <div className="col-md-6">  
                                                <label className="small mb-1" htmlFor="number">Pincode</label>
                                                <input className="form-control" id="admin_pincode" type="number" placeholder="Enter Pincode" name="admin_pincode" onChange={handleChange('admin_pincode')} required style={{ width: "105%" }} />
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
export default CityAdd;