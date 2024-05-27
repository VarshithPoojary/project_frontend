import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'; // Import Link from Next.js
import Router from 'next/router';
import Header from './Header';
import Topbar from './topbar';
import Swal from 'sweetalert2';
import { specialisttype_list,DeleteSpecialistDetails } from '../actions/SpeciaListTypeAction';

const Specialties = () => {
    const [msg, setMsg] = useState('')
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
    }, []);

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

    const handleView = (specialistTypeName) => {
        
        Router.push({
            pathname: '/ViewSpecialistPage',
            query: {
                specialist_type_name: specialistTypeName,
            }
        });
 
};
    

    const handleDelete = (specialistTypeId) => {
        const admin_deleted_by_id = localStorage.getItem('id');

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
                let query = { "_id": specialistTypeId, "admin_deleted_by_id": admin_deleted_by_id };
                DeleteSpecialistDetails(query).then(data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                    loadSpecialistType();
                    setMsg(`Specialist type deleted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 2000); 
                }
                });
            }
        });
    }

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
                    <a className="btn btn-success mb-3" style={{ background: "#3085d6", borderColor: "#0c9da8", width: '15%' }}>Add Specialist</a>
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
                                               
                                                    <a className="dropdown-item" onClick={() => handleView(specialist.specialist_type_name)} style={{
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
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    cursor: pointer;
                    transition: transform 0.2s;
                    display: flex;
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
                    border-radius: 50%;
                    margin-bottom: 10px;
                }
                .dropdown-menu {
                    background: #fff;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 20px;
                }
                .dropdown-item {
                    padding: 8px 16px;
                    cursor: pointer;
                }
                .dropdown-item:hover {
                    background-color: #f0f0f0;
                }
            `}</style>
        </>
    );
};

export default Specialties;
