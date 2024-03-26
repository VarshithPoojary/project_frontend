import React, { useState } from 'react';
import Link from 'next/link';


const UserProfileUpdate = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   
    const [profileImage, setProfileImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    const handleProfileImageClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleUpdateProfile = () => {
        // Add your logic here to handle the profile update
        console.log('Profile updated successfully!', {
            firstName,
            lastName,
            email,
            mobileNumber,
            userName,
            password,
            confirmPassword,
           
            profileImage,
        });
    };

    



    return (
        <div className="container">
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card h-100" style={{ marginTop: '80px',minHeight: '60px'}}>
                        <div className="card-body">
                            <div className="user-profile text-center">
                                <label htmlFor="fileInput">
                                    <div className="user-avatar" onClick={handleProfileImageClick}>
                                        <img src="/images/profile1.jpeg" alt="Admin Profile" style={{ width: '90px', height: '90px', borderRadius: '50%', cursor: 'pointer' }} />
                                    </div>
                                </label>
                                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                                <h5 className="user-name">xxxxxx</h5>
                                <h6 className="user-email">yyyyyy</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div className="card h-100" style={{ marginTop: '80px',minHeight: '60px'}}>
                        <div className="card-body">
                            <div className="row gutters" >
                            
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 className="mb-2 text-primary">Personal Details</h6>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="mobileNumber">Mobile Number</label>
                                        <input type="text" className="form-control" id="mobileNumber" placeholder="Enter mobile number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="userName">Username</label>
                                        <input type="text" className="form-control" id="userName" placeholder="Enter username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                </div>
                                
                                
                            </div>
                            <div className="row gutters">
                              
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="text-right">
                                    <Link href="/Adminprofileui">
                                        <button type="button" className="btn btn-primary mr-2">Profile</button>
                                    </Link>                
                                        <button type="button" className="btn btn-primary mr-2" onClick={handleUpdateProfile}>Update</button>
                                        <button type="button" className="btn btn-secondary"  >Cancel</button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileUpdate;
