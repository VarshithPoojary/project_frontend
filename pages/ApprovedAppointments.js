import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Swal from 'sweetalert2';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { FaTrash, FaUser, FaStethoscope, FaClock, FaCheck, FaTimes,FaCheckCircle } from 'react-icons/fa';
import { appointment_list, delete_appointment, update_appointment_status } from '../actions/appointmentAction';
import moment from 'moment';
import Header from './Header';
import Topbar from './topbar';

const ApprovedAppointments = () => {
    const router = useRouter();
    const [appointments, setAppointments] = useState([]);
    const [msg, setMsg] = useState('');
    const [activeTab, setActiveTab] = useState('Approved');

    useEffect(() => {
        loadAppointments();
    }, [activeTab]);

    const loadAppointments = () => {
        appointment_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                const filteredAppointments = data.appointment_list.filter(appointment => {
                    if (activeTab === 'Approved') {
                        return appointment.status === 'Accepted';
                    } else if (activeTab === 'Rejected') {
                        return appointment.status === 'Rejected';
                    } else if (activeTab === 'Pending'){
                        return appointment.status === 'Active';
                    } else if (activeTab === 'Done'){
                        return appointment.status === 'Done';
                    } else {
                        return appointment.status === 'Canceled';
                    }
                });
                filteredAppointments.sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date));
                setAppointments(filteredAppointments);
            }
        });
    };

    const handleApprove = async (appointmentId) => {
        try {
            const response = await update_appointment_status(appointmentId, 'Accepted');
            if (response.error) {
                console.error(response.error);
                Swal.fire('Error', 'Failed to approve appointment', 'error');
            } else {
                setAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment._id === appointmentId ? { ...appointment, status: 'Accepted' } : appointment
                    )
                );
                setMsg(`Appointment with ID "${appointmentId}" approved successfully.`);
                setTimeout(() => {
                    setMsg('');
                }, 2000);
            }
        } catch (error) {
            console.error('Error approving appointment:', error);
        }
    };

    const handleReject = async (appointmentId) => {
        try {
            const response = await update_appointment_status(appointmentId, 'Rejected');
            if (response.error) {
                console.error(response.error);
                Swal.fire('Error', 'Failed to reject appointment', 'error');
            } else {
                setAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment._id === appointmentId ? { ...appointment, status: 'Rejected' } : appointment
                    )
                );
                setMsg(`Appointment with ID "${appointmentId}" rejected successfully.`);
                setTimeout(() => {
                    setMsg('');
                }, 2000);
            }
        } catch (error) {
            console.error('Error rejecting appointment:', error);
        }
    };
    const handleCancel = async (appointment) => {
        const cancelReason = prompt('Please provide a reason for canceling this appointment:');

        if (cancelReason === null || cancelReason.trim() === "") {
            alert('Cancel reason is required to delete the appointment.');
            return;
        }

        try {
            const query = {
                "appointmentId": appointment._id,
                "cancelReason": cancelReason
            };
            const response = await delete_appointment(query);

            console.log(response);

            loadAppointments();
            setMsg(`Appointment with ID "${appointment._id}" canceled successfully.`);
            setTimeout(() => {
                setMsg('');
            }, 2000);

        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };

    const handleComplete = (appointmentId) => {
        router.push({
          pathname: '/AddDescription',
          query: { appointmentId: appointmentId,status: 'Done' }
        });
      };

    const recentAppointments = appointments.filter(appointment => 
        moment(appointment.appointment_date).isSameOrAfter(moment().startOf('day'))
    );

    const previousAppointments = appointments.filter(appointment => 
        moment(appointment.appointment_date).isBefore(moment().startOf('day'))
    );
    

    return (
        <div>
            <Head>
                <title>Approved Appointments</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Topbar />
            <div className="container">
                <h2 className="title">Appointment History</h2>
                <div className="tabs">
                    <button className={`tab ${activeTab === 'Approved' ? 'active' : ''}`} onClick={() => setActiveTab('Approved')}>Approved</button>
                    <button className={`tab ${activeTab === 'Rejected' ? 'active' : ''}`} onClick={() => setActiveTab('Rejected')}>Rejected</button>
                    <button className={`tab ${activeTab === 'Pending' ? 'active' : ''}`} onClick={() => setActiveTab('Pending')}>Pending</button>
                    <button className={`tab ${activeTab === 'Done' ? 'active' : ''}`} onClick={() => setActiveTab('Done')}>Completed</button>
                    <button className={`tab ${activeTab === 'Canceled' ? 'active' : ''}`} onClick={() => setActiveTab('Canceled')}>Canceled</button>
                </div>
                {msg && <div className="alert alert-success">{msg}</div>}
                <div className="appointments-list">
                    {recentAppointments.length > 0 && (
                        <div>
                            <h5 className="section-title">Recent Appointments</h5>
                            {recentAppointments.map((appointment) => (
                                <div className="appointment-card" key={appointment._id}>
                                    <div className="appointment-info">
                                        <div className="appointment-date">
                                            <p>{moment(appointment.appointment_date).format('MMM DD YYYY')}</p>
                                        </div>
                                        <div className="appointment-details">
                                            <div className="detail-item">
                                                <FaUser className="icon" />
                                                <span>{appointment.patient_name}</span>
                                            </div>
                                            <div className="detail-item">
                                                <FaStethoscope className="icon" />
                                                <span>{appointment.doctor_name}</span>
                                            </div>
                                            <div className="detail-item">
                                                <FaClock className="icon" />
                                                <span>{appointment.slot_timing}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {activeTab === 'Pending' ? (
                                        <div className="actions">
                                            <button className="btn-accept" onClick={() => handleApprove(appointment._id)}>
                                                <FaCheck />
                                            </button>
                                            <button className="btn-reject" onClick={() => handleReject(appointment._id)}>
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ) : (
                                        
                                        activeTab === 'Approved' && (
                                            <>
                                                <button className="btn-completed" onClick={() => handleComplete(appointment._id)}>
                                                    <FaCheckCircle style={{ marginRight: '8px' }} />
                                                    Completed
                                                </button>
                                                <button className="btn-cancel" onClick={() => handleCancel(appointment)}>
                                                    <FaTrash style={{ marginRight: '8px' }} />
                                                    Cancel
                                                </button>
                                            </>
                                        )

                                        
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {previousAppointments.length > 0 && (
                        <div>
                            <h5 className="section-title">Previous Appointments</h5>
                            {previousAppointments.map((appointment) => (
                                <div className="appointment-card" key={appointment._id}>
                                    <div className="appointment-info">
                                        <div className="appointment-date">
                                            <p>{moment(appointment.appointment_date).format('MMM DD YYYY')}</p>
                                        </div>
                                        <div className="appointment-details">
                                            <div className="detail-item">
                                                <FaUser className="icon" />
                                                <span>{appointment.patient_name}</span>
                                            </div>
                                            <div className="detail-item">
                                                <FaStethoscope className="icon" />
                                                <span>{appointment.doctor_name}</span>
                                            </div>
                                            <div className="detail-item">
                                                <FaClock className="icon" />
                                                <span>{appointment.slot_timing}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {activeTab === 'Pending' ? (
                                        <div className="actions">
                                            <button className="btn-accept" onClick={() => handleApprove(appointment._id)}>
                                                <FaCheck />
                                            </button>
                                            <button className="btn-reject" onClick={() => handleReject(appointment._id)}>
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ) : (
                                        activeTab === 'Approved' && (
                                            <>
                                                <button className="btn-completed" onClick={() => handleComplete(appointment._id)}>
                                                    <FaCheckCircle style={{ marginRight: '8px' }} />
                                                    Completed
                                                </button>
                                                <button className="btn-cancel" onClick={() => handleCancel(appointment)}>
                                                    <FaTrash style={{ marginRight: '8px' }} />
                                                    Cancel
                                                </button>
                                            </>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {recentAppointments.length === 0 && previousAppointments.length === 0 && (
                        <p style={{ textAlign: 'center' }}>No Appointments Found</p>
                    )}
                </div>
            </div>


            <style jsx>{`
                .container {
                    padding: 20px;
                    margin: 0 auto;
                    margin-top: 100px;
                    width: 80%;
                }
                .title {
                    text-align: center;
                    margin-bottom: 20px;
                }

                .tabs {
                    margin: 70px;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                .tab {
                    background-color: #f2f2f3;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    margin: 0 5px;
                    border-radius: 5px;
                }
                .tab.active {
                    background-color: #6F42C1;
                    color: white;
                }
                
                .appointments-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .appointment-card {
                    display: flex;
                    margin-left: 50px;
                    justify-content: space-between;
                   margin-bottom: 20px;
                    align-items: center;
                    background-color: #f2f2f3;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    padding: 10px;
                    transition: transform 0.2s;
                }
                .appointment-card:hover {
                    transform: scale(1.02);
                }
                .appointment-info {
                    display: flex;
                    align-items: center;
                }
                .appointment-date {
                    display: flex;
                    margin-left: 20px;
                    align-items: center;
                    justify-content: center;
                    background-color: #D3BCE8; 
                    color: #4a148c; 
                    padding: 10px;
                    border-radius: 10%;
                    margin-right: 20px;
                    min-width: 50px;
                    text-align: center;
                }
                .appointment-details {
                    margin-left: 50px;
                    display: flex;
                    flex-direction: column;
                }
                .icon {
                    margin-right: 8px;
                }
                .btn-cancel {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f0ebfa; 
                    color: #6F42C1;
                    padding: 0.375rem 0.75rem;
                    font-size: 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .btn-cancel:hover {
                    background-color: #dcd3f2; 
                }

                .btn-completed {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f0ebfa; 
                    color: #6F42C1;
                    padding: 0.375rem 0.75rem;
                    font-size: 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                     margin-left: 450px;
                    transition: background-color 0.2s;
                }
                .btn-completed:hover {
                    background-color: #dcd3f2; 
                }
                .btn-accept, .btn-reject {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.375rem 0.75rem;
                    font-size: 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .btn-accept {
                    background-color: #d4edda;
                    color: #155724;
                    margin-right: 8px;
                }
                .btn-accept:hover {
                    background-color: #c3e6cb;
                }
                .btn-reject {
                    background-color: #f8d7da;
                    color: #721c24;
                }
                .btn-reject:hover {
                    background-color: #f5c6cb;
                }
                .alert {
                    text-align: center;
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 5px;
                }
                .alert-success {
                    background-color: #d4edda;
                    color: #155724;
                }
                .alert-danger {
                    background-color: #f8d7da;
                    color: #721c24;
                }
                    .section-title {
                    font-size: 15px;
                    text-align: center;
                    margin-right:750px;
                    margin-bottom: 20px;
                   
                }
            `}</style>
        </div>
    );
};

export default ApprovedAppointments;
