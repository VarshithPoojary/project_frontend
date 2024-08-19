import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../Header';
import Topbar from '../topbar';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactStars from 'react-stars';
import { doctor_details_by_id, DeleteDoctorDetails } from '../../actions/doctorprofileAction';
import { slot_listby_caretaker_id } from '../../actions/slotAction';

const DoctorProfile = () => {
  const defaultProfileImage = '/images/userLogo.png';
  const router = useRouter();
  const [values, setValues] = useState({
    caretaker_firstname: '',
    caretaker_lastname: '',
    caretaker_phone_number: '',
    caretaker_email: '',
    caretaker_referralcode: '',
    caretaker_type: '',
    caretaker_dob: '',
    caretaker_gender: '',
    caretaker_address: '',
    caretaker_apt_number: '',
    caretaker_work_experience: '',
    caretaker_year_of_passing: '',
    degree_name: '',
    caretaker_rating:'',
    university_name: '',
    caretaker_longitude: '',
    caretaker_latitude: '',
    caretaker_profile_image: defaultProfileImage,
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const [slotTiming, setSlotTiming] = useState([]);
  const [bio, setBio] = useState('');

  useEffect(() => {
    const caretakerId=router.query._id;
    loadCaretakerDetail(caretakerId);
    loadBio(caretakerId);
    loadSlotDetails(caretakerId);
  }, []);

  const loadCaretakerDetail = (_id) => {
    setValues({ ...values, loading: true });
    doctor_details_by_id(_id)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          const doctorData = data.caretaker_list[0];
          alert(JSON.stringify(doctorData));
          const dob = new Date(doctorData.caretaker_dob);
          const day = dob.getDate();
          const month = dob.toLocaleString('default', { month: 'long' });
          const year = dob.getFullYear();
          setValues({
            ...values,
            caretaker_firstname: doctorData.caretaker_firstname,
            caretaker_lastname: doctorData.caretaker_lastname,
            caretaker_phone_number: doctorData.caretaker_phone_number,
            caretaker_email: doctorData.caretaker_email,
            caretaker_referralcode: doctorData.caretaker_referralcode,
            caretaker_type: doctorData.caretaker_type,
            caretaker_dob: `${day} ${month} ${year}`,
            caretaker_gender: doctorData.caretaker_gender,
            caretaker_address: doctorData.caretaker_address,
            caretaker_apt_number: doctorData.caretaker_apt_number,
            caretaker_work_experience: doctorData.caretaker_work_experience,
            caretaker_year_of_passing: doctorData.caretaker_year_of_passing,
            degree_name: doctorData.degree_name,
            caretaker_rating: doctorData.caretaker_rating,
            university_name: doctorData.university_name,
            caretaker_longitude: doctorData.caretaker_longitude,
            caretaker_latitude: doctorData.caretaker_latitude,
            caretaker_profile_image: doctorData.caretaker_profile_image || defaultProfileImage,
            loading: false,
          });
        }
      })
      .catch(error => {
        setValues({ ...values, error: 'Error: Network request failed', loading: false });
      });
  };

  const loadBio = (caretakerId) => {
    const savedBio = localStorage.getItem(`doctorBio_${caretakerId}`);
    if (savedBio) {
      setBio(savedBio);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this profile!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        DeleteDoctorDetails(caretakerId).then(() => {
          Router.push('/login');
        });
      }
    });
  };

  const loadSlotDetails = (caretakerId) => {
    slot_listby_caretaker_id(caretakerId)
      .then(data => {
        if (!data.error && data.slot_list.length > 0) {
          const today = new Date();
          const timings = data.slot_list.reduce((acc, slot) => {
            const date = new Date(slot.slot_date);
            if (date >= today) { 
              const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
              const timeSlots = slot.slot_timings.map(timing => ({
                slot_time: timing.slot_time,
                slot_timing_id: timing._id,
              }));
              if (!acc[formattedDate]) {
                acc[formattedDate] = [];
              }
              acc[formattedDate] = acc[formattedDate].concat(timeSlots);
            }
            return acc;
          }, {});
          setSlotTiming(Object.entries(timings));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const {
    caretaker_firstname,
    caretaker_lastname,
    caretaker_phone_number,
    caretaker_email,
    caretaker_referralcode,
    caretaker_type,
    caretaker_dob,
    caretaker_gender,
    caretaker_address,
    caretaker_apt_number,
    caretaker_work_experience,
    caretaker_year_of_passing,
    degree_name,
    university_name,
    caretaker_longitude,
    caretaker_latitude,
    caretaker_rating,
    caretaker_profile_image,
    error,
    loading,
  } = values;

  return (
    <div>
      <Head>
        <title>Doctor Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="caretaker_profile" />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>

      <Topbar />
      <Header />

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow" style={{ maxWidth: '800px', height: '80vh', overflowY: 'scroll' }}>
          <div className="card-header text-center">
            <h4>Doctor Profile</h4>
          </div>
          <div className="card-body text-center">
            <div className="profile-img mx-auto mb-3" style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden' }}>
              <label htmlFor="fileInput">
                <img src={caretaker_profile_image} alt="Profile Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </label>
              <input id="fileInput" name="file" style={{ display: 'none' }} />
            </div>
            <h3>{`${caretaker_firstname} ${caretaker_lastname}`}</h3>
            <div className="rating mt-3">
              <ReactStars
                count={5}
                value={caretaker_rating}
                size={24}
                color2={'#f5bf4b'}
                edit={false}
              />
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Doctor referralCode:</strong> {caretaker_referralcode}</p>
                <p><strong>Caretaker Type:</strong> {caretaker_type}</p>
                <p><strong>Mobile Number:</strong> {caretaker_phone_number}</p>
                <p><strong>Date of Birth:</strong> {caretaker_dob}</p>
                <p><strong>Gender:</strong> {caretaker_gender}</p>
                <p><strong>Email:</strong> {caretaker_email}</p>
                <p><strong>Address:</strong> {caretaker_address}</p>
                <p><strong>Apartment number:</strong> {caretaker_apt_number}</p>
                <p><strong>Work Experience:</strong> {caretaker_work_experience}</p>
                <p><strong>Passing Year:</strong> {caretaker_year_of_passing}</p>
                <p><strong>Degree name:</strong> {degree_name}</p>
                <p><strong>University name:</strong> {university_name}</p>
                <p><strong>Longitude:</strong> {caretaker_longitude}</p>
                <p><strong>Latitude:</strong> {caretaker_latitude}</p>
              </div>
              <div className="col-md-6">
                {slotTiming.length > 0 ? (
                  slotTiming.map(([date, slots], index) => (
                    <div key={index}>
                      <p><strong>Slot Date:</strong> {date}</p>
                      <div className="d-flex flex-wrap">
                        {slots.map((slot, idx) => (
                          <div key={idx} className="card m-2" style={{ width: 'auto', padding: '3px', fontSize: '0.8rem' }}>
                            <div className="card-body p-1">
                              <p className="card-text">{slot.slot_time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'red' }}>Currently, this doctor has no available appointment slots.</p>
                )}
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-danger mt-4" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .rating {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .card-body {
          padding: 1rem;
        }
        .card {
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default DoctorProfile;
