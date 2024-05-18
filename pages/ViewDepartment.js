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
                    <center><h2><b>DOCTOR LIST</b></h2></center>
                    <Link href="/Department">
                        <a className="btn btn-success mb-3"  style={{  background: "#3085d6",borderColor: "#0c9da8", width:'20%' }}>Add Department</a>
                    </Link>
                    {/* {msg && <div className="alert alert-success">{msg}</div>} */}
     
        <div className="row">
        <div className="col-md-3 mb-3" style={{ marginLeft: '20px' }}>
            <div className="vertical-card" style={{
                width: '200px', // Decreased card width
                backgroundColor: '#FFFFFF',
                marginLeft:'-10%',// Card background color
                marginTop:'-5px',
                padding: '10px', // Card padding
                borderRadius: '5px', // Card border radius
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
            }}>
                <img src="/images/doctor1 (2).jpg" alt="Doctor" style={{ width: '80%', height:'100px',marginLeft: '10%', marginBottom: '10px' }} />
                <div style={{ textAlign: 'center', marginBottom: '10px',color:'black' }}>
                {/* <span>{specialist}</span> */}
                <p>Dermatologist</p>
                </div>
                <button className="btn btn-primary btn-block" style={{width: '50px',marginLeft:'70px'}}><FaEye /></button> {/* Icon button for View */}
                <button className="btn btn-danger btn-block" style={{width: '50px',marginLeft:'70px'}}><FaTrash /></button> {/* Icon button for Delete */}
            </div>
        </div>
        <div className="col-md-3 mb-3">
            <div className="vertical-card" style={{
                width: '200px', 
                marginLeft:'-10%',// Card background color
                marginTop:'-5px',
                backgroundColor: '#FFFFFF',// Card background color
                padding: '10px', // Card padding
                borderRadius: '5px', // Card border radius
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
            }}>
                <img src="/images/doctor2 (2).jpg" alt="Doctor" style={{ width: '80%', height:'100px',marginLeft: '10%', marginBottom: '10px' }} />
                <div style={{ textAlign: 'center', marginBottom: '10px',color:'black' }}>
                {/* <span>{specialist}</span> */}
                <p>Dermatologist</p>
                </div>
                <button className="btn btn-primary btn-block" style={{width: '50px',marginLeft:'70px'}}><FaEye /></button> {/* Icon button for View */}
                <button className="btn btn-danger btn-block" style={{width: '50px',marginLeft:'70px'}}><FaTrash /></button> {/* Icon button for Delete */}
            </div>
        </div>
        <div className="col-md-3 mb-3">
            <div className="vertical-card" style={{
                width: '200px',
                marginLeft:'-10%',// Card background color
                marginTop:'-5px',
                backgroundColor: '#FFFFFF',// Card background color
                padding: '10px', // Card padding
                borderRadius: '5px', // Card border radius
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
            }}>
                <img src="/images/doctor3 (2).jpg" alt="Doctor" style={{ width: '80%', height:'100px',marginLeft: '10%', marginBottom: '10px' }} />
                <div style={{ textAlign: 'center', marginBottom: '10px',color:'black' }}>
                {/* <span>{specialist}</span> */}
                <p>Dermatologist</p>
                </div>
                <button className="btn btn-primary btn-block" style={{width: '50px',marginLeft:'70px'}}><FaEye /></button> {/* Icon button for View */}
                <button className="btn btn-danger btn-block" style={{width: '50px',marginLeft:'70px'}}><FaTrash /></button> {/* Icon button for Delete */}
            </div>
        </div>
    
        <div className="col-md-3 mb-3">
            <div className="vertical-card" style={{
                width: '200px',
                marginLeft:'330%',// Card background color
                marginTop:'-275px', // Decreased card width
                backgroundColor: '#FFFFFF',// Card background color
                padding: '10px', // Card padding
                borderRadius: '5px', // Card border radius
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
            }}>
                <img src="/images/doctor4.jpg" alt="Doctor" style={{ width: '80%', height:'100px',marginLeft: '10%', marginBottom: '10px' }} />
                <div style={{ textAlign: 'center', marginBottom: '10px',color:'black' }}>
                {/* <span>{specialist}</span> */}
                <p>Dermatologist</p>
                </div>
                <button className="btn btn-primary btn-block" style={{width: '50px',marginLeft:'70px'}}><FaEye /></button> {/* Icon button for View */}
                <button className="btn btn-danger btn-block" style={{width: '50px',marginLeft:'70px'}}><FaTrash /></button> {/* Icon button for Delete */}
                    </div>
            </div>
        </div>
        </div>
        </div>
        
        </>
       
    );
}

export default DoctorCard;