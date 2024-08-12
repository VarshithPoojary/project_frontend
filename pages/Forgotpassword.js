import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { admin_forgot_Password_OTP } from '../actions/forgotpasswordAction';
import Router from 'next/router';


const ForgotPasswordPage = () => {
  const [admin_email, setadmin_email] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await admin_forgot_Password_OTP(admin_email);
      if(response.error)
        {
          setError(response.error);
          setTimeout(() => {
            setError('');
          }, 1000);
          
        }
        else{
          localStorage.setItem('userEmail',admin_email);
          setMessage("OTP sent to you mail")
          setTimeout(() => {
            setMessage("")
            Router.push('/OTPform');
          }, 1000);
          
        }
    } catch (err) {
      setMessage('');
      setError('Failed to generate OTP');
    }
  };

  return (
    <>

    <Head>
    <title>Forgot Password</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="title" content='Forgot Password' />
      <link rel="icon" href="/images/title_logo.png" />
    </Head>


      <div id="wrapper">
        
                  <div className="card mb-4" style={{ width: "900px", margin: "auto", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <div className="card-header" style={{background: "#D3C8F1" ,color:"black"}}>Forgot Password</div>
                    <div className="card-body" style={{ maxWidth: "1000px" }}>
                      <form onSubmit={handleGenerateOTP}>
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label className="small mb-1" htmlFor="admin_email">Enter your Email and you will receive an OTP to your registered Email.
                            </label>
                            <input
                              className="form-control"
                              id="admin_email"
                              type="admin_email"
                              placeholder="Enter Your Email"
                              name="admin_email"
                              value={admin_email}
                              onChange={(e) => setadmin_email(e.target.value)}
                              required
                              style={{ width: "150%" }}
                            />
                          </div>
                        </div>
                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#9370DB', width: "30%" }}>Send OTP</button>
                        <div className="d-flex justify-content-between mt-4">
                        <Link href="/login">
                                    <a  className="">Login</a>
                                </Link>
                               
                        </div>
                      </form>
                      {message && <div className="alert alert-success mt-3">{message}</div>}
                      {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </div>
                  </div>
                
      </div>
    </>
  );
};

export default ForgotPasswordPage;

