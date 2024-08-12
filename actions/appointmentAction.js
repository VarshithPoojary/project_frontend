import { API } from '../config';
import fetch from 'isomorphic-fetch';





export const appointment_list = () => {
    return fetch(`${API}/appointment_list`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(err => console.log(err));
};


export const appointment_details_by_id = appointmentId => {
    var id = { "_id": appointmentId };
    return fetch(`${API}/appointment_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(err => console.log(err));
};

export const appointment_payment_update = appointmentId => {
    var id = { "appointmentId": appointmentId };
    return fetch(`${API}/appointment_payment_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(err => console.log(err));
};




export const update_appointment = (appointmentData) => {
    return fetch(`${API}/update_appointment`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const delete_appointment = appointmentId => {
    return fetch(`${API}/appointment_cancel`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentId)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(err => console.log(err));
};

export const fetch_slots_by_date = (slotData) => {
    return fetch(`${API}/slot_listby_date`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(slotData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.msg || 'An error occurred while fetching the slots.');
            });
        }
        try {
            return response.json();
        } catch (error) {
            throw new Error('Error parsing JSON response');
        }
    })
    .catch(err => {
        console.error('Error fetching available slots:', err);
        return { error: true, msg: err.message };
    });
};

export const add_appointment = appointmentData => {
    return fetch(`${API}/addAppointment`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const appointment_list_by_patientId = patientId => {
    var id={"_id":patientId}
    return fetch(`${API}/appointment_list_by_patientId`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(err => console.log(err));
};

export const update_appointment_status = (appointmentId, status) => {
    return fetch(`${API}/appointment_reject_accept1`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ appointmentId, status })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.msg || 'An error occurred while updating the appointment status.');
                });
            }
            return response.json();
        })
        .catch(err => {
            console.error('Error updating appointment status:', err);
            throw err;
        });
};




export const update_appointment_disclaimer = disclaimer_data => {
    return fetch(  `${API}/appointment_disclaimer_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(disclaimer_data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


