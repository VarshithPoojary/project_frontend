import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Swal from 'sweetalert2';
import { FaCalendarPlus, FaEye, FaTrash, FaEdit, FaUserPlus } from 'react-icons/fa';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { patient_list, DeletePatientDetails } from '../../actions/patientprofileAction';

const PatientView = () => {
    const [patientDetail, setPatientDetail] = useState([]);
    const [values, setValues] = useState({
        patient_profile_image: '',
        patientdetail: []
    });

    const defaultProfileImage = '/images/userLogo.png';
    const [msg, setMsg] = useState('');
    const { patient_profile_image } = values;

    useEffect(() => {
        loadPatientDetails();
    }, []);

    const loadPatientDetails = () => {
        patient_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
               
                setValues({
                    ...values,
                    patient_profile_image: data.patient_list.patient_profile_image || defaultProfileImage,
                    patientdetail: data.patient_list
                });
            }
        });
    };

    const handleView = (row) => {
        Router.push({
            pathname: '/Patient/ViewPatientProfile',
            query: {
                patientId: row._id,
             
                // patientProfile: JSON.stringify(row),
            }
        });
    };

    const handleEdit = (row) => {
        Swal.fire({
            title: 'Choose Edit Option',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#AB47BC',
            cancelButtonColor: '#AB47BC',
            confirmButtonText: 'Profile Edit',
            cancelButtonText: 'Password Edit',
            showCloseButton: true,
            focusCancel: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Router.push({
                    pathname: '/Patient/EditPatient',
                    query: {
                        patientId: row._id,
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Router.push({
                    pathname: '/Patient/EditPatientPasswordPage',
                    query: {
                        patientId: row._id,
                    }
                });
            }
        });
    };

    const handleDelete = (row) => {
        const patient_deleted_by_id = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this patient!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let query = { "_id": row._id, "patient_deleted_by_id": patient_deleted_by_id };
                DeletePatientDetails(query).then(data => {
                    loadPatientDetails();
                    setMsg(`Patient "${row.patient_first_name}" deleted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 2000);
                });
            }
        });
    };

    const handleBookAppointment = (row) => {
        Router.push({
            pathname: '/SpecialistPage',
            query: {
                patientId: row._id,
            }
        });
    };

    function displayImage(cell, row) {
        return (
            <img
                src={row.patient_profile_image ? row.patient_profile_image : defaultProfileImage}
                alt="Profile Image"
                height="50px"
                width="50px"
                style={{ borderRadius: "20%" }}
            />
        );
    }

    const actionFormatter = (cell, row) => {
        const buttonStyle = {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '10px',
            transition: 'background-color 0.3s'
        };

        const viewStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(90, 155, 212, 0.2)', 
            color: '#5A9BD4'
        };

        const editStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(160, 212, 104, 0.2)', 
            color: '#A0D468'
        };

        const calendarStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(255, 206, 84, 0.2)', 
            color: '#FFCE54'
        };

        const deleteStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(229, 115, 115, 0.2)', // light red
            color: '#E57373'
        };

        return (
            <div>
                <button style={viewStyle} onClick={() => handleView(row)}>
                    <FaEye />
                </button>
                <button style={editStyle} onClick={() => handleEdit(row)}>
                    <FaEdit />
                </button>
                <button style={calendarStyle} onClick={() => handleBookAppointment(row)}>
                    <FaCalendarPlus />
                </button>
                <button style={deleteStyle} onClick={() => handleDelete(row)}>
                    <FaTrash />
                </button>
            </div>
        );
    };

    return (
        <Fragment>
            <Head>
                <title>Patient List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Topbar />
            <div className="container-viewLocation" >
                <div className="center-table">
                    <center><h2><b>PATIENT LIST</b></h2></center>
                    <Link href="/Patient/AddPatient">
                        <a className="btn-add-patient">
                            <FaUserPlus style={{ marginRight: '8px' }} />
                            Add patient
                        </a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <div className="custom-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Unique Number</th>
                                    <th>Profile</th>
                                    <th>First Name</th>
                                    <th>Mobile No</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{values.patientdetail.length === 0 ? (
                <p>No Patients</p>
            ) : (
                                values.patientdetail.map((patient, index) => (
                                    <tr key={patient._id}>
                                        <td>{index + 1}</td>
                                        <td>{patient.patient_unique_number}</td>
                                        <td>{displayImage(null, patient)}</td>
                                        <td>{patient.patient_first_name}</td>
                                        <td>{patient.patient_phone_number}</td>
                                        <td>{patient.patient_email}</td>
                                        <td><span className="status-badge">{patient.patient_register_status}</span></td>
                                        <td>{actionFormatter(null, patient)}</td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container-viewLocation {
                    padding: 20px;
                    margin-left: -50px;
                     margin-top: 10px;
                }
                .center-table {
                    margin: auto;
                  
                    width: 90%; /* Adjusted width */
                }
                .custom-table {
                    width: 130%; /* Adjusted width */
                    border-collapse: collapse;
                    margin: 50px 10;
                    font-size: 1em;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }
                .custom-table th,
                .custom-table td {
                    padding: 15px 15px;
                    text-align: left;
                }
                .custom-table thead tr {
                    background-color: #B4A3E1;
                    color: #ffffff;
                    text-align: left;
                }
                .custom-table tbody tr {
                    border-bottom: 1px solid #dddddd;
                }
                .custom-table tbody tr:nth-of-type(even) {
                    background-color: #f3f3f3;
                }
                .custom-table tbody tr:last-of-type {
                    border-bottom: 2px solid #009879;
                }
                .alert {
                    margin-top: 20px;
                }
                .btn-add-patient {
                    display: inline-flex;
                  
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    border: 1px solid #9575CD;
                    color: #6F42C1;
                    padding: 0.375rem 0.75rem;
                    font-size: 15px;
                    border-radius: 10%;
                    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                    text-decoration: none;
                }
                .btn-add-patient:hover {
                    background-color: #9575CD;
                    border-color: #6F42C1;
                    color: white;
                }
            .status-badge {
            display: inline-block;
            padding: 5px 10px;
            font-size: 12px;
            color: #6C757D;
            background-color: #CDEDD6; 
            border-radius: 4px;
        }
            @media (max-width: 1200px) {
        .custom-table {
            width: 100%;
        }
    }

    @media (max-width: 992px) {
        .custom-table th,
        .custom-table td {
            padding: 10px;
        }
        .btn-add-patient {
            font-size: 14px;
            padding: 0.3rem 0.6rem;
        }
    }

    @media (max-width: 768px) {
        .container-viewLocation {
            margin-left: 0;
        }
        .btn-add-patient {
            font-size: 13px;
            padding: 0.25rem 0.5rem;
        }
    }

    @media (max-width: 576px) {
        .custom-table {
            width: 100%;
            font-size: 0.9em;
        }
        .btn-add-patient {
            font-size: 12px;
            padding: 0.2rem 0.4rem;
        }
    }

    @media (max-width: 480px) {
        .custom-table {
            font-size: 0.8em;
        }
        .btn-add-patient {
            font-size: 11px;
            padding: 0.15rem 0.3rem;
        }
    }
            `}</style>
        </Fragment>
    );
};

export default PatientView;
