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
import { FiMenu, FiUser, FiHome, FiUserPlus, FiCalendar, FiImage, FiMap,FiCreditCard, FiLogOut, FiBriefcase, FiFile } from "react-icons/fi";
import { FaHome, FaUser, FaClinicMedical, FaUserPlus, FaBuilding, FaCalendar, FaImage, FaUsers, FaMap, FaSignOutAlt, FaBriefcase, FaGraduationCap, FaUserMd, FaFileInvoice,FaFileMedical } from 'react-icons/fa';
import { BiMap } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import { admin_details_by_id } from "../actions/adminprofileAction";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [values, setValues] = useState({
    admin_list: [],
    admin_profile_image: '',
    admin_username: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { admin_list, admin_profile_image, error, loading, message, showForm } = values;

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

  // const handleDepartment = () => {
  //   Router.push('/ViewDepartment');
  // };

  const handleBanner = () => {
    Router.push('/AdminDemo/addBanner');
  };

  const handleSpecialist = () => {
    Router.push('/SpecialistPage');
  };

  const handleYearOfPassing = () => {
    Router.push('/AdminDemo/addyearOfPassing');
  };

  const handleWorkExperience = () => {
    Router.push('/AdminDemo/addWorkexperience');
  };

  const handleInvoice = () => {
    Router.push('/Invoice');
  };

  const handleMedicalReport = () => {
    Router.push('/MedicalReport');
  };

  const handlePaymentHistory = () => {
    Router.push('/PaymentHistory');
  };

  const handleAppointment = () => {
    Router.push('/Appointments');
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
          setValues({
            ...values,
            admin_profile_image: data.admin_list[0].admin_profile_image,
            admin_username: data.admin_list[0].admin_username,
            admin_list: data.admin_list, loading: false
          });
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
        <ProSidebar>
          <SidebarHeader>
            {/* <div className="logotext">
              <p>{menuCollapse ? "" : ""}</p>
            </div> */}
            {/* <div className="closemenu" onClick={menuIconClick}>
              <FiMenu />
            </div> */}
          </SidebarHeader>
          <SidebarContent>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              <Menu iconShape="round">
                <MenuItem icon={<FiHome />} title="Dashboard" onClick={handleDashboard}>
                  <Link href='/dashboard'><span>Dashboard</span></Link>
                </MenuItem>
                <MenuItem icon={<FiUser />} title="Admin" onClick={handleAdmin}>
                  <Link href='/Admin/viewAdminList'><span>Admin</span></Link>
                </MenuItem>
                <SubMenu title="Doctor" icon={<FiUserPlus />}>
                  <MenuItem title="Registered Doctors" onClick={handleDoctor}>
                    <Link href='/Doctor/ViewDoctorList'><span>Registered Doctors</span></Link>
                  </MenuItem>
                  <MenuItem title="Total Doctors">
                    <Link href='/ApprovedDoctors'><span>Total Doctors</span></Link>
                  </MenuItem>
                </SubMenu>
                <MenuItem icon={<FiUserPlus />} title="Patient" onClick={handlePatient}>
                  <Link href='/Patient/ViewPatientList'><span>Patient</span></Link>
                </MenuItem>
                {/* <MenuItem icon={<FaBuilding />} title="Department" onClick={handleDepartment}>
                  <Link href='/Department'><span>Department</span></Link>
                </MenuItem> */}
                <MenuItem icon={<FaUserMd />} title="Specialist" onClick={handleSpecialist}>
                  <Link href='/SpecialistPage'><span>Specialist</span></Link>
                </MenuItem>
                <SubMenu title="Appointment" icon={<FiCalendar />}>
                  <MenuItem title="Appointment" onClick={handleAppointment}>
                    <Link href='/Appointments'><span>Calender</span></Link>
                  </MenuItem>
                  <MenuItem title="Appointment List">
                    <Link href='/TotalAppointmentList'><span>Appointment List</span></Link>
                  </MenuItem>
                  <MenuItem title="Approved Appointments">
                    <Link href='/ApprovedAppointments'><span>Appointment History</span></Link>
                  </MenuItem>
                </SubMenu>
                <MenuItem icon={<FiImage />} title="Banner" onClick={handleBanner}>
                  <Link href='/AdminDemo/addBanner'><span>Banner</span></Link>
                </MenuItem>
                <MenuItem icon={<FiBriefcase />} title="Work Experience" onClick={handleWorkExperience}>
                  <Link href='/AdminDemo/addWorkexperience'><span>Work Experience</span></Link>
                </MenuItem>
                <MenuItem icon={<FaGraduationCap />} title="Year of Passing" onClick={handleYearOfPassing}>
                  <Link href='/AdminDemo/addyearOfPassing'><span>Year of Passing</span></Link>
                </MenuItem>
                <MenuItem icon={<FiFile />} title="Invoice" onClick={handleInvoice}>
                  <Link href='/Invoice'><span>Invoice</span></Link>
                </MenuItem>
                <MenuItem icon={<FaFileMedical />} title="Medical History" onClick={handleMedicalReport}>
                  <Link href='/MedicalReport'><span>Medical History</span></Link>
                </MenuItem>
                <MenuItem icon={<FiCreditCard />} title="Payment History" onClick={handlePaymentHistory}>
                  <Link href='/PaymentHistory'><span>Payment History</span></Link>
                </MenuItem>
                <SubMenu title="Locations" icon={<FiMap />}>
                  <MenuItem title="Country" icon={<BiMap />}>
                    <Link href='/Location/viewCountry'><span>Country</span></Link>
                  </MenuItem>
                  <MenuItem title="State" icon={<BiMap />}>
                    <Link href='/Location/viewState'><span>State</span></Link>
                  </MenuItem>
                  <MenuItem title="City" icon={<BiMap />}>
                    <Link href='/Location/viewCity'><span>City</span></Link>
                  </MenuItem>
                </SubMenu>
              </Menu>
            </Scrollbars>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FaSignOutAlt />} title="Logout" onClick={handleLogout}>
                <span>Logout</span>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>

      <style jsx>{`
        @media (max-width: 1200px) {
          .pro-sidebar {
            width: 240px;
          }
        }

        @media (max-width: 768px) {
          .pro-sidebar {
            width: 200px;
          }
          .menu-item-title {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .pro-sidebar {
            width: 160px;
          }
          .menu-item-title {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
