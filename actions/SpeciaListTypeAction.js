import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const add_specialistTypes = formData => {
    return fetch(`${API}/add_specialistType`, {
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

export const specialisttype_list = () => {

    return fetch(`${API}/specialistType_list`,{
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



export const specialistType_update = formData => {
    return fetch(`${API}/specialistType_update`, {
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

export const specialist_details_by_id = specialistData => {
    var id={"_id":specialistData};
    return fetch(`${API}/specialistType_list_by_id`, {
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

export const DeleteSpecialistDetails = (specialistData) => {
    return fetch(`${API}/specialistType_delete`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(specialistData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const check_doctors_for_specialist = async (specialistTypeId) => {
    try {
        const response = await fetch(`${API}/check_doctors_for_specialist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ specialistTypeId })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


