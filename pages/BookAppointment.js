import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Topbar from './topbar';
import Head from 'next/head';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa';
import { doctor_details_by_id } from '../actions/doctorprofileAction';
import { fetch_slots_by_date, add_appointment } from '../actions/appointmentAction';
import { patient_details_by_id } from '../actions/patientprofileAction';
import moment from 'moment';

const BookAppointment = () => {
    const router = useRouter();
    const { doctorId, specialistName, patientId } = router.query;
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [timeSelected, setTimeSelected] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [slotTimings, setSlotTimings] = useState([]);
    const [selectedSlotTime, setSelectedSlotTime] = useState('');
    const [slotLoading, setSlotLoading] = useState(false);
    const today = new Date().toISOString().split('T')[0];
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 

    const [values, setValues] = useState({
        doctor_details: '',
    });
    const [patientAddress, setPatientAddress] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user_id = localStorage.getItem('id');
            if (!user_id) {
                router.push('/Patientlogin');
            } else {
                fetchDoctorDetails();
                fetchPatientDetails(user_id); 
            }
        }
    }, []);

    const fetchDoctorDetails = () => {
        doctor_details_by_id(router.query.doctorId)
            .then((response) => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    setValues({
                        ...values,
                        doctor_details: response.caretaker_list[0],
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching doctors:', error);
            });
    };

    const fetchPatientDetails = (user_id) => {
        patient_details_by_id(user_id)
            .then((response) => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    setPatientAddress(response.patient_list[0].patient_area_id); // Set patient address ID
                }
            })
            .catch((error) => {
                console.error('Error fetching patient details:', error);
            });
    };

    const handleDateChange = async (event) => {
        const selectedDate = event.target.value;
        setSelectedDate(selectedDate);
        setSelectedTime('');
        fetchAvailableSlots(selectedDate);
    };

    const fetchAvailableSlots = (selectedDate) => {
        setSlotLoading(true);
        const caretakerId = router.query.doctorId;
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

        fetch_slots_by_date({ caretaker_id: caretakerId, slot_date: formattedDate })
            .then((response) => {
                if (response.error) {
                    console.error('Error fetching available slots:', response.msg);
                    setSlotTimings([]);
                } else {
                    const timings = response.slot_list.reduce((acc, slot) => {
                        return acc.concat(slot.slot_timings.map(timing => ({
                            slot_id: slot._id,
                            slot_time: timing.slot_time,
                            slot_timing_id: timing._id,
                        })));
                    }, []);
                    setSlotTimings(timings);
                }
                setSlotLoading(false);
            })
            .catch((error) => {
                console.error('Network error fetching available slots:', error);
                setSlotTimings([]);
                setSlotLoading(false);
            });
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setSelectedSlotTime(time);
        setTimeSelected(true);
    };

    const handleCancelSelection = () => {
        setSelectedTime('');
        setSelectedSlotTime('');
        setTimeSelected(false);
    };

    const handleConfirmAppointment = () => {
        const user_id = localStorage.getItem('id');
        if (!selectedDate || !selectedSlotTime) {
            setErrorMessage('Please select both a date and a time.');
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
            return;
        }

        const selectedSlot = slotTimings.find(slot => slot.slot_time === selectedSlotTime);
        const appointmentData = {
            created_by_id:user_id,
            caretaker_id: router.query.doctorId,
            patient_id: router.query.patientId,
            address_id: patientAddress, 
            address_id: values.doctor_details.caretaker_city_id,
            appointment_date: moment(selectedDate).format('YYYY-MM-DD'),
            slot: selectedSlot.slot_id,
            slot_timing_id: selectedSlot.slot_timing_id,
        };
   alert(JSON.stringify(appointmentData))
        add_appointment(appointmentData)
            .then(response => {
                if (response.error) {
                    setErrorMessage(response.error);
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 2000);
                } else {
                    router.push('/dashboard');
                }
            })
            .catch(error => {
                console.error('Error confirming appointment:', error);
                setErrorMessage('An error occurred while confirming the appointment.');
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // handleConfirmAppointment();
    };

    return (
        <>
            <Head>
                <title>Appointment</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content="Registration" />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>

            <Topbar />
            <Header />
            <Container style={styles.container}>
                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Card style={styles.appointmentCard}>
                            <Card.Header as="h5" style={styles.cardHeader}>
                                <FaCalendarAlt style={styles.icon} /> Book Appointment Here
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formDateTime" style={styles.formGroup}>
                                        <Form.Label>Appointment Date</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Control
                                                    type="date"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    required
                                                    min={today}
                                                />
                                            </Col>
                                            <Col>
                                                <div style={styles.timeSlots}>
                                                    {selectedDate && slotTimings.length > 0 ? (
                                                        slotTimings.map((time, index) => (
                                                            <Button
                                                                key={index}
                                                                variant={selectedSlotTime == time.slot_time ? 'primary' : 'outline-primary'}
                                                                onClick={() => handleTimeSelect(time.slot_time)}
                                                                style={styles.timeSlotButton}
                                                            >
                                                                {time.slot_time}
                                                            </Button>
                                                        ))
                                                    ) : (
                                                        <div style={styles.noSlots}>
                                                            <img src="/images/cal1.png" alt="No slots available" style={styles.noSlotsImage} />
                                                            <p>No slots available</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    {timeSelected && (
                                        <div style={styles.selectedTimeContainer}>
                                            <div style={styles.selectedTime}>
                                                <FaCalendarAlt style={styles.selectedTimeIcon} />
                                                Selected Time: {selectedTime} {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                                            </div>
                                            <Button variant="outline-secondary" style={{ width: '150px' }} onClick={handleCancelSelection}>
                                                Cancel Selection
                                            </Button>
                                        </div>
                                    )}

                                    <Button variant="primary" type="submit" onClick={handleConfirmAppointment}  style={styles.submitButton}>
                                        Submit
                                    </Button>
                                    {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
                                    {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
                                
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {values.doctor_details && (
                        <Col md="6">
                            <Card style={styles.doctorCard}>
                                <Card.Header as="h5" style={styles.cardHeader}>
                                    Doctor Details
                                </Card.Header>
                                <Card.Body>
                                    <div style={styles.doctorProfile}>
                                        <img src={values.doctor_details.caretaker_profile_image || '/images/defaultProfileImage.png'} alt="Doctor Profile" style={styles.doctorProfileImage} />
                                        <div>
                                            <h5>{values.doctor_details.caretaker_firstname} {values.doctor_details.caretaker_lastname}</h5>
                                            <p>{values.doctor_details.caretaker_type}</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
};

const styles = {
    container: {
        marginTop: '50px',
    },
    appointmentCard: {
        padding: '20px',
        marginTop: '80px',
        borderRadius: '8px',
        marginLeft: '150px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D3C8F1',
        color: 'white',
    },
    icon: {
        marginRight: '10px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    timeSlots: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    timeSlotButton: {
        margin: '5px',
        flex: '1 1 calc(50% - 10px)', 
        boxSizing: 'border-box',
    },
    submitButton: {
        width: '30%',
        marginTop: '20px',
    },
    selectedTimeContainer: {
        marginTop: '20px',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#e0e0e0',
        textAlign: 'center',
    },
    selectedTime: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
    },
    selectedTimeIcon: {
        marginRight: '10px',
    },
    noSlots: {
        textAlign: 'center',
        marginTop: '20px',
    },
    noSlotsImage: {
        width: '150px',
        height: '150px',
    },
    doctorCard: {
        cursor: 'pointer',
        padding: '20px',
        width: '350px',
        marginTop: '90px',
        marginLeft: '150px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    doctorProfile: {
        display: 'flex',
        alignItems: 'center',
    },
    doctorProfileImage: {
        borderRadius: '50%',
        marginRight: '20px',
        width: '80px',
        height: '80px',
    },
    
    
    errorMessage: {
        color: 'red',
        marginTop: '10px',
        textAlign: 'center',
    },
    successMessage: {
        color: 'green',
        marginTop: '200px',
        textAlign: 'center',
    },
    '@media (max-width: 768px)': {
        appointmentCard: {
            marginLeft: '10px',
            marginRight: '10px',
        },
        doctorCard: {
            marginLeft: '10px',
            marginRight: '10px',
        },
        timeSlotButton: {
            flex: '1 1 100%', 
        },
        submitButton: {
            width: '100%', 
        },
    },
};



export default BookAppointment;