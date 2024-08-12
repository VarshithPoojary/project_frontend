import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from './Header';
import Router from 'next/router';
import Topbar from './topbar';
import { caretaker_list_by_specialist } from '../actions/doctorprofileAction';

const Card = ({ id, name, specialty, image }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest('.menu-icon')) {
            setMenuVisible(false);
        }
    };

    const handleViewProfile = () => {
        console.log('View Profile clicked');
    };

    const handleMessage = () => {
        console.log('Message clicked');
    };

    const handleBookAppointment = () => {
        Router.push({
            pathname: '/BookAppointment',
            query: {
                doctorId: id,
                specialistName: router.query.specialist_type_name,
                patientId: router.query.patient_id
            }
        });
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="special-card" style={{
            width: '200px',
            height: '200px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            borderRadius: '15px',
            textAlign: 'center',
            margin: '20px',
            position: 'relative'
        }}>
            <div className="special-card-body">
                <img src={image} alt={name} className="card-img-top" style={{
                    borderRadius: '60%',
                    width: '80px',
                    height: '80px',
                    marginTop: '20px',
                    backgroundColor: '#fff',
                    padding: '10px',
                }} />
                <h5 className="card-title" style={{
                    marginTop: '10px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                }}>{name}</h5>
                <p className="card-text" style={{
                    color: '#777',
                    fontSize: '12px'
                }}>{specialty}</p>
                <div className="menu-icon" onClick={toggleMenu} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '16px',
                    padding: '5px',
                    cursor: 'pointer'
                }}>
                    &#x22EE;
                    <div className="dropdown-menu" style={{
                        position: 'absolute',
                        top: '25px',
                        left: '-30px',
                        zIndex: '1',
                        minWidth: '100px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        padding: '10px',
                        display: menuVisible ? 'block' : 'none'
                    }}>
                        <div className="dropdown-item" onClick={handleViewProfile} style={{
                            padding: '5px 10px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #ddd',
                            fontSize: '12px'
                        }}>View Profile</div>
                        <div className="dropdown-item" onClick={handleMessage} style={{
                            padding: '5px 10px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #ddd',
                            fontSize: '12px'
                        }}>Message</div>
                        <div className="dropdown-item" onClick={handleBookAppointment} style={{
                            padding: '5px 10px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}>Book Appointment</div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};


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
    }, [router.query.specialist_type_name, router.query.patient_id]);

    const loadDoctorsBySpecialist = () => {
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
                <div className='row-md-12 card-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {values.doctorsList.length > 0 ? (
                        values.doctorsList.map((doctor, index) => (
                            <div className="d-flex justify-content-center md-4" key={index}>
                                <Card
                                    id={doctor._id}
                                    name={doctor.caretaker_firstname}
                                    specialty={doctor.caretaker_type}
                                    image={doctor.caretaker_profile_image || defaultProfileImage}
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
