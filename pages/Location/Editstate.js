import React, { useState, useEffect, Fragment } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { country_list } from '../../actions/countryAction';
import { StateListById, update_state } from '../../actions/stateAction';

const StateEdit = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        admin_state_name: '',
        admin_country_id: '',
        countrydetail: []
    });

    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const { admin_state_name, admin_country_id, countrydetail } = values;

    useEffect(() => {
        loadStateDetails();
    }, [router.query._id]);

    const loadStateDetails = async () => {
        try {
            const countryData = await country_list();
            if (countryData.error) {
                console.log(countryData.error);
            } else {
                const stateData = await StateListById(router.query._id);
                if (stateData.error) {
                    console.log(stateData.error);
                } else {
                    setValues({
                        ...values,
                        admin_country_id: stateData.state_list[0].admin_country_id,
                        admin_state_name: stateData.state_list[0].admin_state_name,
                        countrydetail: countryData.admin_country_list
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const adminId = localStorage.getItem('id');
        const stateData = {
            _id: router.query._id,
            admin_country_id,
            admin_state_name,
            admin_updated_by_id: adminId
        };

        try {
            const res = await update_state(stateData);
            if (res.error) {
                setValues({ ...values });
            } else {
                setMsg('State edited successfully');
                setTimeout(() => {
                    setMsg('');
                    Router.push(`/Location/viewState`);
                }, 1000);
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
        <Fragment>
            <Head>
                <title>Edit State</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Edit State' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>Edit State</b></h2></center>
                    <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                        <div className="card-header">Edit State here</div>
                        <div className="card-body" style={{ maxWidth: "400px" }}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="admin_country_id" className="col-sm-3 col-form-label">Country Name</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" id="admin_country_id" name="admin_country_id" value={admin_country_id} onChange={handleChange('admin_country_id')} required>
                                            {countrydetail.map(country => (
                                                <option key={country._id} value={country._id}>
                                                    {country.admin_country_name}
                                                </option>
                                            ))}
                                        </select>
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
                                {loading && <div className="alert alert-info">Loading...</div>}
                                {msg && <div className="alert alert-success margin-top-10">{msg}</div>}
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
                .alert-info {
                    color: #31708f;
                    background-color: #d9edf7;
                    border-color: #bce8f1;
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 20px;
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

export default StateEdit;
