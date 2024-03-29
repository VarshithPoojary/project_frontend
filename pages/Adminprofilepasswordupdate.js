import React, { useState } from 'react';
import Link from 'next/link';

const AdminPasswordUpdate = () => {
    
    const handleUpdate = () => {
        
    };

    return (
        <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="card" style={{ marginTop: '70px', padding: '20px',marginLeft:'250px',width: '700px', height: '400px'}}>
                <div className="card-body">
                    <h6 className="mb-3 text-primary">Password Details</h6>
                    <div className="form-group row">
                        <label htmlFor="oldpassword" className="col-sm-3 col-form-label">Old Password:</label>
                        <div className="col-sm-9">
                            <input
                                type="password"
                                className="form-control"
                                id="oldpassword"
                                placeholder="Enter old password"
                                style={{ width: '300px' }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="newpassword" className="col-sm-3 col-form-label">New Password:</label>
                        <div className="col-sm-9">
                            <input
                                type="password"
                                className="form-control"
                                id="newpassword"
                                placeholder="Enter new password"
                                style={{ width: '300px' }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="confirmpassword" className="col-sm-3 col-form-label">Confirm Password:</label>
                        <div className="col-sm-9">
                            <input
                                type="password"
                                className="form-control"
                                id="confirmpassword"
                                placeholder="Enter Confirm password"
                                style={{ width: '300px' }}
                            />
                        </div>
                    </div>
                    <div className="form-group row" >
                    <div className="col-sm-12 text-left">
                    <Link href="/Forgotpassword">
                                <a>Forgot Password?</a>
                            </Link>
                        </div>
                        </div>
                    <div className="form-group row mt-3">
                    <div className="col-sm-12 text-right">
                        <button type="button" className="btn btn-primary mr-2">Update</button>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
    
};

export default AdminPasswordUpdate;