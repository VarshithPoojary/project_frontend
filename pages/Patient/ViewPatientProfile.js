import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../Header';
import Topbar from '../topbar';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { patient_details_by_id, update_patient, patient_personal_update } from '../../actions/patientprofileAction';
import { country_list } from '../../actions/countryAction';
import { state_list, state_list_by_country_id } from '../../actions/stateAction';
import { city_list, city_list_by_state_id } from '../../actions/cityAction';

const PatientProfile = () => {
  const router = useRouter();
  const defaultProfileImage = '/images/userLogo.jpeg';

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
    countrydetail: [],
    statedetail: [],
    citydetail: [],
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
    countrydetail,
    statedetail,
    citydetail,
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
    country_list().then(countrydata => {
      state_list().then(state => {
        city_list().then(city => {
          patient_details_by_id(router.query.patientId).then(data => {
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
                countrydetail: countrydata.admin_country_list,
                statedetail: state.state_list,
                citydetail: city.city_list,
              });
            }
          }).catch(error => {
            console.error('Error:', error);
          });
        });
      });
    });
  };

  return (
    <>
      <Head>
        <title>Patient Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Topbar />

      <div className="container" style={{ marginTop: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',}}>
        <Card className="mt-5" style={{ marginBottom: '1rem', backgroundColor: '#f8f9fa', width: '300px',marginLeft:'-500px' }}>
          <Card.Body className="d-flex align-items-center flex-column">
            <img
              src={values.patient_profile_image}
              alt="User"
              className="user-photo"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '30%',
                marginBottom: '1rem'
              }}
            />
            <h4>{patient_first_name} {patient_last_name}</h4>
          </Card.Body>
        </Card>

        <Card className=" personal-details-card" style={{ backgroundColor: '#f8f9fa', width: '500px',height:'255px',marginLeft:'400px',marginTop:'-270px' }}>
          <Card.Body>
            <h5>Personal Details</h5>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>First Name: {patient_first_name}</p>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>Last Name: {patient_last_name}</p>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>Phone Number: {patient_phone_number}</p>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>DOB: {patient_dob}</p>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>Gender: {patient_gender}</p>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>Email: {patient_email}</p>
          </Card.Body>
        </Card>

        <Card className="mt-2" style={{ backgroundColor: '#f8f9fa' }}>
          <Card.Body>
            <h5>Address Details</h5>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>Address: {patient_address}</p>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>
              Country: {countrydetail.find(country => country.admin_country_id === patient_country_id)?.admin_country_name}
            </p>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>
              State: {statedetail.find(state => state.admin_state_id === patient_state_id)?.admin_state_name}
            </p>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>
              Area: {citydetail.find(city => city.admin_area_id === patient_area_id)?.admin_area_name}
            </p>
            <p className="text-muted mb-0" style={{ fontWeight: 500 }}>Pincode: {patient_pincode}</p>
          </Card.Body>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        {/* <Link href="/EditPatient"> */}
          <Button variant ="primary" style={{ marginRight: '10px' }}>Edit</Button>
          <Button variant="secondary">Back</Button>
          {/* </Link> */}
        </div>
      </div>

      <style jsx>{`
        .container {
          background-color: #f8f9fa;
        }
        .personal-details p {
          margin-bottom: 0.5rem;
        }
        .personal-details-card {
          margin-top: -80px;
        }
      `}</style>
    </>
  );
};

export default PatientProfile;
