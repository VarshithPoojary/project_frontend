import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../Header';
import Topbar from '../topbar';
import Router from 'next/router';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useRouter } from 'next/router';
import { FaUser, FaCalendarAlt, FaUserTag, FaClock, FaStethoscope, FaTrash, FaCheck, FaTimes, FaMoneyBillWave,FaCheckCircle,FaMoneyBillAlt,
  FaClipboardList } from 'react-icons/fa';
import { patient_details_by_id } from '../../actions/patientprofileAction';
import { appointment_list_by_patientId, fetch_slots_by_date,delete_appointment,update_appointment_status } from '../../actions/appointmentAction';

const PatientProfile = () => {
  const router = useRouter();
  const defaultProfileImage = '/images/userLogo.jpeg';
  const [appointments, setAppointments] = useState([]);
    const [msg, setMsg] = useState('');
    const [activeTab, setActiveTab] = useState('Approved');
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    patient_first_name: '',
    patient_last_name: '',
    patient_phone_number: '',
    patient_dob: '',
    patient_gender: '',
    patient_email: '',
    patient_address: '',
    patient_country_id: '',
    patient_state_id: '',
    patient_area_id: '',
    patient_pincode: '',
    patient_profile_image: defaultProfileImage,
  });

  const {
    patient_first_name,
    patient_last_name,
    patient_phone_number,
    patient_dob,
    patient_gender,
    patient_email,
    patient_address,
    patient_country_id,
    patient_state_id,
    patient_area_id,
    patient_pincode,
    patient_profile_image,
  } = values;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        Router.push('/login');
      } else {
        loadPatientDetails();
      }
    }
  }, [router.query.patientId]);

  const loadPatientDetails = () => {
    patient_details_by_id(router.query.patientId)
      .then((data) => {
        if (data && data.patient_list.length > 0) {
          const patientData = data.patient_list[0];
          setValues({
            ...values,
            patient_first_name: patientData.patient_first_name,
            patient_last_name: patientData.patient_last_name,
            patient_phone_number: patientData.patient_phone_number,
            patient_dob: patientData.patient_dob,
            patient_gender: patientData.patient_gender,
            patient_email: patientData.patient_email,
            patient_address: patientData.patient_address,
            patient_country_id: patientData.patient_country_id,
            patient_state_id: patientData.patient_state_id,
            patient_area_id: patientData.patient_area_id,
            patient_pincode: patientData.patient_pincode,
            patient_profile_image: patientData.patient_profile_image || defaultProfileImage,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBackClick = () => {
    Router.push('/dashboard');
  };
  useEffect(() => {
    loadAppointments();
}, [activeTab]);

const loadAppointments = () => {
  appointment_list_by_patientId(router.query.patientId).then(data => {
      if (data && data.appointment_list.length > 0) {
          const appointmentData = data.appointment_list;
          const sortedAppointments = appointmentData.sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date));

          setValues(prevValues => ({
              ...prevValues,
              appointment_date: sortedAppointments[0].appointment_date,
              slot_time: sortedAppointments[0].slot_time,
              appointments: sortedAppointments
          }));

          const filteredAppointments = data.appointment_list.filter(appointment => {
              if (activeTab === 'Approved') {
                  return appointment.status === 'Accepted';
              } else if (activeTab === 'Rejected') {
                  return appointment.status === 'Rejected';
              } else if (activeTab === 'Pending') {
                  return appointment.status === 'Active';
              } else if (activeTab === 'Done') {
                  return appointment.status === 'Done';
              } else {
                  return appointment.status === 'Canceled';
              }
          });
          setAppointments(filteredAppointments);
      }
  }).catch(error => {
      console.error('Error fetching appointment details:', error);
  });

  // const slotData = { date: values.appointment_date, caretaker_id: router.query.doctorId };
  // fetch_slots_by_date(slotData).then(slotsData => {
  //     if (slotsData && !slotsData.error) {
  //         // Handle slots data
  //         console.log('Slots data:', slotsData);
  //     } else {
  //         console.error('Error fetching slots:', slotsData.msg);
  //     }
  // }).catch(error => {
  //     console.error('Error fetching slots:', error);
  // });
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
          loadPatientDetails();
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
          loadPatientDetails();
          setMsg(`Appointment with ID "${appointmentId}" rejected successfully.`);
          setTimeout(() => {
            
              setMsg('');
          }, 2000);
       
      }
  } catch (error) {
      console.error('Error rejecting appointment:', error);
  }
};
const handleComplete = (appointmentId) => {
  router.push({
    pathname: '/AddDescription',
    query: { appointmentId: appointmentId,status: 'Done' }
  });
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




  return (
    <>
      <Head>
        <title>Patient Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Topbar />

      <div className="container">
        <div className="column">
          <div className="profile-card">
            <img
              src={values.patient_profile_image}
              alt="User"
              className="profile-image"
            />
            <div className="profile-details">
              <h4>{patient_first_name} {patient_last_name}</h4>
              <div className="details-row">
                <div>
                  <p><strong>Phone:</strong> {patient_phone_number}</p>
                  <p><strong>DOB:</strong> {patient_dob}</p>
                  <p><strong>Gender:</strong> {patient_gender}</p>
                  <p><strong>Email:</strong> {patient_email}</p>
                </div>
                <div>
                  <p><strong>Address:</strong> {patient_address}</p>
                  <p><strong>Country:</strong> {patient_country_id}</p>
                  <p><strong>State:</strong> {patient_state_id}</p>
                  <p><strong>Area:</strong> {patient_area_id}</p>
                  <p><strong>Pincode:</strong> {patient_pincode}</p>
                </div>
              </div>
              <div className="buttons-row">
                <Button variant="primary" className="edit-button" onClick={handleEditClick}>Edit</Button>
                <Button variant="secondary" onClick={handleBackClick}>Back</Button>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <img src="/images/crossicon.png" alt="Close" className="close-icon" onClick={handleCloseModal} />
        <Modal.Title>Edit Options</Modal.Title>
        <Modal.Body>
          <p>What would you like to edit?</p>
          <div className="modal-buttons">
            <Link href={`/Patient/EditPatient?patientId=${router.query.patientId}`}>
              <Button variant="primary" style={{ marginRight: '10px' }}>Edit Profile</Button>
            </Link>
            <Link href={`/Patient/EditPatientPasswordPage?patientId=${router.query.patientId}`}>
              <Button variant="secondary">Edit Password</Button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>

      <div className="appointments-container">
                    <h4 className="title">Appointment Status</h4>
                    <div className="tabs">
                        <button className={`tab ${activeTab === 'Approved' ? 'active' : ''}`} onClick={() => setActiveTab('Approved')}>Approved</button>
                        <button className={`tab ${activeTab === 'Rejected' ? 'active' : ''}`} onClick={() => setActiveTab('Rejected')}>Rejected</button>
                        <button className={`tab ${activeTab === 'Pending' ? 'active' : ''}`} onClick={() => setActiveTab('Pending')}>Pending</button>
                        <button className={`tab ${activeTab === 'Done' ? 'active' : ''}`} onClick={() => setActiveTab('Done')}>Completed</button>
                        <button className={`tab ${activeTab === 'Canceled' ? 'active' : ''}`} onClick={() => setActiveTab('Canceled')}>Canceled</button>
                    </div>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <div className="appointments-list">
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
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
                                    {activeTab === 'Approved' && (
            <div className="actions">
              <button className="btn-payment" onClick={() => handlePayment(appointment._id)}>
                <FaMoneyBillWave style={{ marginRight: '8px' }} />
                Payment
              </button>
              <button className="btn-completed" onClick={() => handleComplete(appointment._id)}>
                <FaCheckCircle style={{ marginRight: '8px' }} />
                Completed
              </button>
              <button className="btn-cancel" onClick={() => handleCancel(appointment)}>
                <FaTrash style={{ marginRight: '8px' }} />
                Cancel
              </button>
            </div>
          )}
          {activeTab === 'Pending' && (
            <div className="actions">
              <button className="btn-accept" onClick={() => handleApprove(appointment._id)}>
                <FaCheck />
              </button>
              <button className="btn-reject" onClick={() => handleReject(appointment._id)}>
                <FaTimes />
              </button>
            </div>
          )}
          {activeTab !== 'Approved' && activeTab !== 'Pending' && (
            <div className="actions">
              <button className="btn-cancel" onClick={() => handleCancel(appointment)}>
                <FaTrash style={{ marginRight: '8px' }} />
                Cancel
              </button>
            </div>
          )}
        </div>
      ))
    ) : (
      <p style={{ textAlign: 'center' }}>No Appointments Found</p>
    )}
  </div>
</div>

           
      
      <style jsx>{`
        .container {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .column {
          display: flex;
          flex-direction: column;
          margin-top: 250px;
          justify-content: center;
          width: 85%;
          height:100px;
        }
        .profile-card {
          background-color: #f2f2f3;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
          padding: 1.5rem;
        margin-left:40px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 10%;
          margin-top: -150px;
          margin-right: 2rem;
        }
        .profile-details {
          flex: 2;
        }
        .details-row {
          display: flex;
          gap: 25px;
          justify-content: space-between;
        }
        .buttons-row {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
          gap:50px;
          align-items: center;
        }
          
        .edit-button {
          margin-right: 20px;
          width:20px;
        }
        .close-icon {
          width: 20px;
          height: 20px;
          cursor: pointer;
          margin-left: 470px;
        }
        .modal-buttons {
          display: flex;
          justify-content: space-between;
          width:40px;
        }
          .title {
                    text-align: center;
                    margin-top: 180px;
                    margin-left:-700px;
                }

                .tabs {
                    margin: 10px;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 30px;
                }
                .tab {
                    background-color: #f2f2f3;
                    border: none;
                    padding: 10px 20px;
                    
                    cursor: pointer;
                    transition: background-color 0.2s;
                    margin: 0 10px;
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
                    width:1090px;
                    margin-left: 300px;
                    justify-content: space-between;
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
                    .btn-completed {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f0ebfa; 
                    color: #6F42C1;
                    padding: 0.375rem 0.75rem;
                    font-size: 15px;
                    border: none;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    }
                    .btn-payment{
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f0ebfa; 
                    color: #6F42C1;
                    padding: 0.375rem 0.75rem;
                    font-size: 15px;
                    border: none;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    transition: background-color 0.2s;}
                .btn-cancel {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f0ebfa; 
                    color: #6F42C1;
                    padding: 0.375rem 0.75rem;
                    font-size: 15px;
                    border: none;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .btn-cancel:hover {
                    background-color: #d8c9f2; 
                }
                    .btn-completed:hover {
                    background-color: #d8c9f2; 
                }
                    .btn-payment:hover {
                    background-color: #d8c9f2; 
                }
                .btn-accept {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #28a745; 
                    color: white;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-right: 10px;
                }
                .btn-reject {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #dc3545; 
                    color: white;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .alert-success {
                    color: #155724;
                    background-color: #d4edda;
                    border-color: #c3e6cb;
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 10px;
                    text-align: center;
                }
      `}</style>
    </>
  );
};

export default PatientProfile;
