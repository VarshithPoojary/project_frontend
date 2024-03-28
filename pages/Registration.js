import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Router from 'next/router';
import { Registration } from '../actions/registrationAction';

const Registrations = () => {
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

    const onFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    }
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
            validationErrors.username = 'Username is required.';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Please enter a valid email address.';
        }

        if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
            validationErrors.mobileNumber = 'Please enter a valid mobile number starting with 6, 7, 8, or 9 and having exactly 10 digits.';
        }

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,16}$/.test(password)) {
            validationErrors.password = 'Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be between 8 and 16 characters long.';
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
            }, 5000);
            return;
            
        }
        try {
            const formData = new FormData();
            formData.append('admin_firstname', firstName);
            formData.append('admin_lastname', lastName);
            formData.append('demoimg', profileImage);
            formData.append('admin_password', password);
            formData.append('admin_mobile_no', mobileNumber);
            formData.append('admin_email', email);
            formData.append('admin_username', username);
            formData.append('admin_type', userType);
            

            
            Registration(formData).then(response => {
                if (response.error) {
                    setValues({ ...values });
                } else {
                    setIsSuccess(true);
                    setSuccessMessage('Saved successfully!');
                    setTimeout(() => {
                        Router.push(`/login`);
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

        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setMobileNumber('');
        setPassword('');
        setConfirmPassword('');
        setProfileImage(null);
        setUserType('Select type');
        setIsSuccess(false);

        setIsLoading(false);
    };
    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const toggleConfirmPasswordVisibility  = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    return (
        <>
             <Head>
      <title>Registration</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="title" content='Admin_Profile' />
    </Head>
        <div className="registration-container">
            <div className="registration-form">
                {/* <div className="logo">
                    <img src="/icons/img1.png" alt="Logo" />
                </div> */}
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="firstName">First Name<span style={{ color: 'red' }}>*</span>:</label>
                                <input
                                className='registration-input'
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                            </div>
                            <div className="col">
                                <label htmlFor="lastName">Last Name<span style={{ color: 'red' }}>*</span>:</label>
                                <input
                                className='registration-input'
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                            </div>
                           
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                        <div className="col">
                                <label htmlFor="username">Username<span style={{ color: 'red' }}>*</span>:</label>
                                <input
                                className='registration-input'
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {errors.username && <div className="error-message">{errors.username}</div>}
                            </div>
                            <div className="col">
                                <label htmlFor="email">Email<span style={{ color: 'red' }}>*</span>:</label>
                                <input
                                className='registration-input'
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                            </div>
                            
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                        <div className="col">
                                <label htmlFor="mobileNumber">Mobile Number<span style={{ color: 'red' }}>*</span>:</label>
                                <input
                                className='registration-input'
                                    type="text"
                                    id="mobileNumber"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                                {errors.mobileNumber && <div className="error-message">{errors.mobileNumber}</div>}
                            </div>
                            <div className="col">
                                <label htmlFor="userType">User Type<span style={{ color: 'red' }}>*</span>:</label>
                                    <select
                                    className='registration-input'
                                        id="userType"
                                        value={userType}
                                        onChange={(e) => setUserType(e.target.value)}
                                    >
                                        <option value="Select type">Select type</option>
                                        <option value="admin">Admin</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="patient">Patient</option>
                                    </select>
                               
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                        <div className="col">
                                <label htmlFor="password">Password<span style={{ color: 'red' }}>*</span>:</label>
                                <input
                                    type={values.showPassword ? 'text' : 'password'}
                                className='registration-input'
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
                                


                            </div>

                        <div className="col">
                                <label htmlFor="confirmPassword">Confirm Password<span style={{ color: 'red' }}>*</span>:</label>
                                <input
                                    type={values.showPassword ? 'text' : 'password'}
                                className='registration-input'
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                  <span
                                    className={`fas ${values.showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                ></span>

                                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                                  
                                </div>
                           
                    
                               
                        </div>
                        <div className="form-group">
                        <div className="row">
                        <div className="col">
                                <label htmlFor="image">Profile Image<span style={{ color: 'red' }}>*</span>:</label>
                                <input type="file" onChange={onFileChange}  style={{ width:'50%'}} className='registration-input'   />
                            </div>

                            </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row justify-content-center">
                                <div className="col text-center">
                                    <button type="submit" disabled={isLoading}>
                                        {isLoading ? 'Loading...' : 'Register'}
                                    </button>
                                    {isSuccess && <div className="success-message">{successMessage}</div>}
                                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="text-center mt-3 login-link">
                        Already a member?{' '}
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </div>
                </div>
            </div>
            </>
        );
    }

    
    export default Registrations;