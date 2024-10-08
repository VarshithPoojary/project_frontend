import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Topbar from '../topbar';
import Header from '../Header';
import { update_patient, patient_details_by_id } from '../../actions/patientprofileAction';

const PatientPasswordUpdate = () => {
    const router = useRouter();
    const defaultProfileImage = '/images/userLogo.jpeg'; 
    const [values, setValues] = useState({
        patient_firstname: '',
        patient_lastname: '',
        patient_password: '',
        patient_mobile_no: '',
        patient_email: '',
        patient_username: '',
        patient_profile_image: '',
        error: '',
        loading: false,
        confirmpassword: '',
        showPassword: false,
        showConfirmPassword: false,
        successMessage: ''
    });
    const [msg, setMsg] = useState('');
    const { patient_password, confirmpassword, showPassword, showConfirmPassword, error, loading, successMessage } = values;

    useEffect(() => {
        const user_id = localStorage.getItem('id');
        if (!user_id) {
            Router.push('/login');
        } else {
            loadPassword();
        }
    }, [router.query.patientId]);

    const loadPassword = () => {
        patient_details_by_id(router.query.patientId)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    const patientData = data.patient_list[0];
                    setValues({
                        ...values,
                        patient_firstname: patientData.patient_firstname,
                        patient_lastname: patientData.patient_lastname,
                        patient_username: patientData.patient_username,
                        patient_email: patientData.patient_email,
                        patient_profile_image: patientData.patient_profile_image || defaultProfileImage,
                        patient_mobile_no: patientData.patient_mobile_no,
                        patient_current_password: patientData.patient_password,
                        loading: false
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setValues({ ...values, error: 'Error: Network request failed', loading: false });
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        var patient_id = router.query.patientId;
    
        if (!patient_password && !confirmpassword) {
            setValues({ ...values, error: 'Enter Password and Confirm Password' });
            return;
        }
    
        if (!patient_password) {
            setValues({ ...values, error: 'Enter Password' });
            return;
        }
    
        if (!confirmpassword) {
            setValues({ ...values, error: 'Enter Confirm Password' });
            return;
        }
    
        if (patient_password !== confirmpassword) {
            setValues({ ...values, error: 'New password and confirm password do not match' });
            return;
        }
    
        const formData = new FormData();
        formData.append('patient_id', patient_id);
        formData.append('demoimg', values.patient_profile_image);
        formData.append('password', patient_password);
    
        try {
            const response = await update_patient(formData);
            if (response.error) {
                setValues({ ...values, error: response.error });
            } else {
                setMsg('Edited Successfully');
                setTimeout(() => {
                    setMsg('');
                    Router.push(`/Patient/ViewPatientList`);
                }, 2000); 
            }
        } catch (error) {
            console.error('Error:', error);
            setValues({ ...values, error: 'Error updating profile', loading: false });
        }
    };
    
    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value, error: '', successMessage: '' });
    };
    

    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !showPassword });
    };

    const toggleConfirmPasswordVisibility = () => {
        setValues({ ...values, showConfirmPassword: !showConfirmPassword });
    };

    const Cancel = () => {
        setValues({
            ...values,
            oldpassword: '',
            patient_password: '',
            confirmpassword: '',
            error: '',
            successMessage: ''
        });
    };

    return (
        <>
            <Head>
                <title>Password update</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Password Update' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12">
                <form role="form" onSubmit={handleSubmit}>
                    <div className="card" style={{ marginTop: '100px', padding: '20px', marginLeft: '250px', width: '700px', height: '400px', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                        <div className="card-body">
                            <div className="card-header" style={{background: "#D3C8F1" ,color:"black"}}>Edit Patient Password Here</div>
                            
                            <div className="form-group row">
                                <label htmlFor="newpassword" className="col-sm-3 col-form-label">New Password:</label>
                                <div className="col-sm-9" style={{marginTop:'10px'}}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="patient_password"
                                        value={patient_password}
                                        onChange={handleChange('patient_password')}
                                        placeholder="Enter new password"
                                        style={{ width: '300px' }}
                                    />
                                    <span
                                        className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    ></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="confirmpassword" className="col-sm-3 col-form-label">Confirm Password:</label>
                                <div className="col-sm-9">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="confirmpassword"
                                        value={confirmpassword}
                                        onChange={handleChange('confirmpassword')}
                                        placeholder="Enter Confirm password"
                                        style={{ width: '300px' }}
                                    />
                                    <span
                                        className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                        onClick={toggleConfirmPasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    ></span>
                                </div>
                            </div>
                            {/* {loading && <div className="alert alert-info margin-top-10">Updating password...</div>} */}
                            {error && <div className="alert alert-danger margin-top-10">{error}</div>}
                            {msg && <div className="alert alert-success margin-top-10">{msg}</div>}
                            {/* {successMessage && <div className="alert alert-success margin-top-10">{successMessage}</div>} */}
                           
                            <div className="form-group row mt-3">
                                <div className="col-sm-12 text-right">
                                    <button type="submit" className="btn btn-primary mr-2" style={{  backgroundColor: '#9370DB' }}>Update</button>
                                    <button type="button" className="btn btn-secondary" onClick={Cancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PatientPasswordUpdate;
