import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link'; 
import Router from 'next/router';
import Header from './Header';
import Topbar from './topbar';
import {  FaUserMd } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { specialisttype_list,DeleteSpecialistDetails } from '../actions/SpeciaListTypeAction';

const Specialties = () => {
    const [msg, setMsg] = useState('');
    const router = useRouter();
    const [values, setValues] = useState({ 
        specialistList: []
    });
    const [menuVisible, setMenuVisible] = useState(null);

    useEffect(() => {
        const user_id = localStorage.getItem('id');
        if (!user_id) {
            Router.push('/login');
        } else {
            loadSpecialistType();
           

        }
    },  [router.query.patientId]);

    const loadSpecialistType = () => {
        specialisttype_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, specialistList: data.admin_specialist_type_list });
            }
        });
    };

    const handleEdit = (specialistTypeId) => {
        Router.push({
            pathname: '/AdminDemo/editspecialistTypes',
            query: {
                _id: specialistTypeId,
            }
        });
    };

    const handleView = (specialistTypeName, patientid) => {
        Router.push({
            pathname: '/ViewSpecialistPage',
            query: {
                specialist_type_name: specialistTypeName,
                patient_id: patientid
            }
        });
    };

    const handleDelete = (specialistTypeId) => {
        const admin_deleted_by_id = localStorage.getItem('id');

        const confirmDelete = (proceed = false) => {
            let query = { "_id": specialistTypeId, "admin_deleted_by_id": admin_deleted_by_id, "proceed": proceed };
            DeleteSpecialistDetails(query).then(data => {
                if (data.error) {
                    console.log(data.error);
                    setMsg(data.error);
                } else if (data.warning) {
                    Swal.fire({
                        title: '<strong>Doctors are present under this specialist</strong>',
                        html: '<p style="font-size: 16px;">Do you still want to proceed with deletion?</p>',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'Cancel',
                        customClass: {
                            title: 'custom-title-class',
                            popup: 'custom-popup-class',
                            confirmButton: 'custom-confirm-button-class',
                            cancelButton: 'custom-cancel-button-class'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            confirmDelete(true);
                        }
                    });
                } else {
                    loadSpecialistType();
                    setMsg(`Specialist type deleted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 2000);
                }
            });
        };

        Swal.fire({
            title: '<strong>Are you absolutely sure?</strong>',
            html: '<p style="font-size: 16px;">This action <b>cannot</b> be undone. Do you still want to proceed?</p>',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            customClass: {
                title: 'custom-title-class',
                popup: 'custom-popup-class',
                confirmButton: 'custom-confirm-button-class',
                cancelButton: 'custom-cancel-button-class'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                confirmDelete();
            }
        });
    };

    const toggleMenu = (index) => {
        setMenuVisible(menuVisible === index ? null : index);
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest('.menu-icon')) {
            setMenuVisible(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (
        <>
            <Head>
                <title>Top Specialties</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />

            <div className="container">
                <center><h2 style={{ marginTop: '100px' }}><b>SPECIALIST</b></h2></center>
                <Link href="/AdminDemo/addspecialistTypes">
                    <a className="btn-add-specialist">
                        <FaUserMd style={{ marginRight: '8px' }} />
                        Add Specialist
                    </a>
                </Link>
                <div className="specialist-grid">
                    {values.specialistList.length > 0 ? (
                        values.specialistList.map((specialist, index) => (
                            <div key={index} className="specialist-card">
                                <div className="specialist-card-content" >
                                    <div className="specialist-card-body">
                                        <img src={specialist.admin_icon} alt="Profile" className="specialist-card-image" />
                                        <h5 className="specialist-card-title">{specialist.specialist_type_name}</h5>
                                        <div className="menu-icon" onClick={() => toggleMenu(index)} style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            fontSize: '18px',
                                            cursor: 'pointer'
                                        }}>
                                            &#x22EE;
                                            <div className="dropdown-menu" style={{
                                                position: 'absolute',
                                                top: '25px',
                                                left:'-100px',
                                                zIndex: '1',
                                                minWidth: '100px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                borderRadius: '8px',
                                                backgroundColor: '#fff',
                                                padding: '10px',
                                                display: menuVisible === index ? 'block' : 'none'
                                            }}>
                                                <a className="dropdown-item" onClick={() => handleView(`${specialist.specialist_type_name}`, `${router.query.patientId}`)} style={{
                                                    padding: '5px 10px',
                                                    cursor: 'pointer',
                                                    borderBottom: '1px solid #ddd',
                                                    fontSize: '12px'
                                                }}>View Doctors</a>
                                                <a className="dropdown-item" onClick={() => handleEdit(specialist._id)} style={{
                                                    padding: '5px 10px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px'
                                                }}>Edit</a>
                                                <a className="dropdown-item" onClick={() => handleDelete(specialist._id)} style={{
                                                    padding: '5px 10px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px'
                                                }}>Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ width: '100%', textAlign: 'center' }}>No specialist found.</p>
                    )}
                </div>
            </div>

            <style jsx>{`
                .specialist-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    justify-content: center;
                    margin-top: 20px;
                    zIndex:-10;
                    
                   
                }
                .specialist-card {
                    width: calc(25% - 20px);
                    display: flex;
                    justify-content: center;
                   
                }
                .specialist-card-content {
                    background-color: #FFFFFF;
                    padding: 20px;
                    width: 100%;
                    height: 200px;
                    border-radius: 10%;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    cursor: pointer;
                    transition: transform 0.2s;
                    display: flex;
                    margin-left:30px;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    
                }
                .specialist-card-content:hover {
                    transform: scale(1.05);
                }
                .specialist-card-title {
                    margin-bottom: 10px;
                    font-size: 18px;
                    color: #000;
                }
                .specialist-card-image {
                    width: 50px;
                    height: 50px;
                    border-radius: 5%;
                    margin-bottom: 10px;
                    object-fit: fill;
                }
                .dropdown-menu {
                    background: #fff;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 20px;
                    z-index: 10;

                }
                .dropdown-item {
                    padding: 8px 16px;
                    cursor: pointer;
                }
                .dropdown-item:hover {
                    background-color: #f0f0f0;
                }
                .btn-add-specialist {
                    display: inline-flex;
                    align-items: center;
                    padding: 10px 20px;
                    font-size: 15px;
                    background-color: white;
                    border: 1px solid #9575CD;
                    color: #6F42C1;
                    border-radius: 10%;
                    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                    text-decoration: none;
                    cursor: pointer;
                    margin-left:50px
                }
                .btn-add-specialist:hover {
                    background-color: #9575CD;
                    border-color: #6F42C1;
                    color: #fff;
                }
                    @media (max-width: 1200px) {
        .specialist-card {
            width: calc(33.33% - 20px);
        }
    }

    @media (max-width: 992px) {
        .specialist-card {
            width: calc(50% - 20px);
        }
    }

    @media (max-width: 768px) {
        .specialist-card {
            width: calc(100% - 20px);
        }
        .btn-add-specialist {
            margin-left: 0;
            margin-bottom: 20px;
        }
    }

    @media (max-width: 576px) {
        .specialist-card-content {
            height: auto;
            padding: 10px;
        }
        .specialist-card-title {
            font-size: 16px;
        }
        .specialist-card-image {
            width: 40px;
            height: 40px;
        }
    }
            `}</style>
        </>
    );
};

export default Specialties;
