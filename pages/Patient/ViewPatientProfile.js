import React from 'react';

const PatientProfileCard = () => {
  return (
    <div className="row gutters-sm">
        
      {/* Profile Card */} 
      <div className="col-md-12 mb-3" style={{top:'50%',left:'50%'}}>
      
        <div className="profile-card card mt-5" style={{ width: '500px',height: '700px'}}>
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Patient"
                className="rounded-circle"
                width="100"
              />
              <div className="mt-3">
                <div className="row mb-3">
                  <div className="col-md-6 text-end mt-3">
                    <label htmlFor="firstName" className="form-label">First Name:</label>
                  </div>
                  <div className="col-md-6 mt-3">
                    <input type="text" className="form-control" id="firstName" readOnly style={{ width: '130%' }} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 text-end">
                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" id="lastName" readOnly style={{ width: '130%' }} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 text-end">
                    <label htmlFor="dob" className="form-label">Date Of Birth:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" id="dob" readOnly style={{ width: '130%' }} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 text-end">
                    <label htmlFor="email" className="form-label">Email:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" id="email" readOnly style={{ width: '130%' }} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 text-end">
                    <label htmlFor="mobile" className="form-label">Mobile Number:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="tel" className="form-control" id="mobile" readOnly style={{ width: '130%' }} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 text-end">
                    <label htmlFor="gender" className="form-label">Gender:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" id="gender" readOnly style={{ width: '130%' }} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 text-end">
                    <label htmlFor="address" className="form-label">Address:</label>
                  </div>
                  <div className="col-md-6 ">
                    <textarea className="form-control" id="address" rows="3" readOnly style={{ width: '130%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileCard;
