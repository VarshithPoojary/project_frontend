import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from './Header';
import Router from 'next/router';
import Topbar from './topbar';
import { caretaker_list_by_specialist } from '../actions/doctorprofileAction';

const Card = ({ name, specialty, image }) => {
    const [menuVisible, setMenuVisible] = useState(false);
   

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest('.menu-icon')) {
            setMenuVisible(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="special-card" style={{
            width: '200px',
            height:'200px', 
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '15px',
            textAlign: 'center',
            margin: '20px',
            position: 'relative' 
        }}>
            <div className="special-card-body">
                <img src={image} alt={name} className="card-img-top" style={{
                    borderRadius: '60%',
                    width: '80px', 
                    height: '80px', // Smaller image
                    marginTop: '20px',
                    backgroundColor: '#fff',
                    padding: '10px',
                }} />
                <h5 className="card-title" style={{
                    marginTop: '10px', // Smaller margin
                    fontSize: '14px', // Smaller font size
                    fontWeight: 'bold'
                }}>{name}</h5>
                <p className="card-text" style={{
                    color: '#777',
                    fontSize: '12px' // Smaller font size
                }}>{specialty}</p>
                <div className="menu-icon" onClick={toggleMenu} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '16px', // Smaller icon size
                    padding: '5px',
                    cursor: 'pointer'
                }}>
                    &#x22EE; {/* Three dots icon */}
                    <div className="dropdown-menu" style={{
                        position: 'absolute',
                        top: '25px', // Adjusted position for smaller card
                        left: '-30px',
                        zIndex: '1',
                        minWidth: '100px', // Smaller width
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        padding: '10px',
                        display: menuVisible ? 'block' : 'none' // Toggle display
                    }}>
                        <div className="dropdown-item" style={{
                            padding: '5px 10px', // Smaller padding
                            cursor: 'pointer',
                            borderBottom: '1px solid #ddd',
                            fontSize: '12px' // Smaller font size
                        }}>View Profile</div>
                        <div className="dropdown-item" style={{
                            padding: '5px 10px', // Smaller padding
                            cursor: 'pointer',
                            fontSize: '12px' // Smaller font size
                        }}>Message</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Page
const CardiologyDetails = () => {

    const [values, setValues] = useState({
        doctorsList: [],
        loading: true,
        error: '',
      });
    const defaultProfileImage = '/images/doctorMenLogo.png';

    const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        Router.push('/Patientlogin');
      } else {
        loadDoctorsBySpecialist();
      }
    }
  }, [router.query.specialist_type_name]);

  const loadDoctorsBySpecialist = () => {
    const caretaker_Title=router.query.specialist_type_name;
    caretaker_list_by_specialist(router.query.specialist_type_name)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setValues({
            ...values,
            doctorsList: response.caretaker_list,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  };

    return (
        <>
            <Head>
                <title>Cardiology</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="container mt-5">
                <center><h2 style={{ marginTop: '100px' }}><b>{router.query.specialist_type_name}</b></h2></center>
               <div className='row-md-12' style={{display:'flex'}}>
                {values.doctorsList.length > 0 ? (
                values.doctorsList.map((doctor, index) => ( 
                <div className="d-flex justify-content-center md-4">
                
                    <Card
                        name={doctor.caretaker_firstname}
                        specialty={doctor.caretaker_type}
                        image={doctor.caretaker_profile_image || defaultProfileImage} // Replace with your image path
                    />
                    </div>
                ))
            ) : (
              <p style={{ width: '100%', textAlign: 'center' }}>No doctors found.</p>
            )}
                </div>
            </div>
        </>
    );
};

export default CardiologyDetails;
