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