import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Swal from 'sweetalert2';
import { FaEye, FaEdit, FaTrash, FaCalendarPlus, FaCheck, FaTimes } from 'react-icons/fa';
import Router from 'next/router';
import Header from './Header';
import Topbar from './topbar';
import { appointment_list, delete_appointment,update_appointment, update_appointment_status } from '../actions/appointmentAction';
import { patient_list } from '../actions/patientprofileAction';
import moment from 'moment';

const AppointmentList = () => {
    const router = useRouter();
    const [appointments, setAppointments] = useState([]);
    const [canceled_type, setCanceled_type] = useState('Admin');
    const [patients, setPatients] = useState([]);
    const [msg, setMsg] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editAppointment, setEditAppointment] = useState(null);


    useEffect(() => {
        loadAppointments();
        loadPatientDetails();
    }, []);

    const loadAppointments = () => {
        appointment_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setAppointments(data.appointment_list);
            }
        });
    };

    const loadPatientDetails = () => {
        patient_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setPatients(data.patient_list);
            }
        });
    };

    const handleView = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPopup(true);
    };

    const handleEdit = (appointment) => {
        setEditAppointment(appointment);
        setShowEditPopup(true);
    };
    

    const handleDelete = async (appointment) => {
        const patient_deleted_by_id = localStorage.getItem('id');
        const cancelReason = prompt('Please provide a reason for canceling this appointment:');

        if (cancelReason === null || cancelReason.trim() === "") {
            alert('Cancel reason is required to delete the appointment.');
            return;
        }

        try {
            const query = {
                "appointmentId": appointment._id,
                "user_id": patient_deleted_by_id,
                "cancelReason": cancelReason,
                "canceledType":canceled_type,
               
            };
            const response = await delete_appointment(query);

            console.log(response);

            await loadAppointments();
            setMsg(`Appointment with ID "${appointment._id}" deleted successfully.`);
            setTimeout(() => {
                setMsg('');
            }, 2000);

        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
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

    const AppointmentPopup = ({ appointment, onClose }) => {
        if (!appointment) return null;
    
        const { patient_name, doctor_name, appointment_date, slot_timing, status } = appointment;
        let statusMessage = '';
    
        switch (status) {
            case 'Accepted':
                statusMessage = `${patient_name} appointment has been Accepted.`;
                break;
            case 'Done':
                statusMessage = `${patient_name} appointment has been Completed.`;
                break;
            case 'Rejected':
                statusMessage = `${patient_name} appointment has been Rejected.`;
                break;
            default:
                statusMessage = `Status unknown for ${patient_name}'s appointment.`;
        }
    
        return (
            <div className="popup-overlay">
                <div className="popup-card">
                    <h3>Appointment Details</h3>
                    <p><strong>Patient Name:</strong> {patient_name}</p>
                    <p><strong>Doctor Name:</strong> {doctor_name}</p>
                    <p><strong>Date:</strong> {moment(appointment_date).format('YYYY-MM-DD')}</p>
                    <p><strong>Time:</strong> {slot_timing}</p>
                    <p><strong>Status:</strong> {statusMessage}</p>
                    <button onClick={onClose}
                    style={{
                        backgroundColor: '#9370DB',  
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        marginTop: '10px'
                      }}>Close</button>
                </div>
                <style jsx>{`
                    .popup-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                    }
                    .popup-card {
                        background: #f2f2f3;
                        padding: 20px;
                        border-radius: 15px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        animation: popup 0.3s ease-in-out;
                    }
                    @keyframes popup {
                        from {
                            transform: scale(0.5);
                            opacity: 0;
                        }
                        to {
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
                `}</style>
            </div>
        );
    };

    const EditAppointmentPopup = ({ appointment, onClose, onUpdate }) => {
        const [formData, setFormData] = useState({
            appointment_date: moment(appointment.appointment_date).format('YYYY-MM-DD'),
            slot_timing: appointment.slot_timing
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({ ...prevState, [name]: value }));
        };
    
        const handleSubmit = () => {
            onUpdate(formData);
        };
    
        return (
            <div className="popup-overlay">
                <div className="popup-card">
                    <h3>Edit Appointment Details</h3>
                    <form>
                        
                        <label>
                            Date:
                            <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} />
                        </label>
                        <label>
                            Time:
                            <input type="text" name="slot_timing" value={formData.slot_timing} onChange={handleChange} />
                        </label>
                        <button type="button" onClick={handleSubmit}>Update</button>
                        <button type="button" onClick={onClose}>Close</button>
                    </form>
                </div>
                <style jsx>{`
                    .popup-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                    }
                    .popup-card {
                        background: #f2f2f3;
                        padding: 20px;
                        width:400px;
                        border-radius: 15px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        animation: popup 0.3s ease-in-out;
                    }
                    @keyframes popup {
                        from {
                            transform: scale(0.5);
                            opacity: 0;
                        }
                        to {
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
                    form {
                        display: flex;
                        flex-direction: column;
                    }
                    label {
                        margin-bottom: 10px;
                    }
                    input {
                        padding: 5px;
                        margin-top: 5px;
                    }
                    button {
                        margin-top: 10px;
                        margin-left:100px;
                        padding: 10px;
                        border: none;
                        width:70px;
                        background-color: #4CAF50;
                        color: white;
                        cursor: pointer;
                    }
                    button:last-of-type {
                        background-color: #f44336;
                    }
                `}</style>
            </div>
        );
    };

    const handleUpdate = async (updatedData) => {
        const updatedAppointment = {
            ...editAppointment,
            appointment_date: updatedData.appointment_date,
            slot_timing: updatedData.slot_timing
        };
    
        try {
            const response = await update_appointment({
                appointmentId: updatedAppointment._id,
                ...updatedAppointment
            });
    
            if (response.error) {
                console.error(response.error);
                Swal.fire('Error', 'Failed to update appointment', 'error');
            } else {
                setAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
                    )
                );
                setShowEditPopup(false);
                setMsg(`Appointment with ID "${updatedAppointment._id}" updated successfully.`);
                setTimeout(() => {
                    setMsg('');
                }, 2000);
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };
    
    
    

    const actionFormatter = (appointment) => {
        const buttonStyle = {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '10px',
            transition: 'background-color 0.3s'
        };

        const viewStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(90, 155, 212, 0.2)', 
            color: '#5A9BD4'
        };

        const editStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(160, 212, 104, 0.2)', 
            color: '#A0D468'
        };

        const deleteStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(229, 115, 115, 0.2)', 
            color: '#E57373'
        };

        return (
            <div>
                <button style={viewStyle} onClick={() => handleView(appointment)}>
                    <FaEye />
                </button>
                <button style={editStyle} onClick={() => handleEdit(appointment)}>
                    <FaEdit />
                </button>
                <button style={deleteStyle} onClick={() => handleDelete(appointment)}>
                    <FaTrash />
                </button>
            </div>
        );
    };

    const statusFormatter = (appointment) => {
        const buttonStyle = {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer',
            margin: '5px 0',
            transition: 'background-color 0.3s'
        };
    
        const approveStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(76, 175, 80, 0.2)', 
            color: '#4CAF50'
        };
    
        const rejectStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(244, 67, 54, 0.2)', 
            color: '#F44336'
        };
    
        const statusTextStyle = {
            padding: '5px 10px',
            borderRadius: '5px',
            color: '#fff',
            margin: '5px 0',
            textAlign: 'center'
        };
    
        let statusText = null;
        if (appointment.status === 'Accepted') {
            statusText = <div style={{ ...statusTextStyle, backgroundColor: '#3CB371' }}>Accepted</div>;
        } else if (appointment.status === 'Rejected') {
            statusText = <div style={{ ...statusTextStyle, backgroundColor: '#CD5C5C' }}>Rejected</div>;
        } else if (appointment.status === 'Completed' || appointment.status === 'Done') {
            statusText = <div style={{ ...statusTextStyle, backgroundColor: '#81C784' }}>Completed</div>;
        } else {
            statusText = (
                <div className="status-buttons">
                    <button style={approveStyle} onClick={() => handleApprove(appointment._id)}>
                        <FaCheck />
                    </button>
                    <button style={rejectStyle} onClick={() => handleReject(appointment._id)}>
                        <FaTimes />
                    </button>
                </div>
            );
        }

        return statusText;
    };
    

    return (
        <Fragment>
            <Head>
                <title>Appointment List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Topbar />
            <div className="container-appointment-list">
                <div className="center-table">
                    <center><h2><b>APPOINTMENT LIST</b></h2></center>
                    <Link href="/Patient/ViewPatientList">
                        <a className="btn-add-appointment">
                            <FaCalendarPlus style={{ marginRight: '8px' }} />
                            Add Appointment
                        </a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <div className="custom-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Patient Name</th>
                                    <th>Doctor Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment, index) => (
                                    <tr key={appointment._id}>
                                        <td>{index + 1}</td>
                                        <td>{appointment.patient_name}</td>
                                        <td>{appointment.doctor_name}</td>
                                        <td>{moment(appointment.appointment_date).format('YYYY-MM-DD')}</td>
                                        <td>{appointment.slot_timing}</td>
                                        <td>{actionFormatter(appointment)}</td>
                                        <td>{statusFormatter(appointment)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showPopup && (
            <AppointmentPopup
                appointment={selectedAppointment}
                onClose={() => setShowPopup(false)}
            />
        )}

        {showEditPopup && (
            <EditAppointmentPopup
                appointment={editAppointment}
                onClose={() => setShowEditPopup(false)}
                onUpdate={handleUpdate}
            />
        )}


            <style jsx>{`
                .container-appointment-list {
                    padding: 20px;
                    margin: 0 auto;
                    margin-top: 100px;
                    width: 68%;
                }
                .center-table {
                    margin: auto;
                    width: 100%;
                }
                .custom-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 50px 0;
                    font-size: 1em;
                    max-height: 500px; 
                    overflow-y: auto;
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
                    border-bottom: 2px solid #009879;
                }
                .alert {
                    margin-top: 20px;
                }
                .btn-add-appointment {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    border: 1px solid #9575CD;
                    color: #6F42C1;
                    padding: 0.375rem 0.75rem;
                    font-size: 15px;
                    border-radius: 10%;
                    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                    text-decoration: none;
                }
                .btn-add-appointment:hover {
                    background-color: #9575CD;
                    border-color: #6F42C1;
                    color: white;
                }
                .status-buttons {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            `}</style>
        </Fragment>
    );
};

export default AppointmentList;