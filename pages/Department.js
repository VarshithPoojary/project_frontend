import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Router from 'next/router';

import Header from './Header';
import Topbar from './topbar';

const AddNewDoctor = () => {
    const defaultProfileImage = '/images/userLogo.jpeg';
    const [doctorName, setDoctorName] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onFileChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const validationErrors = {};

        if (!doctorName.trim()) {
            validationErrors.doctorName = 'Please enter Doctor Name.';
        }

        if (!specialist.trim()) {
            validationErrors.specialist = 'Please enter Specialist.';
        }

        if (!profilePhoto) {
            validationErrors.profilePhoto = 'Please upload Doctor Profile Photo.';
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
            const formData = new FormData();
            formData.append('doctorName', doctorName);
            formData.append('specialist', specialist);
            formData.append('profilePhoto', profilePhoto);

            // Add your axios post request here to submit the form data

            setIsSuccess(true);
            setSuccessMessage('Doctor added successfully!');
            setTimeout(() => {
                Router.push('/Admin/viewDoctorList');
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error saving data. Please try again.');
        }

        setIsLoading(false);
    };

    const Cancel = () => {
        setDoctorName('');
        setSpecialist('');
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
                <title>Add New Doctor</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Add New Doctor' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>

            <Topbar />
            <Header />

            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="card mb-4" style={{ width: "50%", maxWidth: "900px", marginTop: "40px" }}>
                            <div className="card-header">Add New Doctor</div>
                            
                                <div className="card-body" style={{ maxWidth: "90%", maxHeight: "70vh", minHeight: '300px' }}>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="doctorName" className="small mb-1">Doctor Name<span style={{ color: 'red' }}>*</span>:</label>
                                            <input
                                                type="text"
                                                className='form-control'
                                                id="doctorName"
                                                value={doctorName}
                                                onChange={(e) => setDoctorName(e.target.value)}
                                            />
                                            {errors.doctorName && <div className="error-message">{errors.doctorName}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="specialist" className="small mb-1">Specialist Type<span style={{ color: 'red' }}>*</span>:</label>
                                            <input
                                                type="text"
                                                className='form-control'
                                                id="specialist"
                                                value={specialist}
                                                onChange={(e) => setSpecialist(e.target.value)}
                                            />
                                            {errors.specialist && <div className="error-message">{errors.specialist}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="profilePhoto" className="small mb-1">Doctor Profile Photo</label>
                                            <input
                                                type="file"
                                                onChange={onFileChange}
                                                className='form-control'
                                                id="profilePhoto"
                                            />
                                            {errors.profilePhoto && <div className="error-message">{errors.profilePhoto}</div>}
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
                                    </form>
                                    <div className="col text-center">
                                        <button className='registration-cancel-button' onClick={Cancel}>Clear</button>
                                    </div>
                                </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddNewDoctor;
