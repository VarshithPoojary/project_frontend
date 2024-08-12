import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Header from './Header';
import Topbar from './topbar';
import Head from 'next/head';
import { FaChevronRight } from 'react-icons/fa';
import { appointment_list } from '../actions/appointmentAction';
import { patient_list } from '../actions/patientprofileAction';

const MedicalRecord = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientList, setPatientList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    fetchCompletedAppointments();
    fetchPatientList();
  }, []);

  const fetchCompletedAppointments = () => {
    appointment_list()
      .then(data => {
        const completedPatients = data.appointment_list.filter(appointment => appointment.status === 'Done');
        const sortedAppointments = completedPatients.sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date));
        setAppointmentList(sortedAppointments);
        setPatientCount(completedPatients.length);
      })
      .catch(err => console.error('Error fetching completed appointments:', err));
  };

  const fetchPatientList = () => {
    patient_list()
      .then(data => {
        if (data.patient_list) {
          setPatientList(data.patient_list);
          setPatientCount(data.patient_list.length);
        }
      })
      .catch(err => console.error('Error fetching patient list:', err));
  };

  const handlePatientClick = (patient, index) => {
    if (selectedPatient && selectedPatient._id === patient._id) {
      setShowDetails(!showDetails);
    } else {
      setSelectedPatient({ ...patient, index: index + 1 });
      setShowDetails(true);
    }
  };

  const handleInvoice = (id) => {
    Router.push({
      pathname: '/Invoice',
      query: {
        _id: id,
      }
    });
  };

  return (
    <div>
      <Head>
        <title>Medical Record</title>
      </Head>
      <Header />
      <Topbar />
      <div className="container" style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh', marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <center><h2 style={{ marginTop: '12px' }}><b>MEDICAL HISTORY</b></h2></center>
        <div className="mainCard" style={{ display: 'flex', maxWidth: '1200px', width: '100%', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginTop: '20px', marginLeft: '100px', position: 'relative' }}>
          <div className="row" style={{ display: 'flex', width: '100%' }}>
            <div className="patientList" style={{ backgroundColor: '#f9f9f9', flex: '1', height: '550px', overflowY: 'scroll', padding: '20px', borderRight: '1px solid #e0e0e0' }}>
              <h4 className="title" style={{ marginBottom: '20px', color: '#555', fontWeight: 'bold', marginLeft: '5px' }}>Patients ({patientCount})</h4>
              {appointmentList.map((patient, index) => (
                <div
                  key={patient._id}
                  className="patientItem"
                  style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #e0e0e0', cursor: 'pointer', transition: 'background-color 0.3s ease', backgroundColor: '#f5f5f5', borderRadius: '5px', marginBottom: '10px' }}
                  onClick={() => handlePatientClick(patient, index)}
                >
                  <div style={{ position: 'relative', marginRight: '10px' }}>
                    <img src={patient.patient_profile_img} alt={patient.patient_name} className="patientPhoto" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    
                  </div>
                  <div className="patientInfo" style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                    <h6 className="patientName" style={{ marginBottom: '0', color: '#333', fontWeight: 'bold' }}>{patient.patient_name}</h6>
                    <small className="appointmentDate" style={{ color: '#777' }}>{patient.appointment_date}</small>
                  </div>
                  <FaChevronRight />
                </div>
              ))}
            </div>
            <div className={`patientDetails ${!showDetails && 'hidden'}`} style={{ flex: '2', padding: '20px', overflowY: 'auto', transition: 'opacity 0.5s ease', opacity: showDetails ? 1 : 0 }}>
              {selectedPatient && showDetails ? (
                <div>
                  <div className="patientHeader" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <img src={selectedPatient.patient_profile_img} alt={selectedPatient.patient_name} className="patientPhotoLarge" style={{ width: '100px', height: '100px', borderRadius: '10%', marginRight: '20px', marginTop: '-20px' }} />
                    <div>
                      <h2 className="patientNameLarge" style={{ marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>{selectedPatient.patient_name}</h2>
                      <h4 className="doctorName" style={{ marginBottom: '5px', color: '#555' }}>{selectedPatient.doctor_name}</h4>
                      <p className="slotTime" style={{ marginBottom: '5px', color: '#777' }}>{selectedPatient.slot_timing}</p>
                      <span className="statusLabel" style={{ display: 'none' }}>{selectedPatient.status}</span>
                    </div>
                  </div>
                  <div className="patientMedicalInfo" style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <div className="thinRectangleCard" style={{ padding: '10px', backgroundColor: 'white', width: '970px', height: '350px', border: '1px solid black', whiteSpace: 'pre-line',overflowY: 'auto' }}>
                      <p className="patientAddress" style={{ marginBottom: '5px', color: '#777' }}>{selectedPatient.disclaimer}</p>
                    </div>
                  </div>
                  <button onClick={() => handleInvoice(selectedPatient._id)}
                    style={{
                      backgroundColor: '#9370DB',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      marginTop: '20px'
                    }}>View Bill</button>
                </div>
              ) : (
                <div className="placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <h2>Medical Records</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedPatient && (
        <div className="patientCountBox" style={{ position: 'absolute', top: '153px', right: '160px', backgroundColor: '#D3BCE8', color: '#4a148c', padding: '10px 20px', borderRadius: '1px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
          {selectedPatient.index} / {patientCount}
        </div>
      )}
    </div>
  );
};

export default MedicalRecord;
