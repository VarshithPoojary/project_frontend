import { API } from '../config';
import fetch from 'isomorphic-fetch';

export const getAdminById = async (adminId) => {
    return fetch(`${API}/admin_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: adminId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
