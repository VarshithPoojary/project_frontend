import { API } from '../config';
import fetch from 'isomorphic-fetch';

export const add_patient = formData => {
    return fetch(`${API}/add_patient`, {
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

export const patient_list = () => {
    return fetch(`${API}/patient_list`,{
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

export const patient_details_by_id = patientData => {
    var id={"_id":patientData};
    return fetch(`${API}/patient_list_by_id`, {
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




export const update_patient = formData => {
    return fetch(`${API}/update_patient`, {
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

export const DeletePatientDetails = (patientData) => {
    return fetch(`${API}/admin_delete`, {
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




