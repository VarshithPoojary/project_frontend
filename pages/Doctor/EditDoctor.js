import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Topbar from '../topbar';
import Header from '../Header';
import { useRouter } from 'next/router';
import { FiCamera } from 'react-icons/fi'; 
import { Scrollbars } from 'react-custom-scrollbars';
import Head from 'next/head';
import Router from 'next/router';
import { doctor_details_by_id, update_doctor } from '../../actions/doctorprofileAction';
import { CountryListById, update_country,country_list } from '../../actions/countryAction';
import { state_list,StateListById,state_list_by_country_id } from '../../actions/stateAction';
import { city_list, update_city,city_list_by_state_id } from '../../actions/cityAction';
import { YearOfPassing_List } from '../../actions/YearOfPassingAction';
import { workExperience_list } from '../../actions/workexperienceAction';
import { specialistType_list } from '../../actions/SpeciaListTypeAction';





const DoctorProfileUpdate = () => {
    const router = useRouter();

    const [profilePhoto, setProfilePhoto] = useState(null);
    // const [countryList, setCountryList] = useState([]);
    // const [stateDetail, setStateDetail]=useState([]);
    const [state, setState] = useState('');
    const defaultProfileImage = '/images/userLogo.png';
    const [values, setValues] = useState({
           
        caretaker_firstname:'',
        caretaker_lastname:'',
        caretaker_phone_number:'',
        caretaker_dob:'',
        caretaker_gender:'',
        caretaker_email:'',
        caretaker_address:'',
        caretaker_type:'',
        caretaker_referralcode:'',
        caretaker_country_id:'',
        caretaker_state_id:'',
        caretaker_city_id:'',
            caretaker_pincode:'',
            caretaker_year_of_passing:'',
            caretaker_work_experience:'',
            degree_name:'',
            university_name:'',
            caretaker_latitude:'',
            caretaker_longitude:'',
            emergency_name: '',
            emergency_phone: '',
            licenseexpirydate: '',
            description: '',

            caretaker_profile_image:'',
            error: '',
            loading: false,
            countrydetail: [],
        statedetail: [],
        citydetail:[],
        workdetail:[],
        yeardetail:[],
        typedetail:[]
        
        
    });
    
    const { caretaker_firstname, caretaker_lastname,  caretaker_phone_number, caretaker_dob,caretaker_gender,caretaker_email,caretaker_address,caretaker_type,caretaker_referralcode,caretaker_country_id,caretaker_state_id,caretaker_city_id,caretaker_pincode, caretaker_year_of_passing,caretaker_work_experience,degree_name,university_name ,caretaker_latitude,caretaker_longitude,emergency_name,emergency_phone,licenseexpirydate,description,caretaker_profile_image,countrydetail,statedetail,citydetail, workdetail,yeardetail,typedetail,error, loading } = values;
    const [msg, setMsg] = useState('');
 

    useEffect(() => {
        const doc_id = localStorage.getItem('id');
        if (!doc_id) {
            Router.push('/login');
        } else {
            
            loadDoctorDetails();
    
            
        }
    }, [router.query._id]);

    const loadCountryDetails = () => {
    CountryListById(router.query._id).then(country => {
        if (country.error) {
            console.log(country.error);
        } else {
            if (country.admin_country_list && country.admin_country_list.length > 0) {
                setValues({
                    ...values,
                    doctor_country_id: country.admin_country_list[0].doctor_country_id
                });
            } else {
                console.log('No country details found.');
            }
        }
    });
};

    
    const loadDoctorDetails = () => {
        country_list().then(countrydata => {
            if (countrydata.error) {
                console.log(countrydata.error);
            } else {
                state_list().then(state => {
                    if(state.error){
                        console.log(state.error);
                    }
                   
                     else {
                        city_list().then(city => {
                            if (city.error) {
                                console.log(city.error);
                            } 
                            else {
                                workExperience_list().then(work => {
                                    if (work.error) {
                                        console.log(work.error);
                                    } 
                                    else{
                                        alert(JSON.stringify(work)) 
                                        YearOfPassing_List().then(year => {
                                            if (year.error) {
                                                console.log(year.error);
                                            } 
                                            else{
                                                specialistType_list().then(caretakertype => {
                                                    if (caretakertype.error) {
                                                        console.log(caretakertype.error);
                                                    } 
                                                 else{
             doctor_details_by_id(router.query._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    const doctorData = data.caretaker_list[0];
                    setValues({
                        ...values,
                        caretaker_firstname: doctorData. caretaker_firstname,
                        caretaker_lastname: doctorData. caretaker_lastname,
                        caretaker_phone_number: doctorData. caretaker_phone_number,
                        caretaker_dob: doctorData. caretaker_dob,
                        caretaker_gender: doctorData. caretaker_gender,
                        caretaker_email: doctorData. caretaker_email,
                        caretaker_address: doctorData. caretaker_address,
                        caretaker_type: doctorData. caretaker_type,
                        caretaker_referralcode : doctorData. caretaker_referralcode,
                        caretaker_country_id: doctorData. caretaker_country_id,
                        caretaker_state_id: doctorData. caretaker_state_id,
                        caretaker_city_id: doctorData. caretaker_city_id,
                        caretaker_pincode: doctorData. caretaker_pincode,
                        degree_name: doctorData. degree_name,
                        university_name: doctorData. university_name,
                        caretaker_latitude: doctorData. caretaker_latitude,
                        caretaker_longitude: doctorData. caretaker_longitude,
                        emergency_name: doctorData. emergency_name,
                        emergency_phone: doctorData. emergency_phone,
                        // Emgphone: doctorData. Emgphone,
                        driving_license_expiry_date: doctorData. driving_license_expiry_date,
                        description: doctorData. description,



                        caretaker_profile_image: doctorData. caretaker_profile_image|| defaultProfileImage,
                        countrydetail:countrydata.admin_country_list,
                        statedetail:state.state_list,
                        citydetail:city.city_list,
                        workdetail:work.admin_workexperience_list,
                        yeardetail:year.admin_yearofpassing_list,
                        loading: false
                        
                    });   alert(JSON.stringify(workdetail))                

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
});
};
});
};

});
};
 
    // const handleCountryChange = (caretaker_country_id) => {
    //     // state_list_by_country_id(admin_country_id)
    //     //     .then(response => {
    //     //         setCountry(admin_country_id)
    //     //         statedetail(response.state_list);
    //     //     })
    //     //     .catch(error => {
    //     //         console.error('Error fetching state list:', error);
    //     //     });
    // };
  
    // const handleStateChange = (caretaker_state_id) => {
    //     // city_list_by_state_id(admin_state_id)
    //     //     .then(response => {
    //     //         setState(admin_state_id)
    //     //         setCityList(response.city_list);
    //     //     })
    //     //     .catch(error => {
    //     //         console.error('Error fetching city list:', error);
    //     //     });
    // };
    

    const onFileChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const caretaker_updated_by_id = localStorage.getItem('id');
        var doctor_id = router.query._id;
        const formData = new FormData();
        formData.append('doctor_id', doctor_id);
        formData.append('caretaker_profile_image', caretaker_profile_image);
        formData.append('caretaker_firstname', caretaker_firstname);
            formData.append('caretaker_lastname', caretaker_lastname);
            formData.append('caretaker_phone_number', caretaker_phone_number);
            formData.append('caretaker_dob', caretaker_dob);
            formData.append('caretaker_gender', caretaker_gender);
            formData.append('caretaker_email', caretaker_email);
            formData.append('caretaker_address', caretaker_address);
            formData.append('caretaker_type', caretaker_type);

            formData.append('caretaker_referralcode', caretaker_referralcode);
            formData.append('caretaker_country_id', caretaker_country_id);
            formData.append('caretaker_state_id', caretaker_state_id);
            formData.append('caretaker_city_id', caretaker_city_id);
            formData.append('caretaker_pincode', caretaker_pincode);
            formData.append('degree_name', degree_name);
            formData.append('university_name', university_name);
            formData.append('caretaker_latitude', caretaker_latitude);
            formData.append('caretaker_longitude', caretaker_longitude);
            formData.append('emergency_name',emergency_name);
            formData.append('emergency_phone',emergency_phone);
            // formData.append('demo',licenceimage);
            formData.append('driving_license_expiry_date',licenseexpirydate);
            formData.append('description',description);
           



            formData.append('demoimg', profilePhoto);
            formData.append('caretaker_updated_by_id', caretaker_updated_by_id);

            try {

                const response = await update_doctor(formData); 
                if (response.error) {
                    setValues({ ...values, error: response.error });
                } else {
                    const countryData = {
                        country_id: doctor_id,
                        caretaker_country_id,
                        caretaker_updated_by_id:caretaker_updated_by_id,
                    };
                    const countryRes = await update_country(countryData);
                    if (countryRes.error) {
                        setValues({ ...values, error: countryRes.error });
                    } else {
                        setMsg('Edited Successfully');
                        setTimeout(() => {
                            setMsg('');
                            Router.push(`/Doctor/ViewDoctorList`);
                        }, 2000);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                setValues({ ...values, error: 'Error updating profile', loading: false });
            }
        };
    
        const handleChange = name => e => {
            setValues({ ...values, [name]: e.target.value });
        };
    
        const Cancel = () => {
            loadUserDetails();
        };
    
        return (
            <div>
              <Head>
                <title>Edit Doctor</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Edit Admin' />
                <link rel="icon" href="/images/title_logo.png" />
              </Head>
              <Header />
              <Topbar />
              <div className="content-page">
                <div className="content">
                  <div className="container-fluid">
                    <div className="card mb-4" style={{ width: "1400px", marginTop: "40px" }}>
                      <div className="card-header"><b>DOCTOR Profile</b></div>
                      <Scrollbars style={{ height: 500, maxHeight: 600 }}>
                        <div className="card-body" style={{ maxWidth: "1300px" }}>
                          <form role="form" onSubmit={handleSubmit}>
                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                              <label htmlFor="fileInput">
                                <div className="user-avatar mt-4" style={{ position: 'relative', display: 'inline-block' }}>
                                  <img src={values.caretaker_profile_image} alt="caretaker_profile" style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }} />
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
                                  <div className="doctor-profile-form-group mt-4">
                                    <label htmlFor="firstName" className="small mb-1">First Name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="Enter first name" value={caretaker_firstname} onChange={handleChange('caretaker_firstname')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-4">
                                    <label htmlFor="lastName" className="small mb-1">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={caretaker_lastname} onChange={handleChange('caretaker_lastname')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="phoneNumber" className="small mb-1">Phone Number</label>
                                    <input type="text" className="form-control" id="phoneNumber" placeholder="Enter phone number" value={caretaker_phone_number} onChange={handleChange('caretaker_phone_number')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="patient-profile-form-group mt-2">
                                    <label htmlFor="dateOfBirth" className="small mb-1">Date of Birth</label>
                                    <input type="date" className="form-control" id="dateOfBirth" value={caretaker_dob} onChange={handleChange('caretaker_dob')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="gender" className="small mb-1">Gender</label>
                                    <select className="form-control" id="gender" value={caretaker_gender} onChange={handleChange('caretaker_gender')}>
                                      <option value="male">Male</option>
                                      <option value="female">Female</option>
                                      <option value="other">Other</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="email" className="small mb-1">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={caretaker_email} onChange={handleChange('caretaker_email')} />
                                  </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                  <div className="doctor-profile-form-group">
                                    <label htmlFor="address" className="small mb-1">Address</label>
                                    <textarea className="form-control" id="address" placeholder="Enter address" value={caretaker_address} onChange={handleChange('caretaker_address')}></textarea>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="doctorType" className="small mb-1">Caretaker Type</label>
                                    <select className="form-control" id="doctorType" value={caretaker_type} onChange={handleChange('caretaker_type')}>
                                      {typedetail.map(caretakertype => (
                                        <option key={caretakertype._id} value={caretakertype._id}>
                                          {caretakertype.admin_specialist_type_name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="referralCode" className="small mb-1">Referral Code</label>
                                    <input type="text" className="form-control" id="referralCode" placeholder="Enter referralCode" value={caretaker_referralcode} onChange={handleChange('caretaker_referralcode')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="country" className="small mb-1">Country</label>
                                    <select className="form-control" id="country" value={caretaker_country_id} onChange={handleChange('caretaker_country_id')}>
                                      {countrydetail.map(country => (
                                        <option key={country._id} value={country._id}>
                                          {country.admin_country_name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="state" className="small mb-1">State</label>
                                    <select className="form-control" id="state" value={caretaker_state_id} onChange={handleChange('caretaker_state_id')}>
                                      {statedetail.map(state => (
                                        <option key={state._id} value={state._id}>
                                          {state.admin_state_name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="city" className="small mb-1">City</label>
                                    <select className="form-control" id="city" value={caretaker_city_id} onChange={handleChange('caretaker_city_id')}>
                                      {citydetail.map(city => (
                                        <option key={city._id} value={city._id}>
                                          {city.admin_city_name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="pinCode" className="small mb-1">Pin Code</label>
                                    <input type="text" className="form-control" id="pinCode" placeholder="Enter pin code" value={caretaker_pincode} onChange={handleChange('caretaker_pincode')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="workExperience" className="small mb-1">Work Experience</label>
                                    <select className="form-control" id="workExperience" value={caretaker_work_experience} onChange={handleChange('caretaker_work_experience')}>
                                      {workdetail.map(workexperience => (
                                        <option key={workexperience._id} value={workexperience._id}>
                                          {workexperience.admin_work_experience_in_year}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="yearOfPassing" className="small mb-1">Year of Passing</label>
                                    <select className="form-control" id="yearOfPassing" value={caretaker_year_of_passing} onChange={handleChange('caretaker_year_of_passing')}>
                                      {yeardetail.map(yearofpassing => (
                                        <option key={yearofpassing._id} value={yearofpassing._id}>
                                          {yearofpassing.admin_year_of_passing}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="degree" className="small mb-1">Degree Name</label>
                                    <input type="text" className="form-control" id="degree" placeholder="Enter degree" value={degree_name} onChange={handleChange('degree_name')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="university" className="small mb-1">University</label>
                                    <input type="text" className="form-control" id="university" placeholder="Enter university" value={university_name} onChange={handleChange('university_name')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="latitude" className="small mb-1">Latitude</label>
                                    <input type="text" className="form-control" id="latitude" placeholder="Enter latitude" value={caretaker_latitude} onChange={handleChange('caretaker_latitude')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="longitude" className="small mb-1">Longitude</label>
                                    <input type="text" className="form-control" id="longitude" placeholder="Enter longitude" value={caretaker_longitude} onChange={handleChange('caretaker_longitude')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="emergencyContactName" className="small mb-1">Emergency Contact Name</label>
                                    <input type="text" className="form-control" id="emergencyContactName" placeholder="Enter emergency contact name" value={emergency_name} onChange={handleChange('emergency_name')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="emergencyContactPhone" className="small mb-1">Emergency Contact Phone</label>
                                    <input type="text" className="form-control" id="emergencyContactPhone" placeholder="Enter emergency contact phone" value={emergency_phone} onChange={handleChange('emergency_phone')} />
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="licenseExpiryDate" className="small mb-1">License Expiry Date</label>
                                    <input type="date" className="form-control" id="licenseExpiryDate" value={licenseexpirydate} onChange={handleChange('licenseexpirydate')} />
                                  </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                  <div className="doctor-profile-form-group mt-2">
                                    <label htmlFor="description" className="small mb-1">Description</label>
                                    <textarea className="form-control" id="description" placeholder="Enter description" value={description} onChange={handleChange('description')}></textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                  <div className="text-right mt-4">
                                    <button type="button" className="btn btn-secondary" onClick={Cancel}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                  </div>
                                  {msg ? <p>{msg}</p> : null}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </Scrollbars>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        };

    export default DoctorProfileUpdate;