import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import Link from 'next/link';
import { FaEye,FaEllipsisH,FaTrashAlt  } from 'react-icons/fa';
import { patient_list } from '../actions/patientprofileAction';
import { doctor_list } from '../actions/doctorprofileAction';
import { appointment_list,delete_appointment } from '../actions/appointmentAction';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title);

const cookies = new Cookies();

const Menu = ({ onViewProfile, onMessage }) => (
  <div className="horizontal-menu">
    <button onClick={onViewProfile}>View Profile</button>
    <button onClick={onMessage}>Message</button>
    <style jsx>{`
      .horizontal-menu {
        display: flex;
        position: absolute;
        background-color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        z-index: 1000;
        top: 100%;
        right: 0;
      }
      .horizontal-menu button {
        display: block;
        width: auto;
        padding: 10px;
       
        border: none;
    
        background: none;
        text-align: center;
        cursor: pointer;
      }
      .horizontal-menu button:hover {
        background-color: #f1f1f1;
      }
    `}</style>
  </div>
);

const Users = () => {
  const [values, setValues] = useState({
    registeredPatients: 0,
    registeredDoctors: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    slots: 0,
    newDoctorRegistrations: 0
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [error, setError] = useState('');
  const [showMenu, setShowMenu] = useState({ index: null, type: null });


  const { registeredPatients, registeredDoctors, totalDoctors,totalAppointments, slots, totalPatientVisits, newDoctorRegistrations } = values;
  const token = cookies.get('admin_token');

  useEffect(() => {
    loadAllCount();
    loadDoctorList();
    loadPatientList();
    loadAppointmentList();

    const interval = setInterval(() => {
      loadAppointmentList();
    }, 24 * 60 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

  const loadAllCount = async () => {
    try {
      const patientData = await patient_list();
      const doctorData = await doctor_list();
      const appointmentData = await appointment_list();

      if (patientData.error || doctorData.error) {
        setError('Failed to load data');
        return;
      }

      // const approvedDoctors = doctorData.caretaker_list.filter(doctor => doctor.caretaker_approvedStatus === true).length;
      // alert(JSON.stringify(approvedDoctors))

      setValues({
        registeredPatients: patientData.patient_list.length,
        registeredDoctors: doctorData.caretaker_list.length,
        totalDoctors: doctorData.caretaker_list.length,
        totalAppointments: appointmentData.appointment_list.length || 0,
        newDoctorRegistrations: doctorData.new_registrations?.length || 0,
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Error: Network request failed');
    }
  };


  const loadDoctorList = async () => {
    try {
      const data = await doctor_list();
      if (data.error) {
        console.error(data.error);
      } else {
        setDoctors(data.caretaker_list);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadPatientList = async () => {
    try {
      const data = await patient_list();
      if (data.error) {
        console.error(data.error);
      } else {
        setPatients(data.patient_list);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadAppointmentList = async () => {
    try {
      const response = await appointment_list();
      const allAppointments = response.appointment_list;
      const today = moment().format('YYYY-MM-DD');
      const todayAppointments = allAppointments.filter(appointment =>
        moment(appointment.appointment_date).format('YYYY-MM-DD') === today && appointment.status === 'Accepted'
      );
      setTodayAppointments(todayAppointments);
      setAppointments(todayAppointments);
    } catch (err) {
      setError(err.response ? err.response.data.msg : 'An error occurred.');
    }
  };

  const handleBookAppointment = () => {
    Router.push('/Patient/ViewPatientList');
  };

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleMenuToggle = (index) => {
    setShowMenu({ ...showMenu, [index]: !showMenu[index] });
  };

  const handleViewProfile = (index) => {
    
    setShowMenu({ ...showMenu, [index]: false });
  };

  const handleMessage = (index) => {
 
    setShowMenu({ ...showMenu, [index]: false });
  };

  const handleDelete = async (appointmentId) => {
    // alert(JSON.stringify(appointmentId))
    const patient_deleted_by_id = localStorage.getItem('id');
    
    
    const cancelReason = prompt('Please provide a reason for canceling this appointment:');
    if (cancelReason === null || cancelReason.trim() === "") {
      alert('Cancel reason is required to delete the appointment.');
      return;
    }
    
    try {
      const query = { 
        "appointmentId": appointmentId, 
        "user_id": patient_deleted_by_id,
        "cancelReason": cancelReason,
         "canceled_type": canceled_type
      };
      const response = await delete_appointment(query);
  
      console.log(response); 
  
   
      await loadAppointmentList();
      setMsg(`Appointment with ID "${appointmentId}" deleted successfully.`);
      setTimeout(() => {
        setMsg('');
      }, 2000);
  
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

 
  
  

  // const displayImage = (profileImage) => (
  //   <img
  //     src={profileImage || '/images/default-profile.jpg'}
  //     alt="Profile Image"
  //     height="50px"
  //     width="50px"
  //     style={{ borderRadius: "50%" }}
  //   />
  // );

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  };

  const customStyles = {
    content: {
      width: '400px',  
      height: '300px',
      margin:'auto',
    marginTop:'350px',
      padding: '20px',
      borderRadius: '10px',
    },
  };
  

  const cardStyle = {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    textDecoration: 'none',
      flex: '1'
  };

  const imgStyle = {
    width: '100%',
    maxWidth: '100px',
    height: 'auto',
    marginBottom: '10px',
  };

  const textStyle = {
    margin: '10px 0',
  };

  const numberStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const doctorListCardStyle = {
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    flex: '1',
  };
  const doctorPatientView = {
    width: '100%',
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  };

  const doctorListHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const doctorListStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const doctorItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    position: 'relative',
  };

  const doctorImageStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  };

  const doctorInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const doctorNameStyle = {
    fontWeight: 'bold',
  };

  const doctorSpecialtyStyle = {
    color: '#888',
  };

  const viewAllLinkStyle = {
    textAlign: 'center',
    display: 'block',
    marginTop: '10px',
    color: '#007bff',
    textDecoration: 'none',
  };

  const viewAllLinkStyleAppointments = {
    textAlign: 'center',
    display: 'block',
    marginTop: '10px',
    color: '#007bff',
    textDecoration: 'none',
  };

  const appointmentListCardStyle = {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
  };
  

  const bookAppointmentButtonStyle = {
  backgroundColor: '#BBAFE1',
  color: '#fff',
  border: 'none',
  marginLeft:'1000px',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  alignSelf: 'center',
};
  const appointmentListHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

 

  const verticalCardStyle = {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    textDecoration: 'none',
    flex: '1',
    margin: '15px',
  };

  const pieChartCardStyle = {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    textDecoration: 'none',
    flex: '1',
    height: '420px',
  };

  

  const pieChartData = {
    labels: ['Doctors', 'Patients', 'Appointments'],
    datasets: [
      {
        data: [registeredDoctors, registeredPatients, totalAppointments],
        backgroundColor: ['#7B61FF', '#FF61D1', '#FFC1E3'], 
        hoverBackgroundColor: ['#9B81FF', '#FF81E1', '#FFD1F3'] 
      },
    ],
  };


  return (
    <div style={{ padding: '20px' }}>
      <div style={containerStyle}>
        <Link href="/Patient/ViewPatientList">
          <a style={cardStyle}>
            <img src="/images/dash1.jpg" alt="Patients" style={imgStyle} />
            <div style={textStyle}>Total Patients</div>
            <div style={numberStyle}>{registeredPatients}</div>
          </a>
        </Link>
        <Link href="/Doctor/ViewDoctorList">
          <a style={cardStyle}>
            <img src="/images/dash2.jpg" alt="Doctors" style={imgStyle} />
            <div style={textStyle}>Registered Doctors</div>
            <div style={numberStyle}>{registeredDoctors}</div>
          </a>
        </Link>
        <Link href="/ApprovedDoctors">
          <a style={cardStyle}>
            <img src="/images/dash20.png" alt="Doctors" style={imgStyle} />
            <div style={textStyle}>Approved Doctors</div>
            <div style={numberStyle}>{totalDoctors}</div>
          </a>
          </Link>
        <Link href="/TotalAppointmentList">
          <a style={cardStyle}>
            <img src="/images/dash3.jpg" alt="Appointments" style={imgStyle} />
            <div style={textStyle}>Total Appointments</div>
            <div style={numberStyle}>{totalAppointments}</div>
          </a>
        </Link>
       
      </div>
      <div style={doctorPatientView} >
        <div style={doctorListCardStyle} className='col-md-11' >
                <div style={doctorListHeaderStyle}>
                    <h3>Doctor List</h3>
                    {/* <span>Today</span> */}
                </div>
                <ul style={doctorListStyle}>
                    {doctors.slice(0, 4).map((doctor, index) => (
                        <li key={index} style={doctorItemStyle}>
                            <img src={doctor.caretaker_profile_image || '/images/default-profile.jpg'} alt={`${doctor.caretaker_firstname} ${doctor.caretaker_lastname}`} style={doctorImageStyle} />
                            <div style={doctorInfoStyle}>
                                <span style={doctorNameStyle}>{`${doctor.caretaker_firstname} ${doctor.caretaker_lastname}`}</span>
                                <span style={doctorSpecialtyStyle}>{doctor.caretaker_type}</span>
                            </div>
                            <FaEllipsisH onClick={() => handleMenuToggle(index)} style={{ cursor: 'pointer', marginLeft: 'auto' }} />
                {showMenu[index] && (
                  <Menu
                    onViewProfile={() => handleViewProfile(index)}
                    onMessage={() => handleMessage(index)}
                  />
                )}
                        </li>
                    ))}
                </ul>
                <Link href="/Doctor/ViewDoctorList">
                    <a style={viewAllLinkStyle}>View All</a>
                </Link>
           
            </div>
            <div style={doctorListCardStyle} className='col-md-12'>
                <div style={doctorListHeaderStyle}>
                    <h3>Patient List</h3>
                    {/* <span>Today</span> */}
                </div>
                <ul style={doctorListStyle}>
                    {patients.slice(0, 4).map((patients, index) => (
                        <li key={index} style={doctorItemStyle}>
                            <img src={patients.patient_profile_image || '/images/default-profile.jpg'} alt={`${patients.patient_first_name} ${patients.patient_last_name}`} style={doctorImageStyle} />
                            <div style={doctorInfoStyle}>
                                <span style={doctorNameStyle}>{`${patients.patient_first_name} ${patients.patient_last_name}`}</span>
                                <span style={doctorSpecialtyStyle}>{patients.caretaker_type}</span>
                            </div>
                            <FaEllipsisH onClick={() => handleMenuToggle(index)} style={{ cursor: 'pointer', marginLeft: 'auto' }} />
                {showMenu[index] && (
                  <Menu
                    onViewProfile={() => handleViewProfile(index)}
                    onMessage={() => handleMessage(index)}
                  />
                )}
                        </li>
                    ))}
                </ul>
                <Link href="/Patient/ViewPatientList">
                    <a style={viewAllLinkStyle}>View All</a>
                </Link>
            </div>
           
        <div style={pieChartCardStyle}>
          <h3>Statistics</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
      <div style={appointmentListCardStyle}>
          <div style={appointmentListHeaderStyle}>
            <h4 style={{ fontWeight: 'bold' }}>Today's Appointments</h4>
          </div>
          <Link href="/Patient/ViewPatientList">
              <a style={bookAppointmentButtonStyle}>Book Appointment</a>
            </Link>
          <div className="table-container">
            {todayAppointments.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAppointments.map((appointment, index) => (
                    <tr key={index}>
                      <td>
                        {appointment.patient_profile_image}
                        {appointment.patient_name}
                      </td>
                      <td>
                        {appointment.caretaker_profile_image}
                        {appointment.doctor_name}
                      </td>
                      <td>
                    {moment(appointment.appointment_date).format('YYYY/MM/DD')}
                  </td>
                      <td>
                        {moment(appointment.slot_timing, 'HH:mm').format('hh:mm A')}
                      </td>
                      <td>
                          <FaEye className="view-icon" onClick={() => handleView(appointment)} />
                          <FaTrashAlt
                            className="delete-icon"
                            style={{ color: 'red', cursor: 'pointer', marginLeft: ' 15px' }}
                            onClick={() => handleDelete(appointment._id)}
                          />
                        </td>
                        
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-appointments">No appointments for today</div>
            )}
          </div>
          <Link href="/Appointment/ViewAppointments">
            <a style={viewAllLinkStyleAppointments}>View All Appointments</a>
          </Link>
        </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Appointment Details"
      >
        {selectedAppointment && (
          <div>
            <h2>Appointment Details</h2>
            <p><strong>Patient Name:</strong> {selectedAppointment.patient_name}</p>
            <p><strong>Doctor Name:</strong> {selectedAppointment.doctor_name}</p>
            <p><strong>Appointment Date:</strong> {moment(selectedAppointment.appointment_date).format('YYYY-MM-DD')}</p>
            <p><strong>Appointment Time:</strong>  {moment(selectedAppointment.slot_timing, 'HH:mm').format('hh:mm A')}</p>
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
          </div>
        )}
      </Modal>
      <style jsx>{`
  @media (max-width: 768px) {
    .horizontal-menu {
      flex-direction: column;
    }
    .doctorListCardStyle, .appointmentListCardStyle, .pieChartCardStyle {
      width: 100%;
      margin-bottom: 20px;
    }
    .containerStyle {
      grid-template-columns: 1fr;
    }
    .bookAppointmentButtonStyle {
      width: 100%;
      text-align: center;
    }
  }
  @media (max-width: 480px) {
    .imgStyle {
      width: 50px;
      height: 50px;
    }
    .numberStyle {
      font-size: 18px;
    }
  }
`}</style>

    </div>
  );
};

export default Users;
