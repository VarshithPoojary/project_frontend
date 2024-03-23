import React, { useState } from 'react';
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
    <div className="d-flex justify-content-center">
    
    <div className="card text-center" style={{ width: '600px' }}>
      <div className="card-header h5 text-white bg-primary">Password Reset</div>
      <div className="card-body px-5">
        <p className="card-text py-2">
          Enter your email address and we'll send you an email with instructions to reset your password.
        </p>
        <div className="form-outline">
          <input type="email" id="typeEmail" className="form-control my-3" />
          
        </div>
        <button className="btn btn-primary w-100" onClick={handleResetPassword}>Reset password</button>
        <div className="d-flex justify-content-between mt-4">
          <a className="" Link href="/login">Login</a>
          <a className="" Link href="/Registration">Register</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ForgotPasswordPage;
