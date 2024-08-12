import { API } from '../config';
import fetch from 'isomorphic-fetch';

export const add_doctor = formData => {
    return fetch(`${API}/add_caretaker`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(err => {
            console.error('Error:', err);
            throw err; 
        });
};


export const doctor_list = () => {
    return fetch(`${API}/caretaker_list`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const doctor_details_by_id = doctorData => {
    var id={"_id":doctorData};
    return fetch(`${API}/caretaker_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




export const update_doctor = formData => {
    return fetch(`${API}/caretaker_update`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(err => {
            console.error('Error:', err);
            throw err; 
        });
};

export const DeleteDoctorDetails = (patientData) => {
    return fetch(`${API}/caretaker_delete`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const caretaker_list_by_specialist = patientData => {
    var id={"caretaker_type":patientData};
    return fetch(`${API}/caretaker_list_by_specialist`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const slot_listby_caretaker_id = caretakerId => {
    var id = { "caretaker_id": caretakerId };
    return fetch(`${API}/slot_listby_caretaker_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};






