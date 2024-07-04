import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { doctor_list, DeleteDoctorDetails, updateDoctorAproveStatus, reject_caretaker1 } from '../../actions/doctorprofileAction';

const CaretakerView = () => {
    const [caretakerDetail, setCaretakerDetail] = useState([]);
    const [values, setValues] = useState({
        caretaker_profile_image: '',
        caretakerdetail: []
    });

    const defaultProfileImage = '/images/userLogo.png';
    const [msg, setMsg] = useState('');
    const { caretaker_profile_image, caretakerdetail } = values;

    useEffect(() => {
        loadCaretakerDetails();
    }, []);

    const loadCaretakerDetails = () => {
        doctor_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                const loggedInDoctorId = localStorage.getItem('id');
                const filteredCaretaker = data.caretaker_list.filter(doctor => doctor._id !== loggedInDoctorId);
                setValues({
                    ...values,
                    caretaker_profile_image: data.caretaker_list[0]?.caretaker_profile_image || defaultProfileImage,
                    caretakerdetail: filteredCaretaker
                });
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
                    pathname: '/Doctor/EditDoctor',
                    query: { _id: row._id }
                });
            } else {
                Router.push({
                    pathname: '/Doctor/ViewDoctorList',
                    query: { _id: row._id }
                });
            }
        });
    };

    const handleDelete = (row) => {
        const caretaker_deleted_by_id = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this doctor!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let query = { "_id": row._id, "caretaker_deleted_by_id": caretaker_deleted_by_id };
                DeleteDoctorDetails(query).then(data => {
                    loadCaretakerDetails();
                    setMsg(`Doctor "${row.caretaker_firstname}" deleted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 2000);
                });
            }
        });
    };

    const handleApprove = (row) => {
        const doctorId = row._id;
        const approve_data = {
            _id: doctorId,
            caretaker_approvedStatus: true,
        };
        updateDoctorAproveStatus(approve_data)
            .then(() => {
                loadCaretakerDetails();
                setMsg(`Doctor "${row.caretaker_firstname}" approved successfully.`);
                setTimeout(() => {
                    setMsg('');
                }, 2000);
            })
            .catch((error) => {
                console.error('Error approving doctor:', error);
            });
    };
    
    const handleReject = (row) => {
        const doctorId = row._id;
        const reject_data = {
            _id: doctorId,
            user_id: localStorage.getItem('id')
        };
        reject_caretaker1(reject_data)
            .then(() => {
                loadCaretakerDetails();
                setMsg(`Doctor "${row.caretaker_firstname}" rejected successfully.`);
                setTimeout(() => {
                    setMsg('');
                }, 2000);
            })
            .catch((error) => {
                console.error('Error rejecting doctor:', error);
            });
    };
    
    function displayImage(cell, row) {
        return (
            <img
                src={row.caretaker_profile_image ? row.caretaker_profile_image : defaultProfileImage}
                alt="Profile Image"
                height="50px"
                width="50px"
                style={{ borderRadius: "50%" }}
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
            margin: '0 5px',
            transition: 'background-color 0.3s'
        };
    
        const editStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(160, 212, 104, 0.2)', 
            color: '#A0D468'
        };
    
        const deleteStyle = {
            ...buttonStyle,
            backgroundColor: 'rgba(229, 115, 115, 0.2)', 
            color: '#E57373'
        };
    
        return (
            <div>
                <button style={editStyle} onClick={() => handleEdit(row)}>
                    <FaEdit />
                </button>
                <button style={deleteStyle} onClick={() => handleDelete(row)}>
                    <FaTrash />
                </button>
            </div>
        );
    };

    const approvedStatusFormatter = (cell, row) => {
        const buttonStyle = {
            width: '80px',
            height: '30px',
            borderRadius: '5px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            backgroundColor: 'rgba(229, 115, 115, 0.2)', 
            color: '#E57373'
        };

        if (row.caretaker_approvedStatus === "true") {
            return <span style={{ color: '#A0D468' }}>Approved</span>;
        } else if (row.caretaker_approvedStatus === "false" && row.caretaker_deleted_status ==="true") {
            return <span style={{ color: '#E57373' }}>Rejected</span>;
        } else {
            return (
                <>
                    <button style={buttonStyle} onClick={() => handleReject(row)}>
                        Reject
                    </button>
                    <button style={buttonStyle} onClick={() => handleApprove(row)}>
                        Pending
                    </button>
                </>
            );
        }
    };

    return (
        <Fragment>
            <Head>
                <title>DOCTORS List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Topbar />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>Doctors List</b></h2></center>
                    <Link href="/Doctor/AddDoctor">
                        <a className="btn-add-doctor">
                            <FaUserPlus style={{ marginRight: '8px' }} />
                            Add Doctor
                        </a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <div className="custom-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Profile</th>
                                    <th>First Name</th>
                                    <th>Mobile No</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Register Status</th>
                                    <th>Approved Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {caretakerdetail.map((doctor, index) => (
                                    <tr key={doctor._id}>
                                        <td>{index + 1}</td>
                                        <td>{displayImage(null, doctor)}</td>
                                        <td>{doctor.caretaker_firstname}</td>
                                        <td>{doctor.caretaker_phone_number}</td>
                                        <td>{doctor.caretaker_gender}</td>
                                        <td>{doctor.caretaker_email}</td>
                                        <td><span className="status-badge">{doctor.caretaker_approvedStatus}</span></td>
                                        <td>{approvedStatusFormatter(null, doctor)}</td>
                                        <td>{actionFormatter(null, doctor)}</td>
                                    </tr>
                                ))}
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
                    width: 90%;
                }
                .custom-table {
                    width: 130%;
                    border-collapse: collapse;
                    margin: 50px 0;
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
                    border-bottom: 2px solid #B4A3E1;
                }
                .btn-add-doctor {
                    display: inline-flex;
                    align-items: center;
                    margin-bottom: 20px;
                    padding: 10px 20px;
                    font-size: 16px;
                    font-weight: bold;
                    color: white;
                    background-color: #B4A3E1;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    transition: background-color 0.3s;
                }
                .btn-add-doctor:hover {
                    background-color: #9575CD;
                }
                .alert-success {
                    color: #3c763d;
                    background-color: #dff0d8;
                    border-color: #d6e9c6;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .status-badge {
                    display: inline-block;
                    padding: 5px 10px;
                    font-size: 12px;
                    color: #6C757D;
                    background-color: #CDEDD6;
                    border-radius: 4px;
                }
            `}</style>
        </Fragment>
    );
};

export default CaretakerView;
