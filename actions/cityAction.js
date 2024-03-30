import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



export const add_city = cityData => {
    return fetch(`${API}/add_city`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cityData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

