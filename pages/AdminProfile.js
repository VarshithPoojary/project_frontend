import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from './Header';
import Topbar from './topbar';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { admin_details_by_id, DeleteAdminDetails } from '../actions/adminprofileAction';

const AdminProfile = () => {
  const router = useRouter();

  const defaultProfileImage = '/images/userLogo.png';
  const [values, setValues] = useState({
    admin_list: [],
    admin_profile_image: '',
    admin_password: '',
    admin_type: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { admin_list, admin_profile_image, error, loading } = values;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const _id = router.query._id;
      if (_id) {
        loadAdminDetails(_id);
      }
    }
  }, []);

  const loadAdminDetails = (_id) => {
    
    admin_details_by_id(_id)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          const adminData = data.admin_list[0];
          setValues({
            ...values,
            admin_firstname: adminData.admin_firstname,
            admin_lastname: adminData.admin_lastname,
            admin_username: adminData.admin_username,
            admin_type: adminData.admin_type,
            admin_email: adminData.admin_email,
            admin_mobile_no: adminData.admin_mobile_no,
            admin_profile_image: adminData.admin_profile_image || defaultProfileImage,
            loading: false
          });
        }
      })
      .catch(error => {
        setValues({ ...values, error: 'Error: Network request failed', loading: false });
      });
  };

  const handleEdit=()=> {
    Router.push({
      pathname: '/Admin/EditAdmin',
      query: {
          _id: router.query._id,
      }
  });
  }

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
        const user_id = localStorage.getItem("id");
        DeleteAdminDetails(user_id);
        localStorage.removeItem('id');
        Router.push('/login');
      }
    });
  }

  return (
    <div>
      <Head>
        <title>Admin Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Admin_Profile' />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>

      <Topbar />
      <Header />

      <div className=" emp-profile" style={{ width: '1000px'}}>
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img" style={{ width: '150px', height: '150px', marginLeft: '100px', borderRadius: '10%', overflow: 'hidden' }}>
                <label htmlFor="fileInput">
                  <img src={admin_profile_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>
                </label>
                <input id="fileInput" name="file" style={{ display: 'none' }} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h4>{admin_list ? `${values.admin_firstname} ${values.admin_lastname}` : 'Admin Name'}</h4>
                <h5>{admin_list ? `${values.admin_type}` : 'Admin'}</h5>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="" role="tab" aria-controls="home" aria-selected="true">Personal Details</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              {/* <Link  >
                <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
              </Link> */
            
              }
               <Link href={`/Admin/EditAdmin?_id=${router.query._id}`}>
               <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
            </Link>
              
              <Link href={`/Adminpasswordedit?_id=${router.query._id}`}>
                <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Password" />
              </Link>
              <input type="button" className="profile-edit-btn" name="btnAddMore" value="Delete Profile" onClick={() => handleDelete()} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="col-md-8"></div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label style={{ color: 'gray' }}>First Name :</label>
                    </div>
                    <div className="col-md-6 small-width-input">
                      <label>{values.admin_firstname}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label style={{ color: 'gray' }}>Last Name :</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label>{values.admin_lastname}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label style={{ color: 'gray' }}>Username :</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label>{values.admin_username}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label style={{ color: 'gray' }}>Email :</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label>{values.admin_email}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label style={{ color: 'gray' }}>Mobile Number:</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label>{values.admin_mobile_no}</label>
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

export default AdminProfile;
