import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Router from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../Header';
import Topbar from '../topbar';
import { add_patient } from '../../actions/patientprofileAction';
import { country_list } from '../../actions/countryAction';
import { state_list_by_country_id } from '../../actions/stateAction';
import { city_list_by_state_id } from '../../actions/cityAction';

const AddPatient = () => {
    const defaultProfileImage = '/images/userLogo.jpeg';
    const [countryList, setCountryList] = useState([]);
    const [stateDetail, setStateDetail] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [countryCode, setCountryCode] = useState('91'); 
    const [status, setStatus] = useState('true'); 
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [mainAddress, setMainAddress] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        latitude:'',
        longitude:'',
        mainAddress: '',
        status:'',
        patient_password:''
        
    });

    const [passwordValidations, setPasswordValidations] = useState({
      upperCase: false,
      lowerCase: false,
      digit: false,
      specialChar: false,
      length: false,
  });

    useEffect(() => {
      loadCountryDetail();  
  }, []);

  const loadCountryDetail = () => {
      country_list()
          .then(response => {
              if (response.error) {
                  console.log(response.error);
              } else {
                  setCountryList(response.admin_country_list);
              }
          })
          .catch(error => console.error(error));
  };

  const handleCountryChange = (admin_country_id) => {
      state_list_by_country_id(admin_country_id)
          .then(response => {
              setCountry(admin_country_id)
              setStateDetail(response.state_list);
          })
          .catch(error => {
              console.error('Error fetching state list:', error);
          });
  };

  const handleStateChange = (admin_state_id) => {
      city_list_by_state_id(admin_state_id)
          .then(response => {
              setState(admin_state_id)
              setCityList(response.city_list);
          })
          .catch(error => {
              console.error('Error fetching city list:', error);
          });
  };



    const onFileChange = (e) => {
      setProfileImage(e.target.files[0]);
    }

    useEffect(() => {
      validatePassword(password);
  }, [password]);

  const validatePassword = (password) => {
    const validations = {
        upperCase: /[A-Z]/.test(password),
        lowerCase: /[a-z]/.test(password),
        digit: /[0-9]/.test(password),
        specialChar: /[^A-Za-z0-9]/.test(password),
        length: password.length >= 8 && password.length <= 16,
    };
    setPasswordValidations(validations);
};

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

        const validationErrors = {};
        if (!firstName.trim()) {
            validationErrors.firstName = 'Please enter your first name.';
        }
        if (!lastName.trim()) {
            validationErrors.lastName = 'Please enter your last name.';
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

        if (!password) {
          validationErrors.password = 'Please enter your password.';
      }

      if (!confirmPassword) {
          validationErrors.confirmPassword = 'Please confirm your password.';
      }

      if (password !== confirmPassword) {
          validationErrors.confirmPassword = 'Passwords do not match.';
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
            formData.append('patient_country_code', countryCode);
            formData.append('patient_dob', dateOfBirth);
            formData.append('patient_gender', gender);
            formData.append('patient_email', email);
            formData.append('patient_address', address);
            formData.append('patient_country_id', country);
            formData.append('patient_state_id', state);
            formData.append('patient_area_id', area);
            formData.append('patient_pincode', pincode);
            formData.append('patient_latitude', latitude);
            formData.append('patient_longitude', longitude);
            formData.append('patient_register_status', status);
            formData.append('patient_main_address', mainAddress);
            formData.append('password', password);
            formData.append('demoimg',  profileImage);
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
            latitude,
            longitude,
            mainAddress,
            profileImage,
            status
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
            setLatitude('');
            setLongitude('');
            setMainAddress('');
            setProfileImage(null);
            setErrors({}); 
            setIsLoading(false);
            setIsSuccess(false);
            setSuccessMessage('');
            setErrorMessage('');
          };

          const togglePasswordVisibility = () => {
            setValues({ ...values, showPassword: !values.showPassword });
        };
    
        const toggleConfirmPasswordVisibility = () => {
            setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
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
                <div className="card mb-4" style={{ backgroundColor:"white",width: "900px", marginTop: "40px" }}>
                  <div className="card-header" style={{ background: "#D3C8F1" ,color:"black"}}>Add Patient here</div>
                  <Scrollbars style={{ height: 500, maxHeight: 450 }}>
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
                              onChange={(e) => setFirstName(e.target.value)}/>
                              {errors.firstName && <div className="error-message" style={{color:'red'}}>{errors.firstName}</div>}
                            </div>

                
                          <div className="col-md-6">
                            <label htmlFor="lastName" className="small mb-1">Last Name<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="text"
                              id="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}/>
                               {errors.lastName && <div className="error-message" style={{color:'red'}}>{errors.lastName}</div>}
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
                              onChange={(e) => setPhoneNumber(e.target.value)} />
                              {errors.phoneNumber && <div className="error-message" style={{color:'red'}}>{errors.phoneNumber}</div>}
                          </div>


                          <div className="col-md-6">
                            <label htmlFor="dateOfBirth" className="small mb-1">Date of Birth<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="date"
                              id="dateOfBirth"
                              value={dateOfBirth}
                              onChange={(e) => setDateOfBirth(e.target.value)}/>
                               {errors.dateOfBirth && <div className="error-message" style={{color:'red'}}>{errors.dateOfBirth}</div>}
                          </div>
                        </div>
    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="gender" className="small mb-1">Gender<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}>
                                {errors.gender && <div className="error-message" style={{color:'red'}}>{errors.gender}</div>}
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
                              onChange={(e) => setEmail(e.target.value)}/>
                             {errors.email && <div className="error-message" style={{color:'red'}}>{errors.email}</div>}
                          </div>
                        </div>
    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="address" className="small mb-1">Address<span style={{ color: 'red' }}>*</span>:</label>
                            <textarea
                              className='form-control'
                              id="address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}></textarea>
                              {errors.address && <div className="error-message" style={{color:'red'}}>{errors.address}</div>}
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="country" className="small mb-1">Country<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="country"
                              onChange={(e) => handleCountryChange(e.target.value)}>
                              <option value="">Select Country</option>
                              {countryList.map(country => (
                                  <option key={country._id} value={country._id}>{country.admin_country_name}</option>
                              ))}
                          </select>
                          {errors.country && <div className="error-message" style={{color:'red'}}>{errors.country}</div>}
                          </div>
                          </div>
                     

    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="state" className="small mb-1">State<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="state"
                              onChange={(e) => handleStateChange(e.target.value)}>
                                <option value="">Select State</option>
                                {stateDetail.map(state => (
                                    <option key={state._id} value={state._id}>{state.admin_state_name}</option>
                                ))}
                            </select>
                            {errors.state && <div className="error-message" style={{color:'red'}}>{errors.state}</div>}

                            </div>
                        


                          <div className="col-md-6">
                            <label htmlFor="" className="small mb-1">Area<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="city"
                              onChange={(e) => setArea(e.target.value)}>
                                            <option value="">Select City</option>
                                            {cityList.map(city => (
                                                <option key={city._id} value={city._id}>{city.admin_city_name}</option>
                                            ))}
                                        </select>
                                        {errors.area && <div className="error-message" style={{color:'red'}}>{errors.area}</div>}

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
                              onChange={(e) => setPincode(e.target.value)}/>
                                {errors.pincode && <div className="error-message" style={{color:'red'}}>{errors.pincode}</div>}
                            </div>

                            <div className="col-md-6">
                            <label htmlFor="latitude" className="small mb-1">Latitude<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="text"
                              id="latitude"
                              value={latitude}
                              onChange={(e) => setLatitude(e.target.value)}/>
                                {errors.latitude && <div className="error-message" style={{color:'red'}}>{errors.latitude}</div>}
                            </div>
                            </div>
                        

                            <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                            <label htmlFor="longitude" className="small mb-1">Longitude<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="text"
                              id="longitude"
                              value={longitude}
                              onChange={(e) => setLongitude(e.target.value)}/>
                                {errors.longitude && <div className="error-message" style={{color:'red'}}>{errors.longitude}</div>}
                            </div>

                          <div className="col-md-6">
                            <label htmlFor="mainAddress" className="small mb-1">Main Address<span style={{ color: 'red' }}>*</span>:</label>
                            <textarea
                              className='form-control'
                              id="mainAddress"
                              value={mainAddress}
                              onChange={(e) => setMainAddress(e.target.value)}></textarea>
                                {errors.mainAddress && <div className="error-message" style={{color:'red'}}>{errors.mainAddress}</div>}
                             
                          </div>
                        </div>

                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                          <label htmlFor="password" className="small mb-1">Password<span>*</span>:</label>
                                    <input
                                        type={values.showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className={`fas ${values.showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    ></span>
                                    {errors.password && <div className="error-message" style={{color:'red'}}>{errors.password}</div>}
                                    {password && (
                                        <div>
                                            <div style={{ color: passwordValidations.upperCase ? 'green' : 'red' }}>
                                                {passwordValidations.upperCase ? 'Contains uppercase letter ✓' : 'Requires at least one uppercase letter'}
                                            </div>
                                            <div style={{ color: passwordValidations.lowerCase ? 'green' : 'red' }}>
                                                {passwordValidations.lowerCase ? 'Contains lowercase letter ✓' : 'Requires at least one lowercase letter'}
                                            </div>
                                            <div style={{ color: passwordValidations.digit ? 'green' : 'red' }}>
                                                {passwordValidations.digit ? 'Contains digit ✓' : 'Requires at least one digit'}
                                            </div>
                                            <div style={{ color: passwordValidations.specialChar ? 'green' : 'red' }}>
                                                {passwordValidations.specialChar ? 'Contains special character ✓' : 'Requires at least one special character'}
                                            </div>
                                            <div style={{ color: passwordValidations.length ? 'green' : 'red' }}>
                                                {passwordValidations.length ? 'Length between 8 and 16 characters ✓' : 'Requires length between 8 and 16 characters'}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        


                          <div className="col-md-6">
                          <label htmlFor="confirmPassword" className="small mb-1">Confirm Password<span>*</span>:</label>
                                <input
                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                  <span
                                    className={`fas ${values.showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                ></span>
                                {errors.confirmPassword && <div className="error-message" style={{color:'red'}}>{errors.confirmPassword}</div>}

                                </div>
                        </div>

    
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="profilePhoto" className="small mb-1">Profile Photo:</label>
                            <input
                              type="file"
                              className='form-control'
                             
                              onChange={onFileChange}
                            />
                          </div>
                        </div>
    
                        <div className="form-group">
                          <div className="row justify-content-center">
                            <div className="col text-center">
                              <button className='registration-button' type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Submit'}
                              </button>
                              {isSuccess && <div className="success-message">{successMessage}</div>}
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

    