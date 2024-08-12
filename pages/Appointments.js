import React, { useState, useEffect } from 'react';
import Header from './Header';
import Router from 'next/router';
import Link from 'next/link';
import Topbar from './topbar';
import Head from 'next/head';
import Modal from 'react-modal';

import { appointment_list, appointment_details_by_id } from '../actions/appointmentAction';

const Legend = () => {
    const legendStyle = {
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        textAlign: 'left'
    };

    const dotStyle = {
        height: '10px',
        width: '10px',
        backgroundColor: 'green',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '10px'
    };

    const dotRedStyle = {
        height: '10px',
        width: '10px',
        backgroundColor: 'lightcoral',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '10px'
    };

    return (
        <div style={legendStyle}>
            <div>
                <span style={dotStyle}></span>
                <span>Green dot represents appointment details. By clicking on it, you can view appointment details.</span>
            </div>
            <div>
                <span style={dotRedStyle}></span>
                <span>Red dot represents all appointments canceled for the day. Click to view details and cancellation reason.</span>
            </div>
        </div>
    );
};

const UpcomingAppointments = ({ appointments }) => {
    const upcomingAppointmentsStyle = {
        width: '20%',
        position: 'fixed',
        top: '200px',
        right: '20px',
        zIndex: 10,
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        maxHeight: '500px',
        overflowY: 'auto',
    };

    const appointmentCardStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#fff',
    };

    const profileImgStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px',
    };

    const appointmentInfoStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div style={upcomingAppointmentsStyle}>
            <h4> Upcoming Appointments ({appointments.length})</h4>
            {appointments.length === 0 ? (
                <p>No appointments next month</p>
            ) : (
                appointments.map((appointment, index) => (
                    <div key={index} style={appointmentCardStyle}>
                        <img src={appointment.patient_profile_img} alt="Profile" style={profileImgStyle} />
                        <div style={appointmentInfoStyle}>
                            <span>{appointment.patient_name}</span>
                            <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointments, setSelectedAppointments] = useState([]);

    useEffect(() => {
        appointment_list().then(data => {
            console.log('Fetched appointments:', data);
            setAppointments(data.appointment_list);
        });
    }, []);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const daysInMonth = Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1);

    const renderDay = (day) => {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const today = new Date();
        
        const dayDate = new Date(currentYear, currentMonth, day);
        
        const isPast = dayDate < today.setHours(0, 0, 0, 0);
        if (isPast) {
            return (
                <div key={day} style={dayCellStyle}>
                    <span>{day}</span>
                </div>
            );
        }
        const dayAppointments = appointments.filter(
            app => new Date(app.appointment_date).getDate() === day &&
                new Date(app.appointment_date).getMonth() === currentMonth &&
                new Date(app.appointment_date).getFullYear() === currentYear &&
                app.status === 'Accepted'
        );

        const allCanceled = dayAppointments.length > 0 && dayAppointments.every(app => app.cancel_status);

        const dayStyle = {
            ...dayCellStyle,
            backgroundColor: dayAppointments.length === 0 ? 'white' : (allCanceled ? '#FF6347' : '#8FBC8F')
        };

        return (
            <div key={day} style={dayStyle} onClick={() => handleDateClick(day)}>
                <span>{day}</span>
            </div>
        );
    };

    const handleDateClick = (day) => {
        const selected = appointments.filter(
            app => new Date(app.appointment_date).getDate() === day &&
                new Date(app.appointment_date).getMonth() === currentDate.getMonth() &&
                new Date(app.appointment_date).getFullYear() === currentDate.getFullYear() &&
                app.status === 'Accepted'
        );

        if (selected.length > 0) {
            Promise.all(selected.map(app => appointment_details_by_id(app._id))).then(details => {
                const appointmentDetails = details.map(detail => detail.appointment_list[0]);
                setSelectedAppointments(appointmentDetails);
            });
        } else {
            setSelectedAppointments([]);
        }
    };

    const closeModal = () => {
        setSelectedAppointments([]);
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString(undefined, options);
    };

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => {
            const prevMonth = prevDate.getMonth() - 1;
            const prevYear = prevMonth === -1 ? prevDate.getFullYear() - 1 : prevDate.getFullYear();
            return new Date(prevYear, (prevMonth + 12) % 12, 1);
        });
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => {
            const nextMonth = prevDate.getMonth() + 1;
            const nextYear = nextMonth === 12 ? prevDate.getFullYear() + 1 : prevDate.getFullYear();
            return new Date(nextYear, nextMonth % 12, 1);
        });
    };

    const handleBookAppointment = () => {
       Router.push('/Patient/ViewPatientList');
    };


    const calendarContainerStyle = {
        width: '60%',
        maxWidth: '1000px',
        margin: '0 auto',
        marginLeft: '260px'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    };

    const currentDateStyle = {
        fontSize: '20px',
        marginTop: '100px'
    };

    const navigationButtonStyle = {
        backgroundColor: '#8866D9',
        border: 'none',
        padding: '5px 10px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginLeft: '10px',
        marginTop: '100px',
        marginRight: '10px'
    };

    const weekdaysStyle = {
        display: 'flex'
    };

    const weekdayStyle = {
        flex: '1',
        color: 'black',
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#D3C8F1',
        border: '1px solid #ccc'
    };

    const daysStyle = {
        display: 'flex',
        flexWrap: 'wrap'
    };

    const dayCellStyle = {
        flex: '1 0 14.28%',
        border: '1px solid #ccc',
        padding: '10px',
        boxSizing: 'border-box',
        minHeight: '100px',
        position: 'relative',
        cursor: 'pointer',
        color: 'black'
    };

    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
        
    };

    const appointmentStatus = () => {
        return (
            <div style={{ backgroundColor: 'lightgreen', padding: '5px', color: 'white' }}>Accepted</div>
        );
    };
    

    const getNextMonthAppointments = () => {
        const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        return appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.appointment_date);
            return appointmentDate.getMonth() === nextMonthDate.getMonth() &&
                   appointmentDate.getFullYear() === nextMonthDate.getFullYear() &&
                   appointment.status === 'Accepted';
        });
    };


    return (
        <>
            <Head>
                <title>Appointment</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Registration' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>

            <Topbar />
            <Header />
            <div style={calendarContainerStyle}>
                <button
                    onClick={handleBookAppointment}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '50px',
                        zIndex: 1000, 
                        borderRadius: '10px',
                        width: '150px',
                        height: '60px',
                        backgroundColor: '#8866D9 ',
                        color: '#fff',
                        cursor: 'pointer',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    Book Appointment
                </button>
                <UpcomingAppointments appointments={getNextMonthAppointments()} />
                
                <div style={headerStyle}>
                    <button style={navigationButtonStyle} onClick={handlePreviousMonth}>&lt; </button>
                    <div style={currentDateStyle}>{formatDate(currentDate)}</div>
                    <button style={navigationButtonStyle} onClick={handleNextMonth}> &gt;</button>
                </div>
                <Legend />

                <div style={weekdaysStyle}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <div key={index} style={weekdayStyle}>{day}</div>
                    ))}
                </div>
                <div style={daysStyle}>
                    {daysInMonth.map(day => renderDay(day))}
                </div>
            </div>

            {selectedAppointments.length > 0 && (
                <Modal
                    isOpen={true}
                    onRequestClose={closeModal}
                    style={modalStyle}
                    contentLabel="Appointment Details"
                >
                    <h2>Appointment Details</h2>

                    {selectedAppointments.map((appointment, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <div><strong>Date:</strong> {appointment.appointment_date ? new Date(appointment.appointment_date).toLocaleDateString() : 'N/A'}</div>
                            <div><strong>Patient Name:</strong> {appointment.patient_name || 'N/A'}</div>
                            <div><strong>Doctor Name:</strong> {appointment.doctor_name || 'N/A'}</div>
                            <div><strong>Slot Timing:</strong> {appointment.slot_timing || 'N/A'}</div>
                            <div><strong>Appointment Status:</strong> {appointmentStatus(appointment.cancel_status)}</div>
                            {appointment.cancel_status && (
                                <div><strong>Cancellation Reason:</strong> {appointment.cancel_reason || 'N/A'}</div>
                            )}
                        </div>
                    ))}

                    <button onClick={closeModal}
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
                </Modal>
            )}
        </>
    );
};

export default Calendar;
