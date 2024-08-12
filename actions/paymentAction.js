import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();



export const add_payment = paymentData => {
    return fetch(`${API}/add_payment`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const payment_list = () => {
    return fetch(`${API}/payment_list`,{
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


export const payment_list_by_id = paymentPass => {
    const id = { "_id": paymentPass };
    return fetch(`${API}/payment_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const payment_update= countryData => {
    return fetch(`${API}/payment_update`, {
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



export const payment_delete = (query) => {
    return fetch(`${API}/payment_delete`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};






