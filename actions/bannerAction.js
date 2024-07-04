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

export const banner_list = () => {
    return fetch(`${API}/banner_list`,{
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

// export const banner_list_by_id = careType => {
//     var id={"_id":careType};
//     return fetch(`${API}/banner_list_by_id`, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(id)
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };


export const banner_list_by_id = () => {
    return fetch(`${API}/banner_list_by_id`,{
        method: 'POST',
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

export const banner_list_update = async (formData) => {
    try {
        const response = await fetch(`${API}/banner_list_update`, {
            method: 'POST',
            body: formData
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

export const banner_delete = async(data) => {
    return fetch(`${API}/banner_delete`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};