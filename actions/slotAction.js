import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



export const add_slot = slotData => {
    return fetch(`${API}/add_slot`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(slotData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const slot_list = () => {
    return fetch(`${API}/slot_list`,{
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

export const slot_list_by_id = slotData => {
    return fetch(`${API}/slot_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(slotData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// export const slot_listby_caretaker_id = slotData => {
//     return fetch(`${API}/slot_listby_caretaker_id`, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify(slotData)
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };


export const slot_listby_date = slotData => {
    return fetch(`${API}/slot_listby_date`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(slotData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const slot_listby_caretaker_id = caretakerData => {
    var id={"caretaker_id":caretakerData };
    return fetch(`${API}/slot_listby_caretaker_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json(id);
        })
        .catch(err => console.log(err));
};