import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const OTPPage = () => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (index, value) => {
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join('');
    console.log('Submitted OTP:', enteredOtp);
    // Add your logic here to handle the submitted OTP
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
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="otp" className="form-label">Enter OTP sent to your Email</label>
                          <div className="otp-container">
                            {otpDigits.map((digit, index) => (
                              <input
                                key={index}
                                className="otp-input"
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="d-grid">
                          <button className="my-btn-primary" type="submit">Submit</button>
                        </div>
                        <div className="mt-3 text-center">
                          <Link href="/ResendOTP">Resend OTP</Link>
                        </div>
                      </form>
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
