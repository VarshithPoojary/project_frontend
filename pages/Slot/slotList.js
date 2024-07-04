import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import Topbar from '../topbar';
import Header from '../Header';
import { slot_list } from '../../actions/slotAction';

const SlotList = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await slot_list();

                if (response.error) {
                    setMsg(response.msg || 'An error occurred. Please try again.');
                } else {
                    const today = new Date();
                    const filteredSlots = response.slot_list.filter(slot => new Date(slot.slot_date) >= today);
                    setSlots(filteredSlots);
                }
            } catch (error) {
                console.error('Error fetching slot list:', error);
                setMsg('An unexpected error occurred. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchSlots();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div id="wrapper">
            <Head>
                <title>SLOT LIST Here....</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content="Slot List" />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4 custom-card">
                                    <div className="card-header"><b>SLOT DETAILS.....</b></div>
                                    <div className="card-body custom-card-body">
                                        {loading && <div className="alert alert-info">Loading...</div>}
                                        {msg && <div className="alert alert-danger">{msg}</div>}
                                        {!loading && !msg && (
                                            <div className="custom-table">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Caretaker Name</th>
                                                            <th>Slot Date</th>
                                                            <th>Slot Timings</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {slots.map((slot, index) => (
                                                            <tr key={slot._id}>
                                                                <td>{index + 1}</td>
                                                                <td>{slot.caretaker_name}</td>
                                                                <td>{formatDate(slot.slot_date)}</td>
                                                                <td>
                                                                    {slot.slot_timings.map((timing, idx) => (
                                                                        <div key={idx}>{timing.slot_time}</div>
                                                                    ))}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                #wrapper {
                    padding: 20px;
                    margin-left: -50px;
                    margin-top: 10px;
                }
                .content-page {
                    padding: 20px;
                }
                .custom-card {
                    width: 100%; 
                    margin: 0 auto;
                    margin-top: 70px;
                }
                .custom-card-body {
                    max-height: 500px; 
                    overflow-y: auto; 
                }
                .custom-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 50px 0;
                    font-size: 1em;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }
                .custom-table th,
                .custom-table td {
                    padding: 15px 15px;
                    text-align: left;
                }
                .custom-table thead tr {
                    background-color: #B4A3E1;
                    color: #ffffff;
                    text-align: left;
                }
                .custom-table tbody tr {
                    border-bottom: 1px solid #dddddd;
                }
                .custom-table tbody tr:nth-of-type(even) {
                    background-color: #f3f3f3;
                }
                .custom-table tbody tr:last-of-type {
                    border-bottom: 2px solid #B4A3E1;
                }
                .alert-info {
                    color: #31708f;
                    background-color: #d9edf7;
                    border-color: #bce8f1;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .alert-danger {
                    color: #a94442;
                    background-color: #f2dede;
                    border-color: #ebccd1;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .card-header {
                    background-color: #B4A3E1;
                }
            `}</style>
        </div>
    );
};

export default SlotList;
