import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { verifyOTP,resendOTP } from '../actions/forgotpasswordAction';

const OTPPage = () => {
  const [admin_otp, setAdmin_otp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const admin_email = localStorage.getItem('userEmail');

    try {
      const response = await verifyOTP({ admin_email, admin_otp });
      if (response.error) {
        setError(response.error);
        setTimeout(() => {
          setError('');
        }, 1000);
      } else {
        setMessage("OTP verified successfully");
        setTimeout(() => {
          setMessage('');
          Router.push('/Resetpassword');
        }, 1000);
      }
    } catch (err) {
      setMessage('');
      setError('Failed to verify OTP');
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    const admin_email = localStorage.getItem('userEmail');

    try {
      const response = await resendOTP({ admin_email });
      if (response.error) {
        setResendMessage('Failed to resend OTP');
        setTimeout(() => {
          setResendMessage('');
        }, 2000);
      } else {
        setResendMessage('OTP sent to your email');
        setTimeout(() => {
          setResendMessage('');
        }, 2000);
      }
    } catch (err) {
      setResendMessage('Failed to resend OTP');
      setTimeout(() => {
        setResendMessage('');
      }, 2000);
    }
  };


  return (
    <>
      <Head>
        <title>OTP</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Admin_Profile" />
      </Head>

      <div id="wrapper">
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="my-card">
                    <div className="my-card-header">One Time Password (OTP)</div>
                    <div className="my-card-body">
                      <form onSubmit={handleVerifyOTP}>
                        <div className="mb-3">
                          <label htmlFor="admin_otp" className="form-label">Enter OTP sent to your Email</label>
                          <div className="otp-container">
                            <input
                              className="otp-input"
                              type="text"
                              value={admin_otp}
                              onChange={(e) => setAdmin_otp(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="d-grid">
                          <button className="my-btn-primary" type="submit">Submit</button>
                        </div>
                        <div className="mt-3 text-center">
                        <a href="#" onClick={handleResendOTP}>Resend OTP</a>
                        </div>
                      </form>
                      {message && <div className="alert alert-success mt-3">{message}</div>}
                      {error && <div className="alert alert-danger mt-3">{error}</div>}
                      {resendMessage && <div className="alert alert-info mt-3">{resendMessage}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPPage;
