import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Topbar from '../topbar';
import Header from '../Header';
import { useRouter } from 'next/router';
import { FiCamera } from 'react-icons/fi'; 
import { Scrollbars } from 'react-custom-scrollbars';
import Head from 'next/head';
import Router from 'next/router';
import { patient_details_by_id, update_patient } from '../../actions/patientprofileAction';
import { CountryListById, update_country, country_list } from '../../actions/countryAction';
import { state_list, StateListById, state_list_by_country_id } from '../../actions/stateAction';
import { city_list, update_city, city_list_by_state_id } from '../../actions/cityAction';

const PatientProfileUpdate = () => {
    const router = useRouter();
    const [profilePhoto, setProfilePhoto] = useState(null);
    const defaultProfileImage = '/images/userLogo.png';
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
        patient_main_address: '',
        patient_profile: '',
        error: '',
        loading: false,
        countrydetail: [],
        statedetail: [],
        citydetail: [],
    });

    const { patient_first_name, patient_last_name, patient_phone_number, patient_dob, patient_gender, patient_email, patient_address, patient_country_id, patient_state_id, patient_area_id, patient_pincode, patient_main_address, patient_profile, countrydetail, statedetail, citydetail, error, loading } = values;
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const pat_id = localStorage.getItem('id');
        if (!pat_id) {
            Router.push('/login');
        } else {
            loadPatientDetails();
        }
    }, [router.query.patientId]);

    const loadPatientDetails = async () => {
        setValues({ ...values, loading: true });

        try {
            // Fetch country, state, city, and patient details in parallel
            const [countryData, stateData, cityData, patientData] = await Promise.all([
                country_list(),
                state_list(),
                city_list(),
                patient_details_by_id(router.query.patientId)
            ]);

            if (patientData.error) {
                console.error(patientData.error);
                setValues({ ...values, error: patientData.error, loading: false });
            } else {
                const patient = patientData.patient_list[0];
                setValues({
                    ...values,
                    patient_first_name: patient.patient_first_name,
                    patient_last_name: patient.patient_last_name,
                    patient_phone_number: patient.patient_phone_number,
                    patient_dob: patient.patient_dob,
                    patient_gender: patient.patient_gender,
                    patient_email: patient.patient_email,
                    patient_address: patient.patient_address,
                    patient_country_id: patient.patient_country_id,
                    patient_state_id: patient.patient_state_id,
                    patient_area_id: patient.patient_area_id,
                    patient_pincode: patient.patient_pincode,
                    patient_main_address: patient.patient_main_address,
                    patient_profile: patient.patient_profile_image || defaultProfileImage,
                    countrydetail: countryData.admin_country_list,
                    statedetail: stateData.state_list,
                    citydetail: cityData.city_list,
                    loading: false
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setValues({ ...values, error: 'Error: Network request failed', loading: false });
        }
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });

        if (name === "patient_country_id") {
            state_list_by_country_id(e.target.value).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, statedetail: data.state_list });
                }
            });
        }
        if (name === "patient_state_id") {
            city_list_by_state_id(e.target.value).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, citydetail: data.city_list });
                }
            });
        }
    };

    const onFileChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patient_updated_by_id = localStorage.getItem('id');
        const countryId = document.getElementById('country').value;
        const stateId = document.getElementById('patient_state_id').value;
        const areaId = document.getElementById('patient_area_id').value;  
        var patient_id = router.query._id;
        const formData = new FormData();
        formData.append('patient_id', patient_id);
        formData.append('patient_first_name', patient_first_name);
        formData.append('patient_last_name', patient_last_name);
        formData.append('patient_phone_number', patient_phone_number);
        formData.append('patient_dob', patient_dob);
        formData.append('patient_gender', patient_gender);
        formData.append('patient_email', patient_email);
        formData.append('patient_address', patient_address);
        formData.append('patient_country_id', countryId);
        formData.append('patient_state_id', stateId);
        formData.append('patient_area_id', areaId);
        formData.append('patient_pincode', patient_pincode);
        formData.append('patient_main_address', patient_main_address);
        formData.append('demoimg', profilePhoto);
        formData.append('patient_updated_by_id', patient_updated_by_id);

        try {
            const response = await update_patient(formData); 
            if (response.error) {
                setValues({ ...values, error: response.error });
            } else {
                Router.push(`/Patient/ViewPatientList`);
            }
        } catch (error) {
            console.error('Error:', error);
            setValues({ ...values, error: 'Error updating profile', loading: false });
        }
    };

    return (
        <div>
            <Head>
                <title>Edit Patient</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Edit Admin' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Header />
            <Topbar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="card mb-4" style={{ width: "1000px", marginTop: "40px", height: '600px', overflow: 'hidden' }}>
                            <div className="card-header" style={{background: "#D3C8F1" ,color:"black"}}>Edit Patient here</div>
                            <Scrollbars style={{ height: 500 }}>
                                <div className="card-body" style={{ maxWidth: "900px", width: '800px' }}>
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <form role="form" onSubmit={handleSubmit}>
                                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                                <label htmlFor="fileInput">
                                                    <div className="user-avatar mt-4" style={{ position: 'relative', display: 'inline-block' }}>
                                                        <img src={values.patient_profile} alt="Patient Profile" style={{ width: '100px', height: '100px', borderRadius: '10%', cursor: 'pointer' }} />
                                                        <div style={{ position: 'absolute', bottom: '0', left: '0', zIndex: '1' }}>
                                                            <span style={{ color: 'black', cursor: 'pointer', width: '100%' }}><FiCamera /></span>
                                                        </div>
                                                        <div className='img-update' style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', cursor: 'pointer', zIndex: '2' }}>
                                                            <input type="file" onChange={onFileChange} id="fileInput" style={{ display: 'none' }} />
                                                        </div>
                                                    </div>
                                                </label>
                                                <div className="row gutters">
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="firstName" className="small mb-1">First Name</label>
                                                            <input type="text" className="form-control" id="firstName" placeholder="Enter first name" value={patient_first_name} onChange={handleChange('patient_first_name')} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="lastName" className="small mb-1">Last Name</label>
                                                            <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={patient_last_name} onChange={handleChange('patient_last_name')} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="phoneNumber" className="small mb-1">Phone Number</label>
                                                            <input type="text" className="form-control" id="phoneNumber" placeholder="Enter phone number" value={patient_phone_number} onChange={handleChange('patient_phone_number')} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="dob" className="small mb-1">Date of Birth</label>
                                                            <input type="date" className="form-control" id="dob" placeholder="Enter date of birth" value={patient_dob} onChange={handleChange('patient_dob')} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="gender" className="small mb-1">Gender</label>
                                                            <select className="form-control" id="gender" value={patient_gender} onChange={handleChange('patient_gender')}>
                                                                <option value="">Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="email" className="small mb-1">Email</label>
                                                            <input type="email" className="form-control" id="email" placeholder="Enter email" value={patient_email} onChange={handleChange('patient_email')} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="country" className="small mb-1">Country</label>
                                                            <select className="form-control" id="country" value={patient_country_id} onChange={handleChange('patient_country_id')}>
                                                                <option value="">Select Country</option>
                                                                {countrydetail.map((country, index) => (
                                                                    <option key={index} value={country.country_id}>{country.country_name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="patient_state_id" className="small mb-1">State</label>
                                                            <select className="form-control" id="patient_state_id" value={patient_state_id} onChange={handleChange('patient_state_id')}>
                                                                <option value="">Select State</option>
                                                                {statedetail.map((state, index) => (
                                                                    <option key={index} value={state.state_id}>{state.state_name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="patient_area_id" className="small mb-1">City</label>
                                                            <select className="form-control" id="patient_area_id" value={patient_area_id} onChange={handleChange('patient_area_id')}>
                                                                <option value="">Select City</option>
                                                                {citydetail.map((city, index) => (
                                                                    <option key={index} value={city.city_id}>{city.city_name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="pincode" className="small mb-1">Pincode</label>
                                                            <input type="text" className="form-control" id="pincode" placeholder="Enter pincode" value={patient_pincode} onChange={handleChange('patient_pincode')} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <label htmlFor="mainAddress" className="small mb-1">Main Address</label>
                                                            <textarea className="form-control" id="mainAddress" placeholder="Enter main address" value={patient_main_address} onChange={handleChange('patient_main_address')}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="patient-profile-form-group mt-4">
                                                            <button type="submit" className="btn btn-primary" style={{"width":"150px"}}>Update Patient</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfileUpdate;
