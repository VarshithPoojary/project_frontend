import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Topbar from './topbar';
import Header from './Header';
import { update_admin, admin_details_by_id } from '../actions/adminprofileAction';




const AdminPasswordUpdate = () => {

    const router = useRouter();
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
        confirmpassword:'',
        oldpassword:'',
        showPassword:'',
        showConfirmPassword:''
    });

    const { admin_firstname, admin_lastname, admin_password, admin_profile_image, admin_mobile_no, admin_email, admin_username, admin_type, error, loading,confirmpassword ,oldpassword,showPassword,showConfirmPassword} = values;



    useEffect(() => {
        const admin_id=localStorage.getItem('id');
           
          loadPassword(admin_id);  
        
      }, []);

      const loadPassword = (admin_id) => {
        admin_details_by_id(admin_id)
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
                        admin_current_password: adminData.admin_password,
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
        const admin_id = localStorage.getItem('id');

        if (oldpassword !== values.admin_current_password) {
            setValues({ ...values, error: 'Old password is incorrect' });
            return;
        }

        if (admin_password !== confirmpassword) {
            setValues({ ...values, error: 'New password and confirm password do not match' });
            return;
        }

        const formData = new FormData();
        formData.append('admin_id', admin_id);
        formData.append('demoimg', admin_profile_image);
        formData.append('admin_password', admin_password);

        try {
            const response = await update_admin(formData); 
            if (response.error) {
                setValues({ ...values, error: response.error });
            } else {
                setValues({ ...values, loading: true });
                Router.push(`/dashboard`); 
            }
        } catch (error) {
            console.error('Error:', error);
            setValues({ ...values, error: 'Error updating profile', loading: false });
        }
    };
    
    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !showPassword });
    };

    const toggleConfirmPasswordVisibility = () => {
        setValues({ ...values, showConfirmPassword: !showConfirmPassword });
    };

    const Cancel = () => {
       setValues({...values,
        oldpassword:'',
        admin_password:'',
        confirmpassword:''
       })
    };

    return (
        <>
       <Topbar/>
        <Header/>
        <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12">
        <form role="form" onSubmit={handleSubmit}>
            <div className="card" style={{ marginTop: '70px', padding: '20px',marginLeft:'250px',width: '700px', height: '400px',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                <div className="card-body">
                    <h6 className="mb-3 text-primary">Password Details</h6>
                    <div className="form-group row">
                        <label htmlFor="oldpassword" className="col-sm-3 col-form-label">Old Password:</label>
                        <div className="col-sm-9">
                            <input
                                // value={admin_password}
                                type="password"
                                className="form-control"
                                id="oldpassword"
                                value={oldpassword}
                                onChange={handleChange('oldpassword')}
                                placeholder="Enter old password"
                                style={{ width: '300px' }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="newpassword" className="col-sm-3 col-form-label">New Password:</label>
                        <div className="col-sm-9">
                            <input
                               type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                id=" admin_password"
                                value={ admin_password}
                                onChange={handleChange('admin_password')}
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
                    {values.loading && <div className="alert alert-success margin-top-10">Password updated successfully</div>}
                    {values.error && <div className="alert alert-danger margin-top-10">{values.error}</div>}
                        
                    <div className="form-group row" >
                    <div className="col-sm-12 text-left">
                    <Link href="/Forgotpassword">
                                <a>Forgot Password?</a>
                            </Link>
                        </div>
                        </div>
                    <div className="form-group row mt-3">
                    <div className="col-sm-12 text-right">
                        <button type="submit" className="btn btn-primary mr-2" style={{ backgroundColor: "#1fa4b5", borderColor: "#0c9da8" }}>Update</button>
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

export default AdminPasswordUpdate;