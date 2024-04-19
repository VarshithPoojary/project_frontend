import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Router from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../Header';
import Topbar from '../topbar';
import { add_admin } from '../../actions/adminprofileAction';
const AddAdmin = () => {
    const defaultProfileImage = '/images/userLogo.jpeg';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [values,setValues]=useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('Select type');
    const [profileImage, setProfileImage] = useState(null); 
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  
    const [passwordValidations, setPasswordValidations] = useState({
        upperCase: false,
        lowerCase: false,
        digit: false,
        specialChar: false,
        length: false,
    });

    useEffect(() => {
        validatePassword(password);
    }, [password]);

    const onFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    }

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

        if (!/^[a-zA-Z]+$/.test(firstName)) {
            validationErrors.firstName = 'Please enter a valid first name.';
        }

        if (!/^[a-zA-Z]+$/.test(lastName)) {
            validationErrors.lastName = 'Please enter a valid last name.';
        }

        if (!username.trim()) {
            validationErrors.username = 'Please enter Username.';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Please enter a valid email address.';
        }

        if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
            validationErrors.mobileNumber = 'Please enter a valid mobile number.';
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
            var admin_created_by_id= localStorage.getItem('id');
            const formData = new FormData();
            formData.append('admin_firstname', firstName);
            formData.append('admin_lastname', lastName);
            formData.append('demoimg', profileImage);
            formData.append('admin_password', password);
            formData.append('admin_mobile_no', mobileNumber);
            formData.append('admin_email', email);
            formData.append('admin_username', username);
            formData.append('admin_type', userType);
            formData.append('admin_created_by_id', admin_created_by_id);

            add_admin(formData).then(response => {
                if (response.msg) {
                    setErrorMessage(response.msg); 
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 5000);
                } else if (response.error) {
                    setValues({ ...values });
                } else {
                    setIsSuccess(true);
                    setSuccessMessage('Registered successfully!');
                    setTimeout(() => {
                        Router.push(`/Admin/viewAdminList`);
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
            username,
            email,
            mobileNumber,
            password,
            confirmPassword,
            profileImage,
            userType,
        });

        setIsSuccess(false);
        setIsLoading(false);
    };
    
    const Cancel = () => {
        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setMobileNumber('');
        setPassword('');
        setConfirmPassword('');
        setUserType('Select type');
        setProfileImage(null);
        setErrors({}); 
        setIsLoading(false);
        setIsSuccess(false);
        setSuccessMessage('');
        setErrorMessage('');
        setPasswordValidations({
            upperCase: false,
            lowerCase: false,
            digit: false,
            specialChar: false,
            length: false,
        });
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
                <title>Add Admin</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Registration' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>

            <Topbar/>
            <Header/>

            <div className="content-page">
                <div className="content">
                <div className="container-fluid">
                    <div className="card mb-4" style={{ width: "80%", maxWidth: "900px", marginTop: "40px" }}>
                        <div className="card-header">Add Admin here</div>
                        <Scrollbars style={{ height: "60vh", minHeight: '300px' }}>
                            <div className="card-body" style={{ maxWidth: "90%", maxHeight: "70vh", minHeight: '300px' }}>
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
                                                />
                                                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="lastName" className="small mb-1">Last Name<span style={{ color: 'red' }}>*</span>:</label>
                                                <input
                                                className='form-control'
                                                type="text"
                                                id="lastName"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                />
                                                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                                            </div>
                           
                                        </div>
                  
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="username" className="small mb-1">Username<span style={{ color: 'red' }}>*</span>:</label>
                                                <input
                                                className='form-control'
                                                type="text"
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                />
                                                {errors.username && <div className="error-message">{errors.username}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email" className="small mb-1">Email<span style={{ color: 'red' }}>*</span>:</label>
                                                <input
                                                className='form-control'
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                />
                                                {errors.email && <div className="error-message">{errors.email}</div>}
                                            </div>
                            
                                        </div>
                    
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="mobileNumber" className="small mb-1">Mobile Number<span style={{ color: 'red' }}>*</span>:</label>
                                                <input
                                                className='form-control'
                                                type="text"
                                                id="mobileNumber"
                                                 value={mobileNumber}
                                                 onChange={(e) => setMobileNumber(e.target.value)}
                                                />
                                                {errors.mobileNumber && <div className="error-message">{errors.mobileNumber}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="userType" className="small mb-1">User Type<span style={{ color: 'red' }}>*</span>:</label>
                                                <select
                                                className='form-control'
                                                id="userType"
                                                value={userType}
                                                onChange={(e) => setUserType(e.target.value)}
                                                >
                                                <option value="Select type">Select type</option>
                                                <option value="Admin1">Admin1</option>
                                                <option value="Admin2">Admin2</option>
                                                <option value="Admin3">Admin3</option>
                                                </select>
                               
                                            </div>
                                        </div>
                   

                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="password" className="small mb-1">Password<span style={{ color: 'red' }}>*</span>:</label>
                                                <input
                                                type={values.showPassword ? 'text' : 'password'}
                                                className='form-control'
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <span
                                                    className={`fas ${values.showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                                    onClick={togglePasswordVisibility}
                                                    style={{ cursor: 'pointer' }}
                                                ></span>
                                                {errors.password && <div className="error-message">{errors.password}</div>}
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
                                                <label htmlFor="confirmPassword" className="small mb-1">Confirm Password<span style={{ color: 'red' }}>*</span>:</label>
                                                <input
                                                type={values.showConfirmPassword ? 'text' : 'password'}
                                                className='form-control'
                                                id="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                                <span
                                                    className={`fas ${values.showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                                    onClick={toggleConfirmPasswordVisibility}
                                                    style={{ cursor: 'pointer' }}
                                                ></span>

                                                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                                  
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="image" className="small mb-1">Profile Image:</label>
                                                <input type="file" onChange={onFileChange}   className='form-control'   />
                                            </div>

                                        </div>
                           
                                        <div className="form-group">
                                            <div className="row justify-content-center">
                                                <div className="col text-center">
                                                    <button className='registration-button' type="submit" disabled={isLoading}>
                                                    {isLoading ? 'Loading...' : 'submit'}
                                                    </button>
                                                    </div>
                                                   
                                                   
                                                    {isSuccess && <div className="success-message">{successMessage}</div>}
                                                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                                               
                                               
                                            </div>
                                        </div>
                                        
                                       
                                    </form>
                                    <div className="col text-center">
                                        <button className='registration-cancel-button'  onClick={Cancel} >Clear</button>
                                    </div>
                                </div>
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                   
                </div>
                
            
        </>
    );
}

export default AddAdmin;
