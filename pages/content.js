import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Link from 'next/link';
import { FaUser, FaDochub, FaCalendarCheck, FaClock, FaUsers, FaCalendarAlt, FaHospitalUser, FaUserPlus, FaCalendar, FaStethoscope, FaUserMd } from "react-icons/fa";
import { patient_list } from '../actions/patientprofileAction';
import { doctor_list } from '../actions/doctorprofileAction';


const cookies = new Cookies();

const Users = () => {
    const [values, setValues] = useState({
        patient_list: [],
        doctor_list: [],
        registeredPatients: 0,
        registeredDoctors: 0,
        totalAppointments: 0,
        slots: 0,
        logsCount: 0,
    });
    const { registeredPatients, registeredDoctors, totalAppointments, slots } = values;
    const token = cookies.get('admin_token');

    useEffect(() => {
        loadAllCount();
    }, []);

    const loadAllCount = async () => {
        try {
            const data = await patient_list();
            const data1 = await doctor_list();
            if (data.error) {
                console.log(data.error);
                setValues({ ...values, error: data.error, loading: false });
            } else {
                if (data1.error) {
                    console.log(data1.error);
                    setValues({ ...values, error: data1.error, loading: false });
                } else {
                    const patientCount = data.patient_list.length;
                    const doctorCount = data1.caretaker_list.length;
                    setValues({
                        ...values,
                        registeredPatients: patientCount,
                        registeredDoctors: doctorCount,
                        loading: false
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setValues({ ...values, error: 'Error: Network request failed', loading: false });
        }
    }

const DoctorList = ({ doctors }) => {
    return (
        <div style={doctorListContainerStyle}>
            <h4 style={doctorListHeaderStyle}>Doctor list</h4>
            <input type="text" placeholder="Search..." style={searchBoxStyle} />
            <ul style={doctorListStyle}>
                {doctors.map((doctor, index) => (
                    <li key={index} style={doctorItemStyle}>
                        <img src="/images/doctor1 (2).jpg" alt="Doctor" style={doctorImgStyle} />
                        <div style={doctorInfoStyle}>
                            <span style={doctorNameStyle}>{doctor.name}</span>
                            <span style={doctorStatusStyle}>{doctor.status}</span>
                        </div>
                        <button style={messageButtonStyle}>💬</button>
                    </li>
                ))}
            </ul>
            <a href="#" style={viewAllStyle}>View All</a>
        </div>
    );
};

const doctorListContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginLeft:'500%',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '100%',

    width: '350px',
    height:'420px',
    margin: '0 auto'
};

const doctorListHeaderStyle = {
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '18px',
    textAlign: 'left'
};

const searchBoxStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ddd'
};

const doctorListStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0
};

const doctorItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee'
};

const doctorImgStyle = {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    marginRight: '10px'
};

const doctorInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
};

const doctorNameStyle = {
    fontWeight: 'bold',
    fontSize: '14px'
};

const doctorStatusStyle = {
    fontSize: '12px',
    color: '#777'
};

const messageButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#007bff'
};

const viewAllStyle = {
    display: 'block',
    textAlign: 'right',
    marginTop: '10px',
    color: '#007bff',
    textDecoration: 'none'
};




    const content = () => (
        <div className="container-fluid mt-3" style={{ overflow: 'auto', maxHeight: '100vh' }}>
            <div className="row" style={{ padding: '20px', marginTop: '100px' }}>
                <div className="col-md-3 mb-3">
                    <Link href="/Patient/TotalPatients">
                        <a style={{ textDecoration: 'none' }}>
                            <div className="card-box" style={cardStyle}>
                                <i className="float-right" style={iconStyle}><FaUser /></i>
                                <h5 className="text-muted text-uppercase mb-3">Registered Patients</h5>
                                <h4 className="mb-3">{registeredPatients}</h4>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card-box" style={cardStyle}>
                        <i className="float-right" style={iconStyle}><FaDochub /></i>
                        <h5 className="text-muted text-uppercase mb-3">Registered Doctors</h5>
                        <h4 className="mb-3">{registeredDoctors}</h4>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <Link href="/Patient/BillandPayments">
                        <a style={{ textDecoration: 'none' }}>
                            <div className="card-box" style={cardStyle}>
                                <i className="float-right" style={iconStyle}><FaCalendarCheck /></i>
                                <h5 className="text-muted text-uppercase mb-3">Total Appointments</h5>
                                <h4 className="mb-3">{totalAppointments}</h4>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card-box" style={cardStyle}>
                        <i className="float-right" style={iconStyle}><FaClock /></i>
                        <h5 className="text-muted text-uppercase mb-3">Slots</h5>
                        <h4 className="mb-3">{slots}</h4>
                    </div>
                </div>
            </div>

            <div className="content-card" style={contentCardStyle}>
                <div className="content-patient-card-header" style={headerStyle}>
                    <span><FaUser /> Patient</span>
                </div>

                <div className="row" style={{ marginTop: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="col-md-3 mb-3">
                        <div className="card-box" style={subCardStyle}>
                            <i className="float-right" style={iconStyle}><FaUsers /></i>
                            <h5 className="text-muted text-uppercase mb-3">Total Patients</h5>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="card-box" style={subCardStyle}>
                            <i className="float-right" style={iconStyle}><FaCalendarAlt /></i>
                            <h5 className="text-muted text-uppercase mb-3">Appointments</h5>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="card-box" style={subCardStyle}>
                            <i className="float-right" style={iconStyle}><FaHospitalUser /></i>
                            <h5 className="text-muted text-uppercase mb-3">Patient Visit</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-card" style={contentCardStyle}>
                <div className="content-patient-card-header" style={headerStyle}>
                    <span><FaUserMd /> Doctor</span>
                </div>

                <div className="row" style={{ marginTop: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="col-md-3 mb-3">
                        <div className="card-box" style={subCardStyle}>
                            <i className="float-right" style={iconStyle}><FaStethoscope /></i>
                            <h5 className="text-muted text-uppercase mb-3">Total Doctors</h5>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="card-box" style={subCardStyle}>
                            <i className="float-right" style={iconStyle}><FaCalendar /></i>
                            <h5 className="text-muted text-uppercase mb-3">Available Slots</h5>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="card-box" style={subCardStyle}>
                            <i className="float-right" style={iconStyle}><FaUserPlus /></i>
                            <h5 className="text-muted text-uppercase mb-3">New Registrations</h5>
                        </div>
                    </div>
                </div>
            </div>

            <DoctorList doctors={[ // Sample data, replace with actual data from backend
                { name: "Dr. Milan Jack", status: "available" },
                { name: "Dr. Jacob Jones", status: "available" },
                { name: "Dr. Jerome Bell", status: "available" },
                { name: "Dr. Milan Jack", status: "available" },
            ]} />
        </div>
    );

    return (
        <div>
            {content()}
        </div>
    );
};

const cardStyle = {
    padding: '20px',
    marginLeft:'100px',
    borderRadius: '10px',
    background: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px'
};

const iconStyle = {
    fontSize: '2em',
    color: '#007bff'
};

const contentCardStyle = {
    background: '#fff',
    padding: '20px',
    width:'1000px',
    marginLeft:'120px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px'
};

const headerStyle = {
    fontWeight: 'bold',
    
    fontSize: '18px',
    marginBottom: '20px'
};

const subCardStyle = {
    padding: '20px',
    borderRadius: '10px',
    background: '#f8f9fa',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px'
};

export default Users;
