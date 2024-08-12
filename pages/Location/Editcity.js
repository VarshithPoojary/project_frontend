import Link from 'next/link';
import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head from 'next/head';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import Header from '../Header';
import Topbar from '../topbar';
import { country_list } from '../../actions/countryAction';
import { state_list, state_list_by_country_id } from '../../actions/stateAction';
import { CityListById, update_city } from '../../actions/cityAction';

const cookies = new Cookies();

const CityEdit = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        admin_city_name: '',
        admin_state_id: '',
        state_name: '',
        admin_country_id: '', 
        country_name: '',
        admin_pincode: '',
        admin_updated_by_id: '',
        countrydetail: [],
        statedetail: [],
        loading: false
    });

    const [msg, setmsg] = useState('');
    const { admin_city_name, admin_country_id, country_name, admin_state_id, state_name, admin_pincode, countrydetail, statedetail, loading } = values;

    useEffect(() => {
        if (router.query._id) {
            loadCityDetails();
        }
    }, [router.query._id]);

    const loadCityDetails = () => {
        country_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                state_list().then(state => {
                    if (state.error) {
                        console.log(state.error);
                    } else {
                        CityListById(router.query._id).then(city => {
                            if (city.error) {
                                console.log(city.error);
                            } else {
                                setValues({
                                    ...values,
                                    admin_city_name: city.city_list[0].admin_city_name,
                                    admin_state_id: city.city_list[0].admin_state_id,
                                    admin_country_id: city.city_list[0].admin_country_id,
                                    admin_pincode: city.city_list[0].admin_pincode,
                                    country_name: city.city_list[0].country_name,
                                    state_name: city.city_list[0].state_name,
                                    countrydetail: data.admin_country_list,
                                    statedetail: state.state_list
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const _id = router.query._id;
        const admin_updated_by_id = localStorage.getItem('id');
        const city_data = { _id, admin_city_name, admin_country_id, admin_state_id, admin_pincode, admin_updated_by_id };

        update_city(city_data).then(res => {
            if (res.error) {
                console.log(res.error);
            } else {
                setValues({ ...values, loading: true });
                setTimeout(() => {
                    setValues({ ...values, loading: false });
                    Router.push(`/Location/viewCity`);
                }, 1000);
            }
        });
    };

    const handleChange = name => e => {
        const value = e.target.value;
        setValues({ ...values, [name]: value });
        if (name === "admin_country_id") {
            state_list_by_country_id(value).then(data1 => {
                if (data1.error) {
                    console.log(data1.error);
                } else {
                    setValues({ ...values, statedetail: data1.state_list, admin_country_id: value });
                }
            });
        }
    };

    return (
        <Fragment>
            <Head>
                <title>Edit City</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Edit City' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Header />
            <Topbar />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>Edit City</b></h2></center>
                    <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                        <div className="card-header">Edit City here</div>
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
                                    <label htmlFor="admin_state_id" className="col-sm-3 col-form-label">State Name</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" id="admin_state_id" name="admin_state_id" value={admin_state_id} onChange={handleChange('admin_state_id')} required>
                                            {statedetail.map(state => (
                                                <option key={state._id} value={state._id}>
                                                    {state.admin_state_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="admin_city_name" className="col-sm-3 col-form-label">City Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" id="admin_city_name" name="admin_city_name" value={admin_city_name} onChange={handleChange('admin_city_name')} required />
                                        <small className="text-muted">Enter City Name</small>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="admin_pincode" className="col-sm-3 col-form-label">Pincode</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" id="admin_pincode" name="admin_pincode" value={admin_pincode} onChange={handleChange('admin_pincode')} required />
                                        <small className="text-muted">Enter Pincode</small>
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

export default CityEdit;
