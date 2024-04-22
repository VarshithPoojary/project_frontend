import { API } from '../config';
import fetch from 'isomorphic-fetch';

export const add_banner = formData => {
    return fetch(`${API}/add_banner`, {
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