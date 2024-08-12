import { API } from '../config';
import fetch from 'isomorphic-fetch'; 

export const admin_forgot_Password_OTP = admin_email => {
  return fetch(`${API}/admin_forgot_Password_OTP`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({admin_email })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const verifyOTP = otpData => {
  return fetch(`${API}/verifyOTP`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(otpData)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const resendOTP = admin_email => {
  return fetch(`${API}/resendOTP`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({admin_email })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const resetPassword = passwordData => {
  return fetch(`${API}/resetPassword`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(passwordData)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};



