import React, { useEffect, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import Link from 'next/link';
import Router from 'next/router';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu, 
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FiHome, FiLogOut, FiMenu, FiUser, FiMapPin, FiSettings, FiUsers } from "react-icons/fi";
import { FaRegImage, FaBriefcase, FaGraduationCap, FaUserMd } from 'react-icons/fa';
import { BiCog, BiUser, BiBook, BiCalendar, BiMap, BiListCheck, BiClinic, BiUserPlus, BiBriefcase, BiCalendarPlus } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import { admin_details_by_id } from "../actions/adminprofileAction";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [values, setValues] = useState({
    admin_list:[],
    admin_profile_image: '',
    admin_username:'',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const {admin_list, admin_profile_image, error, loading, message, showForm } = values;

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (!user_id) { 
        Router.push('/login');
      } else {
        loadUserDetails(user_id);
      }
    }
  }, []);

  const handleDashboard = () => {
    Router.push('/dashboard');
  };

  const handleAdmin = () => {
    Router.push('/Admin/viewAdminList');
  };

  const handleDoctor = () => {
    Router.push('/Doctor/ViewDoctorList');
  };


  const handlePatient = () => {
    Router.push('/Patient/ViewPatientList');
  };

  const handleBanner = () => {
    Router.push('/AdminDemo/addBanner');
  };

  const handleSpecialist = () => {
    Router.push('/AdminDemo/addspecialistTypes');
  };

  const handleYearOfPassing = () => {
    Router.push('/AdminDemo/addyearOfPassing');
  };
  const handleWorkExperience = () => {
    Router.push('/AdminDemo/addWorkexperience');
  };


  const handleLogout = () => {
    localStorage.removeItem('id');
    Router.push('/login');
  };


  const loadUserDetails = (user_id) => {
    admin_details_by_id(user_id)
      .then(data => {
        if (data.error) {
          console.log(data.error);
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({ ...values, 
            admin_profile_image: data.admin_list[0].admin_profile_image, 
            admin_username: data.admin_list[0].admin_username,
            admin_list: data.admin_list, loading: false });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setValues({ ...values, error: 'Error: Network request failed', loading: false });
      });
  };

  return (
    <>
    
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? "" : ""}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              <FiMenu />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              <Menu iconShape="square">
                <MenuItem icon={<FiHome />} title="Dashboard" onClick={handleDashboard}>
                  <Link href='/dashboard'><span>Dashboard</span></Link>
                </MenuItem>
                <MenuItem icon={<BiUser />} title="Admin" onClick={handleAdmin}>
                <Link href='/Admin/viewAdminList'><span>Admin</span></Link>
                </MenuItem>
                <MenuItem icon={<BiClinic />} title="Doctor" onClick={handleDoctor}>
                <Link href='/Doctor/ViewDoctorList'><span>Doctor</span></Link>
                </MenuItem>

                <MenuItem icon={<BiUserPlus />} title="Patient" onClick={handlePatient}>
                <Link href='/Patient/ViewPatientList'><span>Patient</span></Link>
                </MenuItem>
                <MenuItem icon={<FaUserMd />} title="Department">Specialist</MenuItem>
                <MenuItem icon={<BiCalendarPlus />} title="Appointment">Appointment</MenuItem>
                <MenuItem icon={<FaRegImage />} title="Banner" onClick={handleBanner}>
                <Link href='/AdminDemo/addBanner'><span>Banner</span></Link>
                </MenuItem>
                <MenuItem icon={<FaBriefcase  />} title="Work Experience" onClick={handleWorkExperience}>
                <Link href='/AdminDemo/addWorkexperience'><span>Work Experience</span></Link>
                </MenuItem>
                <MenuItem icon={<FaGraduationCap  />} title="Year of Passing" onClick={handleYearOfPassing}>
                <Link href='/AdminDemo/addyearOfPassing'><span>Year of Passing</span></Link>
                </MenuItem>
                <MenuItem icon={<FiUsers  />} title="Specialist Type" onClick={handleSpecialist}>
                <Link href='/AdminDemo/addspecialistTypes'><span>Specialist Type</span></Link>
                </MenuItem>
                <SubMenu title="Locations" icon={<FiMapPin />}  >
                  <MenuItem title="Country" icon={<BiMap />} >
                  <Link href='/Location/viewCountry'><span >Country</span></Link></MenuItem>
                  <MenuItem title="State" icon={<BiMap />} >
                  <Link href='/Location/viewState'><span>State</span></Link></MenuItem>
                  <MenuItem title="City" icon={<BiMap />} >
                  <Link href='/Location/viewCity'><span>City</span></Link></MenuItem>
                </SubMenu>
              </Menu>
            </Scrollbars>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} title="Logout" onClick={handleLogout}> 
                <span>Logout</span>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
