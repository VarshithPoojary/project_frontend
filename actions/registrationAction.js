import { API } from '../config';
import fetch from 'isomorphic-fetch';



export const Registration = adminRegister => {
    return fetch(`${API}/admin_add`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminRegister)
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