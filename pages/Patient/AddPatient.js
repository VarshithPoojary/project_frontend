import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Router from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../Header';
import Topbar from '../topbar';
import { add_patient } from '../../actions/patientprofileAction';

const AddPatient = () => {
    const defaultProfileImage = '/images/userLogo.jpeg';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState('');
    const [mainAddress, setMainAddress] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [values,setValues]=useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        address: '',
        country: '',
        state: '',
        area: '',
        pincode: '',
        mainAddress: '',
        
    });

    const onFileChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        alert(JSON.stringify(e))
        e.preventDefault();
        setIsLoading(true);

        const validationErrors = {};

        if (!/^[a-zA-Z]+$/.test(firstName)) {
            validationErrors.firstName = 'Please enter a valid first name.';
        }
    
        if (!/^[a-zA-Z]+$/.test(lastName)) {
            validationErrors.lastName = 'Please enter a valid last name.';
        }

        if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
            validationErrors.phoneNumber = 'Please enter a valid phone number.';
        }
    
        if (!dateOfBirth) {
            validationErrors.dateOfBirth = 'Please enter your date of birth.';
        }
    
        if (!gender) {
            validationErrors.gender = 'Please select your gender.';
        }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Please enter a valid email address.';
        }
    
        if (!address.trim()) {
            validationErrors.address = 'Please enter your address.';
        }
    
        if (!country) {
            validationErrors.country = 'Please select your country.';
        }
    
        if (!state) {
            validationErrors.state = 'Please select your state.';
        }
    
        if (!area) {
            validationErrors.area = 'Please select your area.';
        }
    
        if (!/^\d{6}$/.test(pincode)) {
            validationErrors.pincode = 'Please enter a valid pincode.';
        }
    
        if (!mainAddress.trim()) {
            validationErrors.mainAddress = 'Please enter your main address.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            setTimeout(() => {
                setErrors({});
            }, 10000);
            return;
        }

        try {
            var patient_created_by_id= localStorage.getItem('id');
            const formData = new FormData();
            formData.append('patient_first_name', firstName);
            formData.append('patient_last_name', lastName);
            formData.append('patient_phone_number', phoneNumber);
            formData.append('patient_dob', dateOfBirth);
            formData.append('patient_gender', gender);
            formData.append('patient_email', email);
            formData.append('patient_address', address);
            formData.append('patient_country_id', country);
            formData.append('patient_state_id', state);
            formData.append('patient_area_id', area);
            formData.append('patient_pincode', pincode);
            formData.append('patient_main_address', mainAddress);
            formData.append('demoimg', profilePhoto);
            formData.append('patient_created_by_id', patient_created_by_id);

            add_patient(formData).then(response => {
                if (response.msg) {
                    setErrorMessage(response.msg); 
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 5000);
                } else if (response.error) {
                    setValues({ ...values });
                } else {
                    setIsSuccess(true);
                    setSuccessMessage('Added successfully!');
                    setTimeout(() => {
                        Router.push(`/Patient/ViewPatientList`);
                        console.log('Response from backend:', response.data);
                    }, 1000);
                }
            });
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error saving data. Please try again.');
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('Form submitted:', {
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            gender,
            email,
            address,
            country,
            state,
            area,
            pincode,
            mainAddress,
            profilePhoto,
        });
        
    
        setIsSuccess(false);
        setIsLoading(false);

    };

        const Cancel = () => {
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setDateOfBirth('');
            setGender('');
            setEmail('');
            setAddress('');
            setCountry('');
            setState('');
            setArea('');
            setPincode('');
            setMainAddress('');
            setProfilePhoto(null);
            setErrors({}); 
            setIsLoading(false);
            setIsSuccess(false);
            setSuccessMessage('');
            setErrorMessage('');
          };
        
    
    return (
        <>
          <Head>
            <title>Add Patient</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="title" content="Registration" />
            <link rel="icon" href="/images/title_logo.png" />
          </Head>
    
          <Topbar />
          <Header />
    
          <div className="content-page">
            <div className="content">
              <div className="container-fluid">
                <div className="card mb-4" style={{ width: "900px", marginTop: "40px" }}>
                  <div className="card-header">Add Patient here</div>
                  <Scrollbars style={{ height: 300, maxHeight: 500 }}>
                    <div className="card-body" style={{ maxWidth: "700px" }}>
    
                      <form onSubmit={handleSubmit}>
    
    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="firstName" className="small mb-1">First Name<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="text"
                              id="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="lastName" className="small mb-1">Last Name<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="text"
                              id="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="phoneNumber" className="small mb-1">Phone Number<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="text"
                              id="phoneNumber"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="dateOfBirth" className="small mb-1">Date of Birth<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="date"
                              id="dateOfBirth"
                              value={dateOfBirth}
                              onChange={(e) => setDateOfBirth(e.target.value)}
                              required
                            />
                          </div>
                        </div>
    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="gender" className="small mb-1">Gender<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              required
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="email" className="small mb-1">Email<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="address" className="small mb-1">Address<span style={{ color: 'red' }}>*</span>:</label>
                            <textarea
                              className='form-control'
                              id="address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                            ></textarea>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="country" className="small mb-1">Country<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="country"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              required
                            >
                              {/* Add country options */}
                            </select>
                          </div>
                        </div>
    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="state" className="small mb-1">State<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="state"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              required
                            >
                              {/* Add state options */}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="area" className="small mb-1">Area<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="area"
                              value={area}
                              onChange={(e) => setArea(e.target.value)}
                              required
                            >
                              {/* Add area options */}
                            </select>
                          </div>
                        </div>
    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="pincode" className="small mb-1">Pincode<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="text"
                              id="pincode"
                              value={pincode}
                              onChange={(e) => setPincode(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="mainAddress" className="small mb-1">Main Address<span style={{ color: 'red' }}>*</span>:</label>
                            <textarea
                              className='form-control'
                              id="mainAddress"
                              value={mainAddress}
                              onChange={(e) => setMainAddress(e.target.value)}
                              required
                            ></textarea>
                          </div>
                        </div>
    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="profilePhoto" className="small mb-1">Profile Photo:</label>
                            <input
                              type="file"
                              className='form-control'
                              id="profilePhoto"
                              onChange={(e) => setProfilePhoto(e.target.value)}
                            />
                          </div>
                        </div>
    
                        <div className="form-group">
                          <div className="row justify-content-center">
                            <div className="col text-center">
                              <button className='registration-button' type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Submit'}
                              </button>
                              {isSuccess && <div className="success-message">Form submitted successfully!</div>}
                              {errorMessage && <div className="error-message">{errorMessage}</div>}
                            </div>
                          </div>
                        </div>
    
                        <div className="col text-center">
                          <button className='registration-cancel-button' onClick={Cancel}>Clear</button>
                        </div>
                      </form>
                    </div>
                  </Scrollbars>
                </div>
              </div>
            </div>
          </div>
        </>
      );

      
}

export default AddPatient;

    