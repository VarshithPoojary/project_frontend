import React, { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaTrash } from 'react-icons/fa';
import Head from 'next/head';
import Header from './Header';
import Topbar from './topbar';

const DoctorCard = ({ imageUrl, name, specialist }) => {
    return (
        <>
            <Head>
                <title>Add New Doctor</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Add New Doctor' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>

            <Topbar />
            <Header />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>DEPARTMENT LIST</b></h2></center>
                    <Link href="/Department">
                        <a className="btn btn-success mb-3" style={{ background: "#3085d6", borderColor: "#0c9da8", width: '20%' }}>Add Department</a>
                    </Link>
                    {/* {msg && <div className="alert alert-success">{msg}</div>} */}
                    
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="vertical-card" style={cardStyle}>
                                <img src="/images/doctor1 (2).jpg" alt="Doctor" style={imageStyle} />
                                <div style={textStyle}>
                                    <p>Dr.Suresh</p>
                                    <p>Oncology Department</p>
                                </div>
                                <div style={buttonContainerStyle}>
                                    <button className="btn btn-primary btn-block" style={buttonStyle}><FaEye /></button>
                                    <button className="btn btn-danger btn-block" style={buttonStyle}><FaTrash /></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="vertical-card" style={cardStyle}>
                                <img src="/images/doctor2 (2).jpg" alt="Doctor" style={imageStyle} />
                                <div style={textStyle}>
                                <p>Dr.Suresh</p>
                                    <p>Oncologist</p>
                                </div>
                                <div style={buttonContainerStyle}>
                                    <button className="btn btn-primary btn-block" style={buttonStyle}><FaEye /></button>
                                    <button className="btn btn-danger btn-block" style={buttonStyle}><FaTrash /></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="vertical-card" style={cardStyle}>
                                <img src="/images/doctor3 (2).jpg" alt="Doctor" style={imageStyle} />
                                <div style={textStyle}>
                                <p>Dr.Suresh</p>
                                    <p>Oncologist</p>
                                </div>
                                <div style={buttonContainerStyle}>
                                    <button className="btn btn-primary btn-block" style={buttonStyle}><FaEye /></button>
                                    <button className="btn btn-danger btn-block" style={buttonStyle}><FaTrash /></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="vertical-card" style={cardStyle}>
                                <img src="/images/doctor4.jpg" alt="Doctor" style={imageStyle} />
                                <div style={textStyle}>
                                <p>Dr.Suresh</p>
                                    <p>Oncologist</p>
                                </div>
                                <div style={buttonContainerStyle}>
                                    <button className="btn btn-primary btn-block" style={buttonStyle}><FaEye /></button>
                                    <button className="btn btn-danger btn-block" style={buttonStyle}><FaTrash /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const cardStyle = {
    width: '200px',
    backgroundColor: '#FFFFFF',
    marginLeft: '-10%',
    marginTop: '-5px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
    width: '80%',
    height: '100px',
    marginLeft: '10%',
    marginBottom: '10px',
};

const textStyle = {
    textAlign: 'center',
    marginBottom: '10px',
    color: 'black',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
};

const buttonStyle = {
    width: '50px',
    height: '40px',
};

export default DoctorCard;
