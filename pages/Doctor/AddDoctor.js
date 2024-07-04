import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Router from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../Header';
import Topbar from '../topbar';
import { add_doctor } from '../../actions/doctorprofileAction';
import { country_list } from '../../actions/countryAction';
import { state_list_by_country_id } from '../../actions/stateAction';
import { city_list_by_state_id } from '../../actions/cityAction';
import {YearOfPassing_List} from  '../../actions/YearOfPassingAction';
import { workExperience_list } from '../../actions/workexperienceAction';
import { specialistType_list } from '../../actions/SpeciaListTypeAction';

const AddDoctor = () => {
    const defaultProfileImage = '/images/userLogo.jpeg';
    // const [countryList, setCountryList] = useState([]);
    // const [stateDetail, setStateDetail] = useState([]);
    // const [cityList, setCityList] = useState([]);
    
    // const [work_list, setWorkList] = useState([]);
    // const [yearOfPassing_list, setyearOfPassinglist] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [workList, setWorkList] = useState([]);
    const [yearOfPassingList, setYearOfPassingList] = useState([]);
    const [stateDetail, setStateDetail] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [caretakerList, setcaretakerList] = useState([]);

    // const [state, setState] = useState('');
    // const [country, setCountry] = useState('');
   
  

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [referralCode, setreferralCode] = useState('');
    const [DoctorType, setDoctorType] = useState('');
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
    const [caretakeraptnum, setCaretakeraptnum] = useState('');

    const [workExperience,setWorkExperience]=useState('');
    const [yearOfPassing, setYearOfPassing]=useState('');

    const [degreename, setDegreename] = useState('');
    const [uniname, setUniname] = useState('');

    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const [Emgname, setEmgname] = useState('');
    const [Emgphone, setEmgphone] = useState('');
     const [licenceimage, setlicenceimage] = useState(null);
    const [licenseexpirydate, setlicenseexpirydate] = useState('');
    const [description, setdescription] = useState('');

   
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
        referralCode: '',
        DoctorType:'',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        address: '',
        country: '',
        state: '',
        area: '',
        pincode: '',
        caretakeraptnum:'',
        workExperience: '',
        yearOfPassing: '',
        degreename:'',
        uniname:'',
        longitude:'',
        latitude:'',

        Emgname: '',
        Emgphone: '',
          licenceimage:'',
         description:'',
         licenseexpirydate:'',

        status:'',
        doctor_password:''
        
    });

    const [passwordValidations, setPasswordValidations] = useState({
      upperCase: false,
      lowerCase: false,
      digit: false,
      specialChar: false,
      length: false,
  });

//     useEffect(() => {
//       loadCountryDetail();  
//      loadWorkExperienceList(); 
//      loadYearOfPassingList(); 
//     // loadDetail();  
      
//   }, []);
 


//   const loadCountryDetail = () => {
//       country_list()
//           .then(response => {
//               if (response.error) {
//                   console.log(response.error);
//               } else {
//                   setCountryList(response.admin_country_list);
//               }
//           })
//           .catch(error => console.error(error));
//   };

//   const handleCountryChange = (admin_country_id) => {
//       state_list_by_country_id(admin_country_id)
//           .then(response => {
//               setCountry(admin_country_id)
//               setStateDetail(response.state_list);
//           })
//           .catch(error => {
//               console.error('Error fetching state list:', error);
//           });
//   };

//   const handleStateChange = (admin_state_id) => {
//       city_list_by_state_id(admin_state_id)
//           .then(response => {
//               setState(admin_state_id)
//               setCityList(response.city_list);
//           })
//           .catch(error => {
//               console.error('Error fetching city list:', error);
//           });
//   };


  
//   const loadWorkExperienceList = () => {
//     workExperience_list()
//         .then(response => {
//             console.log("Work Experience List:", response); 
//             if (response.error) {
//                 console.log(response.error);
//             } else {
//               setWorkList(response);
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching work experience list:', error);
//         });
// };


// const handleWorkExperienceChange = (e) => {
  
// };


// const loadYearOfPassingList = () => {
//   YearOfPassing_List()
//       .then(response => {
//           console.log("Year Of Passing List:", response); 
//           if (response.error) {
//               console.log(response.error);
//           } else {
//             setyearOfPassinglist(response);
//           }
//       })
//       .catch(error => {
//           console.error('Error fetching work experience list:', error);
//       });
// };


useEffect(() => {
  const loadDetail = async () => {
    try {
      const countryResponse = await country_list();
      if (countryResponse.error) {
        console.error(countryResponse.error);
        return;
      }
      setCountryList(countryResponse.admin_country_list);

      const workResponse = await workExperience_list();
      console.log("Work Experience List:", workResponse);
      if (workResponse.error) {
        console.error(workResponse.error);
        return;
      }
      setWorkList(workResponse.admin_workexperience_list);
      

      const yearOfPassingResponse = await YearOfPassing_List();
      console.log("Year Of Passing List:", yearOfPassingResponse);
      if (yearOfPassingResponse.error) {
        console.error(yearOfPassingResponse.error);
        return;
      }
      setYearOfPassingList(yearOfPassingResponse.admin_yearofpassing_list);

      const specialistTypeResponse = await specialistType_list();
      console.log("specialist Type  List:", specialistTypeResponse);
      if (specialistTypeResponse.error) {
        console.error(specialistTypeResponse.error);
        return;
      }
      setcaretakerList(specialistTypeResponse.admin_specialist_type_list);



    } 
    catch (error) {
      console.error(error);
    }
  };

  loadDetail();
}, []);

const handleCountryChange = (admin_country_id) => {
  state_list_by_country_id(admin_country_id)
    .then(response => {
      setCountry(admin_country_id);
      setStateDetail(response.state_list);
    })
    .catch(error => {
      console.error('Error fetching state list:', error);
    });
};

const handleStateChange = (admin_state_id) => {
  city_list_by_state_id(admin_state_id)
    .then(response => {
      setState(admin_state_id);
      setCityList(response.city_list);
    })
    .catch(error => {
      console.error('Error fetching city list:', error);
    });
};


// const handleWorkExperienceChange = () => {
//   setWorkExperience(value);
// };



// const handleYearOfPassingChange = (value) => {
//   setYearOfPassingList(value);
// };

// const handleWorkExperienceChange = e => {
//   setWorkExperience(e.target.value);
// };

// const handleYearOfPassingChange = e => {
//   setYearOfPassing(e.target.value);
// };



    const onFileChange = (e) => {
      setProfileImage(e.target.files[0]);
      setlicenceimage(e.target.files[0]);
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
        if (!referralCode.trim()) {
            validationErrors.referralCode = 'Please enter your referral code.';
        }
        if (!DoctorType) {
            validationErrors.DoctorType = 'Please enter caretaker type.';
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
    
         if (!caretakeraptnum) {
             validationErrors.caretakeraptnum = 'Please enter your apartment number.';
         }

         if (!workExperience) {
          validationErrors.workExperience = 'Please enter your work experience.';
         }
         if (!yearOfPassing) {
          validationErrors.yearOfPassing = 'Please enter your Year of Passing.';
         }
         if (!degreename) {
         validationErrors.degreename = 'Please enter your Degree Name.';
         }
        if (!uniname) {
        validationErrors.uniname = 'Please enter your University name.';
        }
       if (!longitude) {
       validationErrors.longitude = 'Please enter your  longitude.';
       }
       if (!latitude) {
       validationErrors.latitude = 'Please enter your latitude .';
       }

       if (!Emgname) {
        validationErrors.Emgname = 'Please enter emergency name';
    }
    if (!Emgphone) {
        validationErrors.Emgphone = 'Please enter emergency phone numbner';
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
            var caretaker_created_by_id= localStorage.getItem('id');
            const formData = new FormData();
            formData.append('caretaker_firstname', firstName);
            formData.append('caretaker_lastname', lastName);
            formData.append('caretaker_referralcode', referralCode);
            formData.append('caretaker_type', DoctorType);

            formData.append('caretaker_phone_number', phoneNumber);
            formData.append('caretaker_country_code', countryCode);
            formData.append('caretaker_dob', dateOfBirth);
            formData.append('caretaker_gender', gender);
            formData.append('caretaker_email', email);
            formData.append('caretaker_address', address);
            formData.append('caretaker_country_id', country);
            formData.append('caretaker_state_id', state);
            formData.append('caretaker_city_id', area);
            formData.append('caretaker_pincode', pincode);
            formData.append('caretaker_apt_number', caretakeraptnum);
            formData.append('caretaker_work_experience',workExperience );
            formData.append('caretaker_year_of_passing',yearOfPassing );
            formData.append('degree_name', degreename);
            formData.append('university_name', uniname);
            formData.append('caretaker_longitude', longitude);
            formData.append('caretaker_latitude', latitude);
            formData.append('emergency_name',Emgname);
            formData.append('emergency_phone',Emgphone);
           // formData.append('demo',licenceimage);
            formData.append('description',description);
            formData.append('driving_license_expiry_date',licenseexpirydate);

            formData.append('caretaker_register_status', status);
            formData.append('caretaker_approvedStatus', status);
            formData.append('password', password);
            formData.append('demoimg',  profileImage);
            formData.append('caretaker_created_by_id', caretaker_created_by_id);

            add_doctor(formData).then(response => {
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
                        Router.push(`/Doctor/ViewDoctorList`);
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
            referralCode,
            DoctorType,
            phoneNumber,
            dateOfBirth,
            gender,
            email,
            address,
            country,
            state,
            area,
            pincode,
            caretakeraptnum,
            workExperience,
            yearOfPassing,
            degreename,

            profileImage,
            status
        });
        
    
        setIsSuccess(false);
        setIsLoading(false);

    };

        const Cancel = () => {
            setFirstName('');
            setLastName('');
            setreferralCode('');
            setDoctorType('');
            setPhoneNumber('');
            setDateOfBirth('');
            setGender('');
            setEmail('');
            setAddress('');
            setCountry('');
            setState('');
            setArea('');
            setPincode('');
            setCaretakeraptnum('');
            setWorkExperience('');
            setYearOfPassing('');

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
            <title>Add Doctors </title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="title" content="Registration" />
            <link rel="icon" href="/images/title_logo.png" />
          </Head>
    
          <Topbar />
          <Header />
    
          <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="card mb-4" style={{ width: "1400px", marginTop: "40px" }}>
            <div className="card-header">Add Doctors Here....</div>
            <Scrollbars style={{ height: 500, maxHeight: 600 }}>
              <div className="card-body" style={{ maxWidth: "1300px" }}>
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
                            <label htmlFor="referralCode" className="small mb-1">Doctor referralCode<span style={{ color: 'red' }}>*</span>:</label>
                            <input
                              className='form-control'
                              type="text"
                              id="referralCode"
                              value={referralCode}
                              onChange={(e) => setreferralCode(e.target.value)} />
                              {errors.referralCode && <div className="error-message" style={{color:'red'}}>{errors.referralCode}</div>}
                          </div>


                          
                        <div className="col-md-6">
                        <label htmlFor="caretakertype" className="small mb-1">Caretaker Type<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control' id="caretakertype"
                              onChange={(e) => setDoctorType(e.target.value)}>
                               <option value="">Select caretaker type</option>
                               { caretakerList.map(caretakertype => (
                                  <option key={caretakertype.admin_specialist_type_name} value={caretakertype.admin_specialist_type_name}>{caretakertype.specialist_type_name}</option>
                                ))}
                            </select>
                            {errors.DoctorType && <div className="error-message" style={{color:'red'}}>{errors.DoctorType}</div>}
                          </div>
                          </div>
                          

                        
                          <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="phoneNumber" className="small mb-1">Mobile Number<span style={{ color: 'red' }}>*</span>:</label>
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
                               
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            {errors.gender && <div className="error-message" style={{color:'red'}}>{errors.gender}</div>}
                          </div>

                          
                          <div className="col-md-6">
                            <label htmlFor="email" className="small mb-1">Email Id<span style={{ color: 'red' }}>*</span>:</label>
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
                            <label htmlFor="city" className="small mb-1">City<span style={{ color: 'red' }}>*</span>:</label>
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
                          <label className="small mb-1" htmlFor="caretakeraptnum">Apartment Number*</label>
                                        <input className="form-control" id="caretakeraptnum" type="text" placeholder="Enter your apt number" value={caretakeraptnum}
                                    onChange={(e) => setCaretakeraptnum(e.target.value)}/>
                                        {errors.caretakeraptnum && <div className="error-message" style={{color:'red'}}>{errors.caretakeraptnum}</div>}
                                    </div>
                                </div>
                       
                         <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="workExperience" className="small mb-1">work Experience<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="caretaker_work_experience"
                              onChange={(e) => setWorkExperience(e.target.value)}>
                               <option value="">Select Work Experience</option>
                               { workList.map(workExperience => (
                                  <option key={workExperience.admin_work_experience} value={workExperience.admin_work_experience}>{workExperience.admin_work_experience}</option>
                                ))}
                            </select>
                            {errors.workExperience && <div className="error-message" style={{color:'red'}}>{errors.workExperience}</div>}

                            </div>
                        


                          <div className="col-md-6">
                          <label htmlFor="YearOfPassing" className="small mb-1">Year Of Passing<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="yearOfPassing"
                              onChange={(e) =>  setYearOfPassing(e.target.value)}>
                               <option value="">Select Year Of Passing</option>
                               { yearOfPassingList.map(year => (
                                  <option key={year.admin_year_of_passing} value={year.admin_year_of_passing}>{year.admin_year_of_passing}</option>
                                ))}
                            </select>
                            {errors.yearOfPassing && <div className="error-message" style={{color:'red'}}>{errors.yearOfPassing}</div>}

                            </div>
                        </div>

                        <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="degreename">Degree Name*</label>
                                        <input className="form-control" id="degreename" type="text" placeholder="Enter your Degree" value={degreename}
                                    onChange={(e) => setDegreename(e.target.value)} />
                                        {errors.degreename && <div className="error-message" style={{color:'red'}}>{errors.degreename}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="uniname">University Name*</label>
                                        <input className="form-control" id="uniname" type="text" placeholder="Enter your university name" value={uniname}
                                    onChange={(e) => setUniname(e.target.value)}/>
                                        {errors.uniname && <div className="error-message" style={{color:'red'}}>{errors.uniname}</div>}
                                    </div>
                                </div>


                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="caretakerlongitude">Longitude*</label>
                                        <input className="form-control" id="longitude" type="text" placeholder="Enter the longitude" value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)} />
                                        {errors.longitude && <div className="error-message" style={{color:'red'}}>{errors.longitude}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="caretakerlatitude">Latitude*</label>
                                        <input className="form-control" id="latitude" type="text" placeholder="Enter the latitude" value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}/>
                                        {errors.latitude && <div className="error-message" style={{color:'red'}}>{errors.latitude}</div>}
                                    </div>
                                </div>
                                

                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="Emgname">Emergency name*</label>
                                        <input className="form-control" id="Emgname" type="text" placeholder="Enter your emergency name"  value={Emgname} onChange={(e) => setEmgname(e.target.value)} />
                                        {errors.Emgname && <div className="error-message" style={{color:'red'}}>{errors.Emgname}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="Emgphone">Emergency phone number*</label>
                                        <input className="form-control" id="Emgphone" type="text" placeholder="Enter your emergency phone number" value={Emgphone}
                                    onChange={(e) => setEmgphone(e.target.value)}/>
                                        {errors.Emgphone && <div className="error-message" style={{color:'red'}}>{errors.Emgphone}</div>}
                                    </div>
                                </div>


                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="licenceimage">driving_licence_image</label>
                                        <input className="form-control" id="licenceimage" type="file" onChange={onFileChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="licenseexpirydate">Driving license expiry date</label>
                                        <input className="form-control" id="licenseexpirydate" type="date" value={licenseexpirydate} onChange={(e) => setlicenseexpirydate(e.target.value)} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="description">Description</label>
                                    <textarea className="form-control" id="description" rows="3" placeholder="Enter description about you" value={description} onChange={(e) => setdescription(e.target.value)}></textarea>
                                    
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
          <style jsx>{`
        .content-page {
          padding: 20px;
        }

        .custom-card {
          width: 100%;
          margin: 0 auto;
          margin-top: 40px;
          max-width: 1400px;
        }

        .custom-card-body {
          max-width: 1300px;
          overflow-y: auto;
        }

        .card-header {
          background-color: #B4A3E1;
          color: #ffffff;
          padding: 10px 15px;
          font-weight: bold;
        }

        .form-control {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
        }

        .small {
          font-size: 0.875rem;
        }

        .error-message {
          color: red;
          font-size: 0.875rem;
          margin-top: 5px;
        }

        .registration-button {
           background-color: #B4A3E1;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 5px;
          margin-top: 10px;
        }

        .registration-button:hover {
          background-color: #B4A3E1;
        }

        .registration-cancel-button {
           background-color: #B4A3E1;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 5px;
          margin-top: 10px;
        }

        .registration-cancel-button:hover {
          background-color: #B4A3E1;
        }

        .success-message {
          color: #5cb85c;
          font-size: 1rem;
          margin-top: 10px;
        }

        .error-message {
          color: #d9534f;
          font-size: 1rem;
          margin-top: 10px;
        }
      `}</style>
        </>
      );

      
}

export default AddDoctor;