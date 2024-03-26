import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { getAdminById } from '../actions/adminprofileAction';

 const AdminProfile = () => {
    const [bio, setBio] = useState('');
    const [adminData, setAdminData] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
          try {
              const adminId = localStorage.getItem('adminId');
              console.log('Admin ID:', adminId);
              if (adminId) {
                  const data = await getAdminById(adminId);
                  if (data && data.admin_list && data.admin_list.length > 0) {
                      setAdminData(data.admin_list); 
                  }
              }
          } catch (error) {
              console.error('Error fetching admin data:', error);
          }
      };

      fetchData();


      const savedBio = localStorage.getItem('adminBio');
      if (savedBio) {
        setBio(savedBio);
      }
    }, []);


    const handleBioChange = (e) => {
      const newBio = e.target.value;
      setBio(newBio);
      localStorage.setItem('adminBio', newBio); 
    };

    const handleProfilePhotoChange = (e) => {
      const file = e.target.files[0];
      
    };
  

  return (
    <div className="container emp-profile">
      <form method="post">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img" style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden' }}>
            <label  htmlFor="fileInput">
            {adminData && adminData.admin_profile_image ? (
                  <img src={adminData.admin_profile_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                ) : (
                  <div>No Profile Photo</div>
                )}
              </label>
              <input id="fileInput" type="file" name="file" style={{ display: 'none' }} onChange={handleProfilePhotoChange} />
              
            </div>
          </div>
          <div className="col-md-6">
          <div className="profile-head">
              <h4>{adminData ? `${adminData.admin_firstname} ${adminData.admin_lastname}` : 'Admin Name'}</h4>
              <h5>{adminData ? adminData.admin_type : 'Admin'}</h5>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <Link href="/Adminprofileupdate">
              <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="col-md-8">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Add Bio"
                value={bio}
                onChange={handleBioChange}
              ></textarea>
            </div>
          </div>
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-md-6" >
                    <label>First Name</label>
                  </div>
                  <div className="col-md-6 small-width-input">
                    <input type="text" className="form-control" value={adminData.admin_firstname || ''} readOnly />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6" style={{ marginTop: '10px'}}>
                    <label>Last Name</label>
                  </div>
                  <div className="col-md-6" style={{ marginTop: '10px'}}>
                    <input type="text" className="form-control" value={adminData.admin_lastname || ''} readOnly />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6" style={{ marginTop: '10px' }}>
                    <label>Username</label>
                  </div>
                  <div className="col-md-6" style={{ marginTop: '10px' }}>
                    <input type="text" className="form-control" value={adminData.admin_username || ''} readOnly />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6" style={{ marginTop: '10px' }}>
                    <label>Email</label>
                  </div>
                  <div className="col-md-6" style={{ marginTop: '10px' }}>
                    <input type="text" className="form-control" value={adminData.admin_email || ''} readOnly />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6" style={{ marginTop: '10px' }}>
                    <label>Mobile Number</label>
                  </div>
                  <div className="col-md-6" style={{ marginTop: '10px' }}>
                    <input type="text" className="form-control" value={adminData.admin_mobile_no || ''} readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
