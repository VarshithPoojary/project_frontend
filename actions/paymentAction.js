import { API } from '../config';
import fetch from 'isomorphic-fetch';


export const admin_payment_list_by_id = (adminId) => {
    return fetch(`${API}/admin_payment_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: adminId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(err => {
        console.error('Error fetching admin payment list by ID:', err);
        throw err;
    });
};

export const admin_payment_list = () => {
    return fetch(`${API}/payment_list`, {
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
    .catch(err => {
        console.error('Error fetching admin payment list:', err);
        throw err;
    });
};
