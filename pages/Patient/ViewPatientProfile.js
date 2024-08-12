import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';
import Head from 'next/head';
import Header from '../Header';
import Topbar from '../topbar';
import { patient_details_by_id, update_patient } from '../../actions/patientprofileAction';
import { country_list } from '../../actions/countryAction';
import { state_list, state_list_by_country_id } from '../../actions/stateAction';
import { city_list, city_list_by_state_id } from '../../actions/cityAction';

const PatientProfile = () => {
  const defaultProfileImage = '/images/userLogo.jpeg';

  const [countryList, setCountryList] = useState([]);
  const [stateDetail, setStateDetail] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [values, setValues] = useState({
    patient_list: [],
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
    patient_main_address: '',
    patient_profile_image: defaultProfileImage,
    error: '',
    loading: false,
    message:'',
    showForm:false,
    address:{},
    countrydetail:[],
    statedetail:[],
    citydetail:[],
    isEditingPersonalInfo: false,
    isEditingAddress: false,
  });

  const { patient_list,patient_first_name, patient_last_name, patient_phone_number,patient_dob,patient_gender, patient_email, patient_address, patient_country_id, patient_state_id,patient_area_id, patient_pincode,patient_main_address, patient_profile_image,countrydetail,statedetail,citydetail,error,loading, isEditingPersonalInfo, isEditingAddress } = values;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (user_id === "" || user_id === null || user_id === undefined) {
        Router.push('/login');
      } else {
        loadPatientDetails(user_id);
      }
    }
  }, []);

  const loadPatientDetails = (user_id) => {
    country_list()
      .then(countrydata => {
        if (countrydata.error) {
          console.log(countrydata.error);
        } else {
          state_list().then(state => {
            if (state.error) {
              console.log(state.error);
            } else {
              city_list().then(city => {
                if (city.error) {
                  console.log(city.error);
                } else {
                  patient_details_by_id(user_id)
                    .then(data => {
                      if (data.error) {
                        console.log(data.error);
                        setValues({ ...values, error: data.error, loading: false });
                      } else {
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
                          patient_main_address: patientData.patient_main_address,
                          patient_profile_image: patientData.patient_profile_image || defaultProfileImage,
                          countrydetail: countrydata.admin_country_list,
                          statedetail: state.state_list,
                          citydetail: city.city_list,
                          loading: false
                        });
                      }
                    })
                    .catch(error => {
                      console.error('Error:', error);
                      setValues({ ...values, error: 'Error: Network request failed', loading: false });
                    });
                }
              });
            }
          });
        }
      });
  };

  const handleCountryChange = (admin_country_id) => {
    state_list_by_country_id(admin_country_id)
      .then(response => {
        setValues({
          ...values, patient_country_id: admin_country_id, stateDetail: response.state_list
        });
      })
      .catch(error => {
        console.error('Error fetching state list:', error);
      });
  };

  const handleChange = name => e => {
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    if (name === "patient_country_id") {
      state_list_by_country_id(value).then(data1 => {
        if (data1.error) {
          console.log(data1.error);
        } else {
          setValues({ ...values, stateDetail: data1.state_list, patient_country_id: value });
        }
      });
    }
    if (name === "patient_state_id") {
      city_list_by_state_id(value).then(data2 => {
        if (data2.error) {
          console.log(data2.error);
        } else {
          setValues({ ...values, cityList: data2.city_list, patient_state_id: value });
        }
      });
    }
  };

  const handleEditPersonalInfo = () => {
    setValues({ ...values, isEditingPersonalInfo: !isEditingPersonalInfo });
  };

  const handleEditAddress = () => {
    setValues({ ...values, isEditingAddress: !isEditingAddress });
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {dxsdfc
  //       setValues({ ...values, patient_profile_image: reader.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <>
      <Head>
        <title>Patient Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Topbar />

      <div className="container" style={{ marginTop: '10rem' }}>
     
        <Card className="mt-5" style={{ marginBottom: '1rem', marginLeft: '150px' }}>
          <Card.Body className="d-flex align-items-center">
            <div style={{ position: 'relative' }}>
              <img
                src={values.patient_profile_image}
                alt="User"
                className="user-photo"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '30%',
                  marginRight: '1rem'
                }}
              />
              {/* <Button
                variant="light"
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '25px',
                 
                  borderRadius: '10%',
                  padding: '1px',
                  width:'1px',
                  
                }}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <FaCamera />
              </Button>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div> */}
            </div>
            <div>
              <h4>{patient_first_name} {patient_last_name}</h4>
              <p className="text-muted mb-0" style={{ fontWeight: 500 }}>
                {patient_email}
              </p>
              <p className="text-muted" style={{ fontWeight: 500 }}>
                {patient_address}
              </p>
            </div>
          </Card.Body>
        </Card>

        <Card className="mt-2" style={{ marginBottom: '1rem', marginLeft: '150px' }}>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h5>Personal Information</h5>
              <Button variant="outline-primary" onClick={handleEditPersonalInfo}>
                {isEditingPersonalInfo ? 'Save' : 'Edit'}
              </Button>
            </div>
            <div className="row" style={{ marginTop: '1rem' }}>
              <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>First Name</p>
                {isEditingPersonalInfo ? (
                  <Form.Control
                    type="text"
                    name="patient_first_name"
                    value={patient_first_name}
                    onChange={handleChange('patient_first_name')}
                  />
                ) : (
                  <p>{patient_first_name}</p>
                )}
              </div>
              <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>Last Name</p>
                {isEditingPersonalInfo ? (
                  <Form.Control
                    type="text"
                    name="patient_last_name"
                    value={patient_last_name}
                    onChange={handleChange('patient_last_name')}
                  />
                ) : (
                  <p>{patient_last_name}</p>
                )}
              </div>
              <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>Email</p>
                {isEditingPersonalInfo ? (
                  <Form.Control
                    type="email"
                    name="patient_email"
                    value={patient_email}
                    onChange={handleChange('patient_email')}
                  />
                ) : (
                  <p>{patient_email}</p>
                )}
              </div>
              <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>Phone Number</p>
                {isEditingPersonalInfo ? (
                  <Form.Control
                    type="text"
                    name="patient_phone_number"
                    value={patient_phone_number}
                    onChange={handleChange('patient_phone_number')}
                  />
                ) : (
                  <p>{patient_phone_number}</p>
                )}
              </div>
              {/* <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>Date of Birth</p>
                {isEditingPersonalInfo ? (
                  <Form.Control
                    type="date"
                    name="patient_dob"
                    value={patient_dob}
                    onChange={handleChange('patient_dob')}
                  />
                ) : (
                  <p>{patient_dob}</p>
                )}
              </div>
              <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>Gender</p>
                {isEditingPersonalInfo ? (
                  <Form.Control
                    as="select"
                    name="patient_gender"
                    value={patient_gender}
                    onChange={handleChange('patient_gender')}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                ) : (
                  <p>{patient_gender}</p>
                )}
              </div> */}
            </div>
          </Card.Body>
        </Card>

        <Card className="mt-2" style={{ marginBottom: '1rem', marginLeft: '150px' }}>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h5>Address Information</h5>
              <Button variant="outline-primary" onClick={handleEditAddress}>
                {isEditingAddress ? 'Save' : 'Edit'}
              </Button>
            </div>
            <div className="row" style={{ marginTop: '1rem' }}>
              <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>Address</p>
                {isEditingAddress ? (
                  <Form.Control
                    type="text"
                    name="patient_address"
                    value={patient_address}
                    onChange={handleChange('patient_address')}
                  />
                ) : (
                  <p>{patient_address}</p>
                )}
              </div>
              <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>Country</p>
                {isEditingAddress ? (
                  <Form.Control
                    as="select"
                    name="patient_country_id"
                    value={patient_country_id}
                    onChange={handleChange('patient_country_id')}
                  >
                    <option value="">Select Country</option>
                    {countrydetail.map(country => (
                      <option key={country.admin_country_id} value={country.admin_country_id}>
                        {country.admin_country_name}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <p>{countrydetail.find(country => country.admin_country_id === patient_country_id)?.admin_country_name}</p>
                )}
              </div>
              <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>State</p>
                {isEditingAddress ? (
                  <Form.Control
                    as="select"
                    name="patient_state_id"
                    value={patient_state_id}
                    onChange={handleChange('patient_state_id')}
                  >
                    <option value="">Select State</option>
                    {stateDetail.map(state => (
                      <option key={state.admin_state_id} value={state.admin_state_id}>
                        {state.admin_state_name}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <p>{stateDetail.find(state => state.admin_state_id === patient_state_id)?.admin_state_name}</p>
                )}
              </div>
              <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>City</p>
                {isEditingAddress ? (
                  <Form.Control
                    as="select"
                    name="patient_area_id"
                    value={patient_area_id}
                    onChange={handleChange('patient_area_id')}
                  >
                    <option value="">Select City</option>
                    {cityList.map(city => (
                      <option key={city.admin_area_id} value={city.admin_area_id}>
                        {city.admin_area_name}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <p>{cityList.find(city => city.admin_area_id === patient_area_id)?.admin_area_name}</p>
                )}
              </div>
              {/* <div className="col-md-6" style={{ marginBottom: '1rem' }}>
                <p className="text-muted" style={{ fontWeight: 500 }}>Pincode</p>
                {isEditingAddress ? (
                  <Form.Control
                    type="text"
                    name="patient_pincode"
                    value={patient_pincode}
                    onChange={handleChange('patient_pincode')}
                  />
                ) : (
                  <p>{patient_pincode}</p>
                )}
              </div> */}
            </div>
         
          </Card.Body>
        </Card>
        </div>
     
    </>
  );
};

export default PatientProfile;
