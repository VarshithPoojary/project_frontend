import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Topbar from '../topbar';
import Header from '../Header';
import { add_specialistTypes } from '../../actions/SpeciaListTypeAction';

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

            const res = await add_specialistTypes(formData);

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
            <div className="container-viewLocation">
                <div className="center-table">
                    <div className="card mb-4">
                        <div className="card-header">Specialist Type here</div>
                        <div className="card-body">
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
                                        <select className="form-control" id="admin_priority" name="admin_priority" value={values.admin_priority} onChange={handleChange} required >
                                            <option value="" disabled>Select priority</option>
                                            <option value="first">First</option>
                                            <option value="second">Second</option>
                                            <option value="third">Third</option>
                                            <option value="fourth">Fourth</option>
                                            <option value="fifth">Fifth</option>
                                        </select>
                                        <small className="text-muted">Select a priority level</small>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="admin_icon" className="col-sm-3 col-form-label">Icon</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control-file" id="admin_icon" name="admin_icon" onChange={handleIconChange} accept="image/*" required />
                                    </div>
                                </div>
                                <button className="btn-submit" type="submit">Submit</button>
                                {loading && (<div className="alert alert-success margin-top-10">Adding...</div>)}
                                {msg && (<div className="alert alert-success margin-top-10">{msg}</div>)}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                #wrapper {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                .container-viewLocation {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                .center-table {
                    width: 100%;
                    max-width: 600px;
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
        </div>
    );
};

export default SpecialistTypeAdd;
