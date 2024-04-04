import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    // Add your logic for resetting the password here
    console.log('Resetting password for email:', email);
    // You can make an API call here to reset the password
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
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4" style={{ width: "900px", marginTop: "70px" }}>
                                    <div className="card-header">Forgot Password</div>
                                    <div className="card-body" style={{ maxWidth: "1000px" }}>
                                        <form onSubmit={handleResetPassword}>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1" htmlFor="admin_email"> Enter your email address and we'll send you an email with instructions to reset your password.
                                                    </label>
                                                    <input className="form-control" id="admin_email" type="email" placeholder="Enter Your Email" name="admin_email"  required style={{ width: "150%" }} />
                                                </div>
                                            </div>
                                            <button className="btn btn-primary" type="submit" style={{ backgroundColor: "#87CEFA", borderColor: "#87CEFA",width: "30%" }}onClick={handleResetPassword}>Send OTP</button>
                                            <div className="d-flex justify-content-between mt-4">
                                                <a className="" Link href="/login">Login</a>
                                                <a className="" Link href="/Registration">Register</a>
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
    

export default ForgotPasswordPage;
