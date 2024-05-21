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
import { CountryListById, update_country,country_list } from '../../actions/countryAction';
import { state_list,StateListById,state_list_by_country_id } from '../../actions/stateAction';
import { city_list, update_city,city_list_by_state_id } from '../../actions/cityAction';



const PatientProfileUpdate = () => {
    const router = useRouter();
    const [profilePhoto, setProfilePhoto] = useState(null);
    // const [countryList, setCountryList] = useState([]);
    // const [stateDetail, setStateDetail]=useState([]);
    const [state, setState] = useState('');
    const defaultProfileImage = '/images/userLogo.png';
    const [values, setValues] = useState({
           
            patient_first_name:'',
            patient_last_name:'',
            patient_phone_number:'',
            patient_dob:'',
            patient_gender:'',
            patient_email:'',
            patient_address:'',
            patient_country_id:'',
            patient_state_id:'',
            patient_area_id:'',
            patient_pincode:'',
            patient_main_address:'',
            patient_profile:'',
            error: '',
            loading: false,
            countrydetail: [],
        statedetail: [],
        citydetail:[],
    });
    
    const { patient_first_name, patient_last_name,  patient_phone_number, patient_dob,patient_gender,patient_email,patient_address,patient_country_id,patient_state_id, patient_area_id,patient_pincode,patient_main_address,patient_profile,countrydetail,statedetail,citydetail,error, loading } = values;
    const [msg, setMsg] = useState('');
 

    useEffect(() => {
        const pat_id = localStorage.getItem('id');
        if (!pat_id) {
            Router.push('/login');
        } else {
            
            loadPatientDetails();
    
            
        }
    }, [router.query._id]);

//     const loadCountryDetails = () => {
//     CountryListById(router.query._id).then(country => {
//         if (country.error) {
//             console.log(country.error);
//         } else {
//             if (country.admin_country_list && country.admin_country_list.length > 0) {
//                 setValues({
//                     ...values,
//                     patient_country_id: country.admin_country_list[0].patient_country_id
//                 });
//             } else {
//                 console.log('No country details found.');
//             }
//         }
//     });
// };

    
    const loadPatientDetails = () => {
        country_list().then(countrydata => {
            if (countrydata.error) {
                console.log(countrydata.error);
            } else {
                state_list().then(state => {
                    if(state.error){
                        console.log(state.error);
                    }else {
                        city_list().then(city => {
                            if (city.error) {
                                console.log(city.error);
                            } else {
        patient_details_by_id(router.query._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    const patientData = data.patient_list[0];
                    setValues({
                        ...values,
                        patient_first_name: patientData. patient_first_name,
                        patient_last_name: patientData. patient_last_name,
                        patient_phone_number: patientData. patient_phone_number,
                        patient_dob: patientData. patient_dob,
                        patient_gender: patientData. patient_gender,
                        patient_email: patientData. patient_email,
                        patient_address: patientData. patient_address,
                        patient_country_id: patientData. patient_country_id,
                        patient_state_id: patientData. patient_state_id,
                        patient_area_id: patientData. patient_area_id,
                        patient_pincode: patientData. patient_pincode,
                        patient_main_address: patientData. patient_main_address,
                        patient_profile: patientData. patient_profile_image|| defaultProfileImage,
                        countrydetail:countrydata.admin_country_list,
                        statedetail:state.state_list,
                        citydetail:city.city_list,
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
    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
        const value = e.target.value;
        if (name === 'patient_gender') {
          setValues({ ...values, patient_gender: value });
        } else {
          setValues({ ...values, [name]: value });
        }
        if (name === "patient_country_id") {
          state_list_by_country_id(value).then(data1 => {
            if (data1.error) {
              console.log(data1.error);
            } else {
              setValues({ ...values, stateList: data1.state_list, patient_country_id: value });
            }
          });
        }
        if (name === "patient_state_id") {
          city_list_by_state_id(value).then(data2 => {
            if (data2.error) {
              console.log(data2.error);
            } else {
              setValues({ ...values, areaList: data2.city_list, patient_state_id: value });
            }
          });
        }
        if (name === "patient_area_id") {
          CityListById(value).then(data3 => {
            if (data3.error) {
              console.log(data3.error);
            } else {
              setValues({ ...values,  patient_area_id: value });
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
                    // const countryData = {
                    //     country_id: patient_id,
                    //     patient_country_id,
                    //     admin_updated_by_id:patient_updated_by_id,
                    // };
                    // const countryRes = await update_country(countryData);
                    // if (countryRes.error) {
                    //     setValues({ ...values, error: countryRes.error });
                    // } else {
                    //     setMsg('Edited Successfully');
                    //     setTimeout(() => {
                    //         setMsg('');
                            Router.push(`/Patient/ViewPatientList`);
                //         }, 2000);
                     }
                // }
            } catch (error) {
                console.error('Error:', error);
                setValues({ ...values, error: 'Error updating profile', loading: false });
            }
        };
    
        
    
        const Cancel = () => {
            const user_id = localStorage.getItem("id");
            loadUserDetails(user_id);
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
                <div className="card mb-4" style={{ width: "1000px", marginTop: "40px" , height:'500px',minHeight:'400px'}}>
                  <div className="card-header">Edit Patient here</div>
                  <Scrollbars style={{ height: 900, maxHeight: 1000 }}>
                    <div className="card-body" style={{ maxWidth: "900px",width:'800px' }}>
    
                    <form role="form" onSubmit={handleSubmit}>
                       
                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                               
                                        
                                        <label htmlFor="fileInput">
                                            <div className="user-avatar mt-4" style={{ position: 'relative', display: 'inline-block' }}>
                                                <img src={values.patient_profile} alt="Patient Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} />
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
                                                <div className="patient-profile-form-group mt-2">
                                                    <label htmlFor="phoneNumber" className="small mb-1">Phone Number</label>
                                                    <input type="text" className="form-control" id="phoneNumber" placeholder="Enter phone number" value={patient_phone_number} onChange={handleChange('patient_phone_number')} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="patient-profile-form-group  mt-2">
                                                    <label htmlFor="dateOfBirth" className="small mb-1">Date of Birth</label>
                                                    <input type="date" className="form-control" id="dateOfBirth" value={patient_dob} onChange={handleChange('patient_dob')} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="patient-profile-form-group  mt-2">
                                                    <label htmlFor="gender" className="small mb-1">Gender</label>
                                                    <select className="form-control" id="gender" value={patient_gender} onChange={handleChange('patient_gender')}>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="patient-profile-form-group  mt-2">
                                                    <label htmlFor="email" className="small mb-1">Email</label>
                                                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={patient_email} onChange={handleChange('patient_email')} />
                                                </div>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div className="patient-profile-form-group">
                                                    <label htmlFor="address" className="small mb-1">Address</label>
                                                    <textarea className="form-control" id="address" placeholder="Enter address" value={patient_address} onChange={handleChange('patient_address')}></textarea>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="patient-profile-form-group  mt-2">
                                                    <label htmlFor="country" className="small mb-1">Country</label>
                                                    <select className="form-control" id="country" value={patient_country_id} onChange={handleChange('patient_country_id')}>
                                                    {countrydetail.map(country => (
                                                        <option key={country._id} value={country._id}>
                                                            {country.admin_country_name}
                                                        </option>
                                                    ))}
                                                        
                                                </select>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="patient-profile-form-group  mt-2">
                                                    <label htmlFor="state" className="small mb-1">State</label>
                                                    <select className="form-control" id="state" value={patient_state_id} onChange={handleChange('patient_state_id')}>
                                                    {statedetail.map(state => (
                                                        <option key={state._id} value={state._id}>
                                                            {state.admin_state_name}
                                                        </option>
                                                    ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="patient-profile-form-group  mt-2">
                                                    <label htmlFor="area" className="small mb-1">Area</label>
                                                    <select className="form-control" id="patient_area_id" value={patient_area_id} onChange={handleChange('patient_area_id')}>
                                                    {citydetail.map(city => (
                                                        <option key={city._id} value={city._id}>
                                                            {city.admin_city_name}
                                                        </option>
                                                    ))}
                                                    </select>
                                                   
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="patient-profile-form-group  mt-2">
                                                    <label htmlFor="pincode" className="small mb-1">Pincode</label>
                                                    <input type="text" className="form-control" id="pincode" placeholder="Enter pincode" value={patient_pincode} onChange={handleChange('patient_pincode')} />
                                                </div>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div className="patient-profile-form-group  mt-2">
                                                    <label htmlFor="mainAddress" className="small mb-1">Main Address</label>
                                                    <textarea className="form-control" id="mainAddress" placeholder="Enter main address" value={patient_main_address} onChange={handleChange('patient_main_address')}></textarea>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="row gutters">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div className="text-right">
                                                    <button type="submit" className="btn btn-primary mr-2" style={{ background: "#3085d6", borderColor: "#0c9da8", marginTop: "20px" }}>Update</button>
                                                    {msg && <div className="alert alert-success margin-top-10">{msg}</div>}
                                                    {/* {error && <div className="alert alert-danger margin-top-10">{error}</div>} */}
                                                    {/* {loading && <div className="alert alert-info">Loading...</div>} */}
                                                    <button type="button" className="btn btn-secondary" onClick={Cancel} style={{ marginTop: "20px" }}>Cancel</button>
                                                </div>
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

    export default PatientProfileUpdate;
    
        