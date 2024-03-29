import { API } from '../config';
import fetch from 'isomorphic-fetch';

// export const getAdminById = async (adminId) => {
//     return fetch(`${API}/admin_list_by_id`, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ _id: adminId })
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };

export const admin_details_by_id = adminData => {
    var id={"_id":adminData};
    return fetch(`${API}/admin_list_by_id`, {
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


export const update_admin = formData => {
    return fetch(`${API}/admin_update`, {
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



