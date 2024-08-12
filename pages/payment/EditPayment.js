import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { payment_update, payment_list_by_id } from '../../actions/paymentAction';

const EditPayment = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        admin_treatment_name: '',
        admin_amount: ''
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const { admin_treatment_name, admin_amount } = values;

    useEffect(() => {
        loadPaymentDetails();
    }, [router.query._id]);

    const loadPaymentDetails = () => {
        payment_list_by_id(router.query._id).then(payment => {
            if (payment.error) {
                console.log(payment.error);
            } else {
                setValues({
                    ...values,
                    admin_treatment_name: payment.admin_payment_list[0].admin_treatment_name,
                    admin_amount: payment.admin_payment_list[0].admin_amount
                });
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const adminId = localStorage.getItem('id');
        const paymentId = router.query._id;
        const payment_data = {
            _id: paymentId,
            admin_treatment_name,
            admin_amount,
            admin_updated_by_id: adminId
        };

        try {
            const res = await payment_update(payment_data);
            if (res.error) {
                setValues({ ...values });
                console.error('Error:', res.error);
            } else {
                setMsg('Edited Successfully');
                setTimeout(() => {
                    setMsg('');
                }, 5000); 
                Router.push(`/payment/ViewPayment`);
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
                <title>Edit Treatment name and Amount</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Edit Payment' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Header />
            <Topbar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6">
                                <div className="card mb-4 mt-5">
                                    <div className="card-header text-center" style={{ background: "#B4A3E1", color: "white" }}>Edit Treatment name and Amount</div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="admin_treatment_name">Treatment Name</label>
                                                <input 
                                                    className="form-control" 
                                                    id="admin_treatment_name" 
                                                    type="text" 
                                                    placeholder="Enter Treatment Name Here" 
                                                    name="admin_treatment_name" 
                                                    value={values.admin_treatment_name} 
                                                    onChange={handleChange('admin_treatment_name')} 
                                                    required 
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="admin_amount">Amount</label>
                                                <input 
                                                    className="form-control" 
                                                    id="admin_amount" 
                                                    type="number" 
                                                    placeholder="Enter Amount Here" 
                                                    name="admin_amount" 
                                                    value={values.admin_amount} 
                                                    onChange={handleChange('admin_amount')} 
                                                    required 
                                                />
                                            </div>
                                            <div className="text-center">
                                                <button 
                                                    className="btn btn-primary" 
                                                    type="submit" 
                                                    style={{ background: "#B4A3E1", borderColor: "#B4A3E1" }}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                        {loading && <div className="alert alert-info mt-3">Loading...</div>}
                                        {msg && <div className="alert alert-success mt-3">{msg}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .card-header {
                    background-color: #B4A3E1;
                    color: white;
                    font-size: 18px;
                    font-weight: bold;
                    padding: 10px 15px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }
                .card-body {
                    background-color: #f9f9f9;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
                .form-control {
                    border: 1px solid #ddd;
                    padding: 10px;
                    border-radius: 4px;
                    font-size: 14px;
                }
                .btn-primary {
                    background-color: #B4A3E1;
                    border-color: #B4A3E1;
                    color: white;
                    padding: 13px 13px;
                    font-size: 15px;
                    font-weight: bold;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .btn-primary:hover {
                    background-color: #9575CD;
                    border-color: #9575CD;
                }
                .alert {
                    margin-top: 10px;
                    padding: 10px;
                    border-radius: 5px;
                }
                .alert-info {
                    background-color: #d9edf7;
                    color: #31708f;
                    border: 1px solid #bce8f1;
                }
                .alert-success {
                    background-color: #dff0d8;
                    color: #3c763d;
                    border: 1px solid #d6e9c6;
                }
            `}</style>
        </div>
    );
};

export default EditPayment;
