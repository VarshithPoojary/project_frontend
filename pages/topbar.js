import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import $ from 'jquery';
import Router from 'next/router';
import {  Badge } from 'react-bootstrap';
import { FiHome, FiBell, FiSettings, FiUser } from 'react-icons/fi'; 
import { FaHome,FaBell,FaCog,FaUser,  FaCommentAlt } from 'react-icons/fa';
import { admin_details_by_id } from '../actions/adminprofileAction';

const Topbar = () => {
  const defaultProfileImage = '/images/userLogo.jpeg';
  const [values, setValues] = useState({
    admin_list:[],
     admin_firstname: '',
    admin_lastname: '',
    admin_profile_image: '',
    admin_password: '',
    admin_mobile_no: '',
    admin_email:'',
    admin_username: '',
    admin_type: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const {admin_list,admin_firstname,admin_profile_image, error, loading, message, showForm } = values;

  const notificationCount = 4; 
  const messageCount = 2;

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const user_id = localStorage.getItem('id');
        if (user_id === "" || user_id === null || user_id === undefined) {
          Router.push('/login');
        } else {
          loadUserDetails(user_id);
        }
      
   

    // $('.button-menu-mobile').on('click', function (event) {
    //   event.preventDefault();
    //   $('body').toggleClass('sidebar-enable');
    //   if ($(window).width() >= 768) {
    //     console.log("enlarge")
    //     $('body').toggleClass('enlarged');

    //   } else {
    //     $('body').removeClass('enlarged');
    //   }
    // });
    // // Topbar - main menu
    // $('.navbar-toggle').on('click', function (event) {
    //   console.log("mobile")
    //   $(this).toggleClass('open');
    //   $('#navigation').slideToggle(400);
    // });
      }

  }, []);
  
const loadUserDetails = (user_id) => {
  admin_details_by_id(user_id).then(data => {
    if (data.error) {
      console.log(data.error);
      setValues({ ...values, error: data.error, loading: false });
    } else {
      const adminData = data.admin_list[0];
      setValues({ ...values,
        admin_firstname:adminData.admin_firstname,
        admin_profile_image: adminData.admin_profile_image || defaultProfileImage,     
         loading: false });
    }
  }).catch(error => {
    console.error('Error:', error);
    setValues({ ...values, error: 'Error: Network request failed', loading: false });
  });
}


  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
  const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
  const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

  const signupForm = () => {
    return (
      <div id="wrapper">
        <div className="navbar-custom" style={{ position: 'fixed' }}>
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li className="dropdown notification-list">
            <Link href="/dashboard">
              <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"  role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1 topbar-nav-link" ><FaHome /> Dashboard</span>
              </a>
              </Link>
            </li>
            <li className="dropdown notification-list">
              
              <a href="#" className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
              <Badge pill bg="danger" className="position-absolute top-0 start-50 translate-middle"  style={{marginTop:'20px',marginLeft:'100px', fontSize: '0.6em' }}>
                {notificationCount}
              </Badge>
                <span className="ml-1 topbar-nav-link" ><FaBell /> Notification</span>
              </a>
            </li>

            <li className="dropdown notification-list">
              
              <a href="#" className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
              <Badge pill bg="danger" className="position-absolute top-0 start-50 translate-middle"  style={{marginTop:'20px',marginLeft:'80px', fontSize: '0.6em' }}>
                {messageCount}
              </Badge>
                <span className="ml-1 topbar-nav-link" ><FaCommentAlt /> Message</span>
              </a>
            </li>

            
            <li className="dropdown notification-list">
              <a href='#' className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1 topbar-nav-link" ><FaCog /> Settings</span>
              </a>
            </li>
            <li className="dropdown notification-list">
            <Link href="/Adminprofileui">
              <a  className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1 topbar-nav-link" ><FaUser /> Profile</span>
              </a>
              </Link>
            </li>
            <li className="dropdown notification-list">
              <Link href='/Adminprofileui'>
              <a  className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" role="button" aria-haspopup="false" >
                <span className="ml-1" style={{ color: "black" }}>
                  
                  <img src={admin_profile_image} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  
                </span>
              </a>
              </Link>
              
           
            </li>
          </ul>

          {/* <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button className="button-menu-mobile waves-effect waves-light" >
                <i className="fe-menu"></i>
              </button>
            </li>
          </ul> */}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {signupForm()}
    </React.Fragment>
  );
};

export default Topbar;
