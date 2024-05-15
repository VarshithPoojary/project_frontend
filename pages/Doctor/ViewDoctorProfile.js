// import React from 'react';

// const DoctorProfileCard = () => {
//   return (
//     <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
//       <div className="row">
//         {/* Profile Photo Card */}
//         <div className="col-md-4">
//           <div className="profile-card card h-100">
//             <div className="card-body d-flex align-items-center justify-content-center">
//               <img
//                 src="https://bootdey.com/img/Content/avatar/avatar7.png"
//                 alt="Doctor"
//                 className="rounded-circle"
//                 width="100"
//                 style={{ position: 'absolute', top: 150 }}/>
//                   <div style={{ position: 'absolute', top: 300 }} > <b>Doctor Profile</b></div> 
//             </div>
//             </div>
//             </div>

            
//         {/* Profile Details Card */}
//         <div className="col-md-7">
//           <div className="profile-details-card card h-100">
//             <div className="card-body">
//               <form>
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <label htmlFor="firstName" className="form-label">First Name:</label>
//                     <input type="text" className="form-control" id="firstName" />
//                   </div>
//                   <div className="col-md-6">
//                     <label htmlFor="lastName" className="form-label">Last Name:</label>
//                     <input type="text" className="form-control" id="lastName" />
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <label htmlFor="referralCode" className="form-label">Referral Code:</label>
//                     <input type="text" className="form-control" id="referralCode" />
//                   </div>
//                   <div className="col-md-6">
//                     <label htmlFor="mobile" className="form-label">Mobile Number:</label>
//                     <input type="tel" className="form-control" id="mobile" />
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label htmlFor="doctorType" className="form-label">Doctor Type:</label>
//                       <input type="text" className="form-control" id="doctorType" />
//                     </div>
//                     <div className="col-md-6">
//                       <label htmlFor="dob" className="form-label">Date of Birth:</label>
//                       <input type="text" className="form-control" id="dob" />
//                     </div>
//                   </div>
//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label htmlFor="gender" className="form-label">Gender:</label>
//                       <input type="text" className="form-control" id="gender" />
//                     </div>
//                     <div className="col-md-6">
//                       <label htmlFor="email" className="form-label">Email:</label>
//                       <input type="email" className="form-control" id="email" />
//                     </div>
//                   </div>
//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label htmlFor="address" className="form-label">Address:</label>
//                       <textarea className="form-control" id="address" rows="3"></textarea>
//                     </div>
//                     </div>
//                     <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label htmlFor="pincode" className="form-label">Pincode:</label>
//                       <input type="text" className="form-control" id="pincode" />
//                     </div>
//                     <div className="col-md-6">
//                       <label htmlFor="yearOfPassing" className="form-label">Year of Passing:</label>
//                       <input type="text" className="form-control" id="yearOfPassing" />
//                     </div>
//                   </div>
//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <label htmlFor="workExperience" className="form-label">Work Experience:</label>
//                       <input type="text" className="form-control" id="workExperience" />
//                     </div>
//                   </div>

//                 <div className="text-center">
//                   <button type="submit" className="btn btn-primary">Submit</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfileCard;





import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Topbar from '../topbar';
import Header from '../Header';
import { useRouter } from 'next/router';
import { FiCamera } from 'react-icons/fi'; 
import { Scrollbars } from 'react-custom-scrollbars';
import Head from 'next/head';
import Router from 'next/router';
//import { doctor_details_by_id } from '../actions/doctorprofileAction';
import { doctor_details_by_id, update_doctor,DeleteDoctorDetails } from '../../actions/doctorprofileAction';
import { doctor_list } from '../../actions/doctorprofileAction';

const DoctorProfile = () => {
  const defaultProfileImage = '/images/userLogo.png';
  const [values, setValues] = useState({
    doctor_list: [],
    caretaker_profile_image: '',
    
    //admin_type: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const [bio, setBio] = useState('');
  const { doctor_list, caretaker_profile_image, error, loading } = values;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const doctor_id = localStorage.getItem('id');
      if (doctor_id === "" || doctor_id === null || doctor_id === undefined) {
        Router.push('/login');
      } else {
        loadcaretakerDetails(doctor_id);
        loadBio(doctor_id);
      }
    }
  }, []);

  const loadcaretakerDetails = (doctor_id) => {
    doctor_details_by_id(doctor_id)
      .then(data => {
        if (data.error) {
          console.log(data.error);
          setValues({ ...values, error: data.error, loading: false });
        } else {
          const doctorData = data.caretaker_list[0];
          setValues({
            ...values,
            caretaker_firstname: doctorData.caretaker_firstname,
            caretaker_lastname: doctorData.caretaker_lastname,
            caretaker_phone_number: doctorData.caretaker_phone_number,
          
            caretaker_email: doctorData.caretaker_email,
           
            caretaker_profile: doctorData.caretaker_profile_image || defaultProfileImage,
            loading: false
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setValues({ ...values, error: 'Error: Network request failed', loading: false });
      });
  };

  const loadBio = (doctor_id) => {
    const savedBio = localStorage.getItem(`doctorBio_${doctor_id}`);
    if (savedBio) {
      setBio(savedBio);
    }
  };



 
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Profile!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
    const doctor_id = localStorage.getItem("id");
    DeleteDoctorDetails(doctor_id);
    localStorage.removeItem('id');
    Router.push('/login');

  }
});
}

  return (
    <div>
      <Head>
        <title>Doctor Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='caretaker_profile' />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>

      <Topbar />
      <Header />

      <div className=" emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img" style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden' }}>
                <label htmlFor="fileInput">
                  <img src={caretaker_profile_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover'}}></img>
                </label>
                <input id="fileInput" name="file" style={{ display: 'none' }} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h4>{doctor_list ? `${values.caretaker_firstname} ${values.caretaker_lastname}` : 'Admin Name'}</h4>
               
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="" role="tab" aria-controls="home" aria-selected="true">Personal Details</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <Link href="/Doctor/EditDoctor">
                <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
              </Link>
              
              <input type="button" className="profile-edit-btn" name="btnAddMore" value="Delete Profile" onClick={() => handleDelete()} />

            </div>

          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="col-md-8">
                
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6" >
                      <label style={{color:'gray'}}>First Name :</label>
                    </div>
                    <div className="col-md-6 small-width-input">
                    <label >{values.caretaker_firstname}</label>
                      {/* <input type="text" className="form-control"  value={values.admin_firstname} readOnly /> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label style={{color:'gray'}}>Last Name :</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label>{values.caretaker_lastname}</label>
                      {/* <input type="text" className="form-control" value={values.admin_lastname} readOnly /> */}
                    </div>
                   </div>
                  {/* <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label style={{color:'gray'}}>Username :</label>
                    </div> 
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                    <label>{values.admin_username}</label>
                     
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label style={{color:'gray'}}>Email :</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                    <label>{values.caretaker_email}</label>
                      {/* <input type="text" className="form-control" value={values.admin_email} readOnly /> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                    <label style={{color:'gray'}}>Mobile Number:</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                    <label>{values.caretaker_phone_number}</label>
                      {/* <input type="text" className="form-control" value={values.admin_mobile_no} readOnly /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfile;
