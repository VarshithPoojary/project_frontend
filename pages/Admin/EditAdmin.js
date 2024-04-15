import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Topbar from '../topbar';
import Header from '../Header';
import { useRouter } from 'next/router';
import { FiCamera } from 'react-icons/fi'; 
import Head from 'next/head';
import Router from 'next/router';
import { admin_details_by_id, update_admin } from '../../actions/adminprofileAction';

const UserProfileUpdate = () => {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState(null);
    const defaultProfileImage = '/images/userLogo.png';
    const [values, setValues] = useState({
        admin_firstname: '',
        admin_lastname: '',
        admin_password: '',
        admin_mobile_no: '',
        admin_email: '',
        admin_username: '',
        admin_type: '',
        admin_profile_image: '',
        error: '',
        loading: false,
    });

    const { admin_firstname, admin_lastname, admin_password, admin_profile_image, admin_mobile_no, admin_email, admin_username, admin_type, error, loading } = values;
    const [msg, setMsg] = useState('');

  
    useEffect(() => {
        const user_id = localStorage.getItem('id');
        if (!user_id) {
            Router.push('/login');
        } else {
            loadUserDetails();
        }
    }, [router.query._id]);

    const loadUserDetails = () => {
        admin_details_by_id(router.query._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
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
                        admin_profile_image: adminData.admin_profile_image || defaultProfileImage,
                        admin_mobile_no: adminData.admin_mobile_no,
                        admin_password: adminData.admin_password,
                        loading: false
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setValues({ ...values, error: 'Error: Network request failed', loading: false });
            });
    };

    const onFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const admin_updated_by_id = localStorage.getItem('id');
        var admin_id = router.query._id;
        const formData = new FormData();
        formData.append('admin_id', admin_id);
        formData.append('admin_firstname', admin_firstname);
        formData.append('admin_lastname', admin_lastname);
        formData.append('demoimg', profileImage);
        formData.append('admin_password', admin_password);
        formData.append('admin_mobile_no', admin_mobile_no);
        formData.append('admin_email', admin_email);
        formData.append('admin_username', admin_username);
        formData.append('admin_type', admin_type);
        formData.append('admin_updated_by_id', admin_updated_by_id);


        try {
            const response = await update_admin(formData); 
            if (response.error) {
                setValues({ ...values, error: response.error });
            } else {
                setMsg('Edited Successfully');
                setTimeout(() => {
                    setMsg('');
                    Router.push(`/Admin/viewAdminList`);

                }, 2000);

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
                <title>Edit Admin</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Edit Admin' />
                <link rel="icon" href="/images/title_logo.png" />

            </Head>
            <Header />
            <Topbar />
            <div className="container">
                <form role="form" onSubmit={handleSubmit}>
                    <div className="row gutters">
                        
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <div className="card h-100" style={{ Top: '50%', left: '20%', marginTop: '80px', maxHeight: '430px' }}>
                                <div className="card-body">
                                    
                                <div className="card-header">Edit Admin here</div>
                                
                                <label htmlFor="fileInput">
                                        <div className="user-avatar" style={{ position: 'relative', display: 'inline-block' }}>
                                            
                                            <img src={admin_profile_image} alt="Admin Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} />
                                            <div style={{ position: 'absolute', bottom: '0', left: '0', zIndex: '1' }}>
                                                <span style={{ color: 'black', cursor: 'pointer',width:'100%' }}><FiCamera /></span>
                                            </div>
                                            
                                            <div className='img-update' style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', cursor: 'pointer', zIndex: '2' }}>
                                                <input type="file" onChange={onFileChange} id="fileInput" style={{ display: 'none' }} />
                                            </div>
                                           
                                        </div>

                                        </label>
                                    <div className="row gutters">
                                        
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="firstName" className="small mb-1">First Name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="Enter first name" value={ admin_firstname} onChange={handleChange('admin_firstname')} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="lastName" className="small mb-1">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={ admin_lastname} onChange={handleChange('admin_lastname')} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="email" className="small mb-1">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={ admin_email} onChange={handleChange('admin_email')} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="mobileNumber" className="small mb-1">Mobile Number</label>
                                        <input type="text" className="form-control" id="mobileNumber" placeholder="Enter mobile number" value={ admin_mobile_no} onChange={handleChange('admin_mobile_no')} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="userName" className="small mb-1">Username</label>
                                        <input type="text" className="form-control" id="userName" placeholder="Enter username" value={ admin_username} onChange={handleChange('admin_username')} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="userType" className="small mb-1">User type</label>
                                        <select
                                    
                                    className="form-control"
                                        id="userType"
                                        value={admin_type}
                                         onChange={handleChange('admin_type')}>
                                        <option value="admin">Admin</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="patient">Patient</option>
                                    </select>
                                    </div>
                                </div>
                                
                                    </div>
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="text-right">
                                                <button type="submit" className="btn btn-primary mr-2" style={{  background: "linear-gradient(to top, #7ebce9, #1e7bb5)", borderColor: "#0c9da8", marginTop:"20px" }}>Update</button>
                                                {msg && <div className="alert alert-success margin-top-10">{msg}</div>}
                                                {error && <div className="alert alert-danger margin-top-10">{error}</div>}
                                                {/* {loading && <div className="alert alert-info">Loading...</div>} */}
                                                <button type="button" className="btn btn-secondary" onClick={Cancel} style={{ marginTop:"20px" }}>Cancel</button>
                                            </div>
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

export default UserProfileUpdate;
