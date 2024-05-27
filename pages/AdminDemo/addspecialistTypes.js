import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Topbar from '../topbar';
import Header from '../Header';
import {add_specialistTypes} from '../../actions/SpeciaListTypeAction';

const SpecialistTypeAdd = () => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [values, setValues] = useState({
        admin_specialist_type_name: '',
        admin_color_code: '',
        admin_priority: '',
        admin_icon: null 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const adminId = localStorage.getItem('id');
        try {
            const formData = new FormData();
            formData.append('admin_created_by_id', adminId);
            formData.append('admin_specialist_type_name', values.admin_specialist_type_name);
            formData.append('admin_color_code', values.admin_color_code);
            formData.append('admin_priority', values.admin_priority);
            formData.append('admin_icon', values.admin_icon);

            // Call the add_specialist_type function here with formData
             const res = await add_specialistTypes(formData);
            // Below is a placeholder response
            //const res = { msg: 'Specialist type added successfully' };

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
                    Router.push(`/SpecialistPage`);
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

    const handleIconChange = (e) => {
        const selectedIcon = e.target.files[0];
        setValues({ ...values, admin_icon: selectedIcon });
    };

    return (
        <div id="wrapper">
            <Head>
                <title>Add Specialist Type</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Add Specialist Type' />
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
                                    <div className="card-header">Add Specialist Type here</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="admin_specialist_type_name" className="col-sm-3 col-form-label">Specialist Type Name</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="admin_specialist_type_name" name="admin_specialist_type_name" value={values.admin_specialist_type_name} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="admin_color_code" className="col-sm-3 col-form-label">Color Code</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="admin_color_code" name="admin_color_code" value={values.admin_color_code} onChange={handleChange} required />
                                                    <small className="text-muted">Enter a text representing the color code</small>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="admin_priority" className="col-sm-3 col-form-label">Priority</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="admin_priority" name="admin_priority" value={values.admin_priority} onChange={handleChange} required />
                                                    <small className="text-muted">Enter a text representing the priority</small>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="admin_icon" className="col-sm-3 col-form-label">Icon</label>
                                                <div className="col-sm-9">
                                                    <input type="file" className="form-control-file" id="admin_icon" name="admin_icon" onChange={handleIconChange} accept="image/*" required />
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

export default SpecialistTypeAdd;
