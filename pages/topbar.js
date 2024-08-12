import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Badge } from 'react-bootstrap';
import { FiHome, FiBell, FiSettings, FiSearch } from 'react-icons/fi';
import { admin_details_by_id } from '../actions/adminprofileAction';

const Topbar = () => {
  const defaultProfileImage = '/images/userLogo.jpeg';
  const [values, setValues] = useState({
    admin_list: [],
    admin_firstname: '',
    admin_lastname: '',
    admin_profile_image: '',
    admin_password: '',
    admin_mobile_no: '',
    admin_email: '',
    admin_username: '',
    admin_type: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { admin_firstname, admin_profile_image, error, loading, message } = values;
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const notificationCount = 4;
  const dummyNotifications = [
    { id: 1, user: 'John Doe', action: 'liked your post', time: '5 mins ago', image: '/images/caretaker1.jpg' },
    { id: 2, user: 'Moo Doe', action: 'liked your cover image', time: '7 mins ago', image: '/images/caretaker2.jpg' },
    { id: 3, user: 'Lee Doe', action: 'commented on your video', time: '10 mins ago', image: '/images/caretaker3.jpg' },
  ];

  const settingsOptions = [
    { label: 'Account Settings', link: '/account-settings' },
    { label: 'Profile Settings', link: '/profile-settings' },
    { label: 'Notification Settings', link: '/notification-settings' },
    { label: 'Appearance', link: '/Appearences' },
    { label: 'Privacy and Security', link: '/privacy-security-settings' },
    { label: 'Application Settings', link: '/application-settings' },
    { label: 'Help & Support', link: '/help-support' },
    { label: 'About', link: '/about' },
  ];

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

  const loadUserDetails = (user_id) => {
    admin_details_by_id(user_id)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          const adminData = data.admin_list[0];
          setValues({
            ...values,
            admin_firstname: adminData.admin_firstname,
            admin_profile_image: adminData.admin_profile_image || defaultProfileImage,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setValues({ ...values, error: 'Error: Network request failed', loading: false });
      });
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const signupForm = () => {
    return (
      <>
        <div id="wrapper">
          <div className="navbar-custom" style={{ position: 'fixed' }}>
            <ul className="list-unstyled topnav-menu float-right mb-0">
              <li className="dropdown notification-list">
                <Link href="/dashboard">
                  <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light">
                    <span className="ml-1 topbar-nav-link">
                      <FiHome />
                    </span>
                  </a>
                </Link>
              </li>
              <li className="dropdown notification-list">
                <a
                  href="#"
                  className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light"
                  onClick={toggleNotifications}
                >
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-50 translate-middle"
                    style={{ marginTop: '20px', marginLeft: '100px', fontSize: '0.6em' }}
                  >
                    {notificationCount}
                  </Badge>
                  <span className="ml-1 topbar-nav-link">
                    <FiBell />
                  </span>
                </a>
                {showNotifications && (
                  <div className="notification-card">
                    {dummyNotifications.map((notification) => (
                      <div key={notification.id} className="notification-item">
                        <img src={notification.image} alt="Profile" className="notification-image" />
                        <div className="notification-details">
                          <span className="notification-user">{notification.user}</span>
                          <span className="notification-action">{notification.action}</span>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </li>
              <li className="dropdown notification-list">
                <a
                  href="#"
                  className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light"
                  onClick={toggleSettings}
                >
                  <span className="ml-1 topbar-nav-link">
                    <FiSettings />
                  </span>
                </a>
                {showSettings && (
                  <div className="settings-card">
                    {settingsOptions.map((option, index) => (
                      <Link href={option.link} key={index}>
                        <a className="settings-item">{option.label}</a>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              <li className="dropdown notification-list">
                <Link href="/Adminprofileui">
                  <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light">
                    <span className="ml-1 topbar-nav-link">{values.admin_firstname}</span>
                  </a>
                </Link>
              </li>
              <li className="dropdown notification-list">
                <Link href="/Adminprofileui">
                  <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light">
                    <span className="ml-1" style={{ color: 'black' }}>
                      <img
                        src={admin_profile_image}
                        alt="Profile"
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                      />
                    </span>
                  </a>
                </Link>
              </li>
            </ul>

            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button type="submit">
                <FiSearch />
              </button>
            </div>

            <style jsx>{`
              .search-bar {
                display: flex;
                align-items: center;
                padding: 5px;
                background: white;
                border-radius: 50px;
                border: 1px solid #ccc;
                max-width: 300px;
                margin-top: 30px;
                margin-left: 250px;
              }
              .search-bar input {
                border: none;
                outline: none;
                flex-grow: 1;
                padding: 5px 10px;
                border-radius: 50px;
              }
              .search-bar button {
                background: none;
                border: none;
                cursor: pointer;
                padding: 5px;
                margin-left: 5px;
              }
              .search-bar button svg {
                width: 20px;
                height: 20px;
              }
              .notification-card {
                position: absolute;
                top: 60px;
                right: 20px;
                width: 300px;
                max-height: 400px;
                overflow-y: auto;
                background: white;
                border: 1px solid #ccc;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                z-index: 1000;
              }
              .notification-item {
                display: flex;
                align-items: center;
                padding: 10px;
                border-bottom: 1px solid #eee;
              }
              .notification-item:last-child {
                border-bottom: none;
              }
              .notification-image {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
              }
              .notification-details {
                display: flex;
                flex-direction: column;
              }
              .notification-user {
                font-weight: bold;
              }
              .notification-action {
                margin-top: 2px;
                color: #555;
              }
              .notification-time {
                margin-top: 5px;
                font-size: 0.8em;
                color: #888;
              }
              .settings-card {
                position: absolute;
                top: 60px;
                right: 20px;
                width: 250px;
                background: white;
                border: 1px solid #ccc;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                z-index: 1000;
              }
              .settings-item {
                display: block;
                padding: 10px;
                border-bottom: 1px solid #eee;
                color: black;
                text-decoration: none;
              }
              .settings-item:hover {
                background: #f5f5f5;
              }

              @media (max-width: 768px) {
            .search-bar {
              max-width: 200px;
            }

            .notification-card,
            .settings-card {
              width: 100%;
              right: 0;
              border-radius: 0;
            }

            .notification-item {
              flex-direction: column;
              align-items: flex-start;
            }

            .notification-image {
              margin-bottom: 10px;
            }

            .notification-details {
              align-items: flex-start;
            }

            .topbar-nav-link {
              margin: 0 10px;
              font-size: 1em;
            }

            .nav-link {
              padding: 10px 5px;
            }

            .navbar-custom {
              padding: 5px;
            }
          }

          @media (max-width: 480px) {
            .search-bar {
              max-width: 150px;
            }

            .topbar-nav-link {
              margin: 0 5px;
              font-size: 0.9em;
            }

            .nav-link {
              padding: 10px 2px;
            }

            .navbar-custom {
              padding: 5px 2px;
            }
          }
            `}</style>
          </div>
        </div>
      </>
    );
  };

  return <div>{signupForm()}</div>;
};

export default Topbar;
