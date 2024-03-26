import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import $ from 'jquery';
import Router from 'next/router';
import { FiHome, FiBell, FiSettings, FiUser } from 'react-icons/fi'; 
import { admin_details_by_id } from '../actions/registrationAction';


const Topbar = () => {
  const [values, setValues] = useState({
    admin_list:[],
    name: '',
    dname: '',
    admin_profile_image: '',
    image: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { name, dname, dimage, image, admin, error, loading, message, showForm } = values;


  useEffect(() => {
    var user_id= localStorage.getItem('id');
    if(user_id==""||user_id==null||user_id==undefined)
    {
      Router.push('/login');
    }
    else{
      loadUserDetails();
    }

    $('.button-menu-mobile').on('click', function (event) {
      event.preventDefault();
      $('body').toggleClass('sidebar-enable');
      if ($(window).width() >= 768) {
        console.log("enlarge")
        $('body').toggleClass('enlarged');

      } else {
        $('body').removeClass('enlarged');
      }
    });
    // Topbar - main menu
    $('.navbar-toggle').on('click', function (event) {
      console.log("mobile")
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
    });

  }, []);

  const loadUserDetails = () => {
    var user_id= localStorage.getItem('id');
    admin_details_by_id(user_id).then(data => {
          //alert(JSON.stringify(data));
        if (data.error) {
            console.log(data.error);
        } else {
            alert(JSON.stringify(data));
             console.log(data);
            setValues({ ...values, admin_list: data.admin_list });
            alert(JSON.stringify(admin_list._id));
        }
    })
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
        <div className="navbar-custom">
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li className="dropdown notification-list">
              <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1" style={{ color: "black" }}><FiHome /> Dashboard</span>
              </a>
            </li>
            <li className="dropdown notification-list">
              <a href="#" className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1" style={{ color: "black" }}><FiBell /> Notification</span>
              </a>
            </li>
            <li className="dropdown notification-list">
              <a href='#' className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1" style={{ color: "black" }}><FiSettings /> Settings</span>
              </a>
            </li>
            <li className="dropdown notification-list">
              <a href='#' className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1" style={{ color: "black" }}><FiUser /> Profile</span>
              </a>
            </li>
            <li className="dropdown notification-list">
              <a href='/admin-profile' className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" role="button" aria-haspopup="false" >
                <span className="ml-1" style={{ color: "black" }}>
                  <img src="/images/login_page.jpg" alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                </span>
              </a>
            </li>
          </ul>

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button className="button-menu-mobile waves-effect waves-light" >
                <i className="fe-menu"></i>
              </button>
            </li>
          </ul>
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
