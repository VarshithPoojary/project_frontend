import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import { API } from '../../config';
import Header from '../Header';
import Topbar from '../topbar';
import { yearOfPassing_update, yearOfPassing_list_by_id } from '../../actions/YearOfPassingAction';

const YearOfPassingEdit = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        admin_year_of_passing: ''
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const { admin_year_of_passing } = values;


    useEffect(() => {
        loadyearOfPassingDetails();
    }, [router.query._id]);

    const loadyearOfPassingDetails = () => {
        yearOfPassing_list_by_id(router.query._id).then(passing => {
            if (passing.error) {
                console.log(passing.error);
            } else {
                setValues({
                    ...values,
                    admin_year_of_passing: passing.admin_yearofpassing_list[0].admin_year_of_passing
                });
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const adminId = localStorage.getItem('id');
        const yearOfPassingId = router.query._id;
        const yearOfPassing_data = {
            _id: yearOfPassingId,
            admin_year_of_passing,
            admin_updated_by_id: adminId
        };
    
        try {
            const res = await yearOfPassing_update(yearOfPassing_data);
            if (res.error) {
                setValues({ ...values });
                console.error('Error:', res.error);
            } else {
                setMsg('Edited Successfully');
                setTimeout(() => {
                    setMsg('');
                }, 5000); 
                Router.push(`/AdminDemo/viewYearOfPassingList`);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    


    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    return (
        <div id="wrapper">
               <Head>
      <title>Edit Year Of Passing</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="title" content='Edit Country' />
      <link rel="icon" href="/images/title_logo.png" />
    </Head>
            <Header />
            <Topbar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12"  >
                                <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                                    <div className="card-header">Edit Year Of Passing here..</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1" htmlFor="admin_year_list">Year Of Passing</label>
                                                    <input className="form-control" id="admin_year_of_passing" type="text" placeholder="Enter Passing Year Here" name="admin_year_of_passing" value={values.admin_year_of_passing} onChange={handleChange('admin_year_of_passing')} required style={{ width: "105%" }} />
                                                </div>
                                            </div>
                                            <button className="btn btn-primary" type="submit" style={{  background: "#3085d6", borderColor: "#0c9da8", marginTop:"10px" }}>Submit</button>
                                        </form>
                                        {loading && <div className="alert alert-info">Loading...</div>}
                                        {msg && <div className="alert alert-success margin-top-10">{msg}</div>}
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

export default YearOfPassingEdit;
