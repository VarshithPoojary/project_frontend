import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Swal from 'sweetalert2';
import Header from './Header';
import Router from 'next/router';
import { format, isToday, isAfter } from 'date-fns';
import Topbar from './topbar';
import { FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import { doctor_list, DeleteDoctorDetails, slot_listby_caretaker_id } from '../actions/doctorprofileAction';

const ApprovedDoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [msg, setMsg] = useState('');
    const [viewSlots, setViewSlots] = useState(null);

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = () => {
        doctor_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setDoctors(data.caretaker_list);
                data.caretaker_list.forEach(doctor => {
                    loadSlots(doctor._id);
                });
            }
        });
    };

    const loadSlots = (doctorId) => {
        slot_listby_caretaker_id(doctorId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setDoctors(prevDoctors => prevDoctors.map(doctor => {
                    if (doctor._id === doctorId) {
                        doctor.slots = data.slot_list;
                    }
                    return doctor;
                }));
            }
        });
    };

    const handleDelete = (doctorId) => {
        const caretaker_deleted_by_id = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this doctor!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let query = { "_id": doctorId, "caretaker_deleted_by_id": caretaker_deleted_by_id }
                DeleteDoctorDetails(query).then(data => {
                    loadDoctors();
                    setMsg(`Doctor deleted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 2000);
                });
            }
        });
    };

    const handleView = (row) => {
        Router.push({
            pathname: '/Doctor/ViewDoctorProfile',
            query: {
                _id: row._id,
                doctorProfile: JSON.stringify(row),
            }
        });
    };

    const handleViewSlots = (doctor) => {
        setViewSlots(doctor);
    };

    const closeSlotsCard = () => {
        setViewSlots(null);
    };

    return (
        <Fragment>
            <Head>
                <title>Approved Doctors List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Topbar />
            <div className="container">
                <center><h2 className="page-heading"><b>List Of Approved Doctors</b></h2></center>
                {msg && <div className="alert alert-success">{msg}</div>}
                <div className="doctor-list">
                    {doctors.length === 0 ? (
                        <p>No approved doctors found.</p>
                    ) : (
                        doctors.map((doctor) => (
                            <div className="doctor-card" key={doctor._id}>
                                <div className="doctor-card-header">
                                    <img
                                        src={doctor.caretaker_profile_image || '/images/userLogo.png'}
                                        alt="Profile Image"
                                        className="doctor-image"
                                    />
                                    <div className="doctor-info">
                                        <h3>{` ${doctor.caretaker_firstname} ${doctor.caretaker_lastname}`}</h3>
                                        <p>({doctor.caretaker_type})</p>
                                        <p>Experience: {doctor.caretaker_work_experience} years</p>
                                    </div>
                                </div>
                                <div className="doctor-card-footer">
                                    <button className="appointment-button" onClick={() => handleView(doctor._id)}>
                                        <FaUserMd style={{ marginRight: '5px' }} />
                                        View Profile
                                    </button>
                                    <button className="slots-button" onClick={() => handleViewSlots(doctor)}>
                                        <FaCalendarAlt style={{ marginRight: '5px' }} />
                                        View Slots
                                    </button>
                                </div>
                                {viewSlots && viewSlots._id === doctor._id && (
                                    <div className="slots-popup">
                                        <div className="slots-popup-content">
                                            <div className="slots-card-header">
                                                <h4>Slots for {`${doctor.caretaker_firstname} ${doctor.caretaker_lastname}`}</h4>
                                                <button className="close-button" onClick={closeSlotsCard}>X</button>
                                            </div>
                                            <div className="slots-card-body">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Time</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                         {doctor.slots && doctor.slots.length > 0
                                                            ? doctor.slots.filter(slot =>
                                                                isToday(new Date(slot.slot_date)) || isAfter(new Date(slot.slot_date), new Date())
                                                            ).map((slot, index) => (
                                                                <tr key={index}>
                                                                    <td>{format(new Date(slot.slot_date), 'yyyy-MM-dd')}</td>
                                                                    <td>{slot.slot_timings.map(timing => timing.slot_time).join(', ')}</td>
                                                                </tr>
                                                            ))
                                                            : <tr><td colSpan="2">No slots allotted</td></tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <style jsx>{`
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .page-heading {
                    margin-top: 90px;
                    font-size: 24px;
                    color: #6C657D;
                }
                .doctor-list {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .doctor-card {
                    background: #f2f2f3;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
                    margin: 15px;
                    padding: 20px;
                    
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }
                .doctor-card-header {
                    display: flex;
                    align-items: center;
                    width: 100%;
                }
                .doctor-image {
                    border-radius: 50%;
                    height: 60px;
                    width: 60px;
                    margin-right: 15px;
                }
                .doctor-info {
                    flex-grow: 1;
                }
                .doctor-info h3 {
                    margin: 10;
                    font-size: 16px;
                }
                .doctor-info p {
                    margin: 5px 0;
                    color: #666;
                    font-size: 14px;
                }
                .doctor-info span {
                    font-weight: bold;
                }
                .doctor-card-footer {
                    margin-top: 20px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }
                .appointment-button, .slots-button {
                    background-color: #D3BCE8;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 12px;
                    cursor: pointer;
                }
                .slots-button {
                    margin-left: 10px;
                }
                .slots-popup {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #D3BCE8;
                    padding: 20px;
                    border-radius: 10px;
                    z-index: 1000;
                    width: 300%;
                    max-width: 600px;
                }
                .slots-popup-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                }
                .slots-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                .close-button {
                    background: none;
                    border: none;
                    font-size: 16px;
                    cursor: pointer;
                    color: #666;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 10px;
                    width:10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }

                @media (max-width: 768px) {
                    .doctor-card {
                        width: 80%;
                        margin: 10px;
                    }
                    .appointment-button, .slots-button {
                        padding: 8px 10px;
                        font-size: 12px;
                    }
                }

                @media (max-width: 480px) {
                    .doctor-card {
                        width: 100%;
                        margin: 5px;
                    }
                    .doctor-card-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .doctor-image {
                        margin-bottom: 10px;
                    }
                    .appointment-button, .slots-button {
                        padding: 6px 8px;
                        font-size: 10px;
                    }
                }
          
            `}</style>
        </Fragment>
    );
};

export default ApprovedDoctorsList;
