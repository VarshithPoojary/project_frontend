import { API } from '../config';
import fetch from 'isomorphic-fetch';

export const contactDetail_list = () => {
    return fetch(`${API}/contactDetail_list`,{
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
