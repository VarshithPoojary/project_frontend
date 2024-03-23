import React from 'react';
import Link from 'next/link'
import { useEffect, useState } from 'react';

import Image from 'next/image';
import $ from 'jquery';
// import { adminProfile } from '../actions/profileAction';
import Router from 'next/router';
// import { getCookie } from '../actions/adminAction';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Topbar = () => {
  const [values, setValues] = useState({
    admin: [],
    name: '',
    dname: '',
    dimage: '',
    image: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });


  //var admin_image = localStorage.getItem("admin_image");
  //var admin_image = getCookie("admin_image");

  const { name, dname, dimage, image, admin, error, loading, message, showForm } = values;

  useEffect(() => {
    $('.button-menu-mobile').on('click', function (event) {
      event.preventDefault();
      $('body').toggleClass('sidebar-enable');
      if ($(window).width() >= 768) {
        console.log("enlarge")

        $('body').toggleClass('enlarged');
        //  $('body').removeClass('enlarged');

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



  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
  const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
  const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

  const [adminName, setAdminName] = useState();

  // useEffect(() => {
  //   loadAdminProfile()
  // }, [admin_image]);

  // var admin_image=cookies.get("admin_image");

  // const loadAdminProfile = () => {
  //   adminProfile().then(data => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setAdminName(data.name);
  //       //setAdminImage(data.);
  //     }
  //   });
  // };

  // const logout = () => {
  //   localStorage.removeItem('id');
  //   Router.push(`/login`);
  // }

  const signupForm = () => {
    return (

      <div id="wrapper">
        <div className="navbar-custom" >
          <ul className="list-unstyled topnav-menu float-right mb-0">
            
            {/* <li className="dropdown notification-list">
            <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1" style={{color:"black"}} ><i class="fa fa-envelope"></i></span>
              </a>
            </li>
            <li className="dropdown notification-list">
            <a href="#" className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1" style={{color:"black"}} ><i class="fe-bell"></i></span>
              </a>
            </li>
            <li className="dropdown notification-list">
            <a href='#' className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1" style={{color:"black"}} ><i class="fe-settings"></i></span>
              </a>
            </li> */}
            <li className="dropdown notification-list">
              <a href='/admin-profile' className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1" style={{color:"black"}} >
                  {/* {admin_image?<img src={"http://103.233.2.138/public/images/admin/"+admin_image} alt="Image not found" height="100px" width="100px" style={{borderRadius:"50%"}}></img>:null} */}
                  </span>
              </a>
              {/* <ul>
                <li className='notify-item'>profile</li>
              </ul> */}
            </li>
            {/* <li className="dropdown notification-list">
              <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1" onClick={logout} style={{color:"black"}} >Logout  <i className="fe-log-out"></i></span>
              </a>
            </li> */}
          </ul>

          {/* <div className="logo-box" style={{ backgroundColor: '#1891e0' }} >
            <a href="#" className="logo1 text-center">
              <span className="logo-lg" style={{marginLeft:'30px'}}>
                <Image src="/icons/app_logo.jpeg" width="181" height="50" alt=""/>
                <!-- <span className="logo-lg-text-light">UBold</span> --> 
                <img src="/images/logo.png" alt="" style={{marginTop:'15px'}} height="48"/>
                <h1><label style={{color:"white",fontSize:"25px"}}>Admin</label></h1>
              </span>
              <span className="logo-sm">
                <!-- <span className="logo-sm-text-dark">U</span> -->
                <img src="images/logo.png" alt="" height="28"/>
                <Image src="/icons/app_logo.jpeg" width="28" height="28" alt="" />                            <!-- <span className="logo-lg-text-light">UBold</span> -->
              </span>
            </a>
          </div> */}

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button className="button-menu-mobile waves-effect waves-light">
                <i className="fe-menu"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  return <React.Fragment>
    {signupForm()}
  </React.Fragment>
};





export default Topbar;

