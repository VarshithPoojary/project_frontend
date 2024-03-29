import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



export const add_country = countryData => {
    return fetch(`${API}/add_admin_country`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(countryData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const loadCountryDetails = () => {
    return fetch(`${API}/admin_country_list`,{
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


