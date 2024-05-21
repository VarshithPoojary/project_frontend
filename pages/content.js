import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Link from 'next/link';
import { FaUser,FaUserInjured,FaMoneyBillAlt,FaTimesCircle,FaClinicMedical,FaUserPlus,FaCalendarCheck,FaHospitalUser,FaCalendar,FaCalendarAlt ,FaClock,FaUsers ,FaClipboardList,FaUserMd,FaStethoscope,FaDochub   } from "react-icons/fa";
import { BiUser,BiSearch,BiPlusCircle} from "react-icons/bi";

const cookies = new Cookies();

const Users = () => {
    const [values, setValues] = useState({
        labCount: 0,
        logsCount: 0,
    });
    const { labCount, logsCount } = values;
    const token = cookies.get('admin_token');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        // Your data loading logic here
    };

    
    const content = () => (
       
      <div className="container-fluid mt-3" style={{ overflow: 'auto', maxHeight: '100vh' }}>
      <div className="row" style={{paddingLeft:'200px', marginTop:'50px',width:'100%',marginLeft:'10px'}}>
        
          <div className="col-md-3 mb-3" style={{  marginRight: '-100px'  }}>
          <Link href="/Patient/TotalPatients">
                <a style={{ textDecoration: 'none' }}>
                    <div className="card-box tilebox-one" style={{ width:'70%',height: '128px',backgroundColor: '#87CEEB',color:'black'}}>
                        <i className="float-right mr-2" style={{ color: '#888' }}><FaUser /></i>
                        <h5 className="text-muted text-uppercase mb-3" >Registered Patients</h5>
                        <h4 className="mb-3" data-plugin="">{labCount}</h4>
                    </div>
                    </a>
            </Link>
                </div>
                

                <div className="col-md-3 mb-3" style={{ marginRight: '-100px' }}>
                {/* <Link href="/Patient/PatientVisit"> */}
                {/* <a style={{ textDecoration: 'none' }}> */}
                    <div className="card-box tilebox-one" style={{width:'70%', height: '128px', backgroundColor: '#87CEEB',color:'black'}}>
                    <i className="float-right mr-2" style={{ color: '#888' }}><FaDochub  /></i>
                        <h5 className="text-muted text-uppercase mb-3">Registered Doctors</h5>
                        <h4 className="mb-3" data-plugin="">{labCount}</h4>
                    </div>
                    {/* </a> */}
            {/* </Link> */}
                </div>

                <div className="col-md-3 mb-3" style={{ marginRight: '-70px' }}>
                <Link href="/Patient/BillandPayments">
                <a style={{ textDecoration: 'none' }}>
                    <div className="card-box tilebox-one" style={{ width:'80%',height: '128px',backgroundColor: '#87CEEB', color:'black'}}>
                    <i className="float-right mr-2" style={{ color: '#888' }}><FaCalendarCheck   /></i>
                        <h5 className="text-muted text-uppercase mb-3" >Total Appointments</h5>
                        <h4 className="mb-3" data-plugin="">{labCount}</h4>
                    </div>
                    </a>
            </Link>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card-box tilebox-one" style={{ width:'70%',height: '128px',backgroundColor: '#87CEEB', color:'black'}}>
                    <i className="float-right mr-3" style={{ color: '#888' }}><FaClock    /></i>
                        <h5 className="text-muted text-uppercase mb-4">Slot</h5>
                        <h4 className="mb-3" data-plugin="">{labCount}</h4>
                    </div>
                </div>
            </div>

            <div className="content-card" style={{
    width: '80%', // Decreased card width
    marginTop: '-25px', // Increased margin-top for lower positioning
    backgroundColor: '#E6F7FF',// Card background color
    padding: '10px', // Card padding
    borderRadius: '5px', // Card border radius
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
    marginLeft: '15%', // Center the card horizontally
    marginRight: 'auto', // Center the card horizontally
}}>

<div className="content-patient-card-header" style={{ fontSize: '18px',color:'black' }}>
                <span>{<FaUser />} Patient</span>
            </div>

    <div className="row" style={{ marginTop:'20px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="col-md-3 mb-1" style={{ marginLeft: '20px' }}>
            <div className="card-box tilebox-one" style={{ height: '128px', color: 'black',backgroundColor: '#f5f5f5 ' }}>
            <i className="float-right mr-4" style={{ color: '#888' }}><FaUsers   /></i>
                <h5 className="text-muted text-uppercase mb-3">Total Patients</h5>
                <h4 className="mb-3" data-plugin="">{labCount}</h4>
            </div>
        </div>
        <div className="col-md-3 mb-1" style={{ marginLeft: '-90px' }}>
            <div className="card-box tilebox-one" style={{ height: '128px', color: 'black',backgroundColor: '#f5f5f5 ' }}>
            <i className="float-right mr-4" style={{ color: '#888' }}><FaCalendarAlt    /></i>
                <h5 className="text-muted text-uppercase mb-3">Appointments</h5>
                <h4 className="mb-3" data-plugin="">{labCount}</h4>
            </div>
        </div>
        <div className="col-md-3 mb-1" style={{ marginLeft: '-90px' }}>
            <div className="card-box tilebox-one" style={{ height: '128px', color: 'black',backgroundColor: ' #f5f5f5' }}>
            <i className="float-right mr-4" style={{ color: '#888' }}><FaHospitalUser    /></i>
                <h5 className="text-muted text-uppercase mb-3">Patient Visit</h5>
                <h4 className="mb-3" data-plugin="">{labCount}</h4>
            </div>
        </div>
        <div className="col-md-1 mb-3" style={{ marginLeft: '-90px' }}>
            <button className="btn btn-primary">View</button>
        </div>
        <div className="col-md-1 mb-3" style={{ marginLeft: '-90px' }}>
            <button className="btn btn-success">Add</button>
        </div>
    </div>
</div>

<div className="content-card" style={{
    width: '80%', // Decreased card width
    marginTop: '20px', // Increased margin-top for lower positioning
    backgroundColor: '#E6F7FF',// Card background color
    padding: '10px', // Card padding
    borderRadius: '5px', // Card border radius
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
    marginLeft: '15%', // Center the card horizontally
    marginRight: 'auto', // Center the card horizontally
}}>

<div className="content-patient-card-header" style={{ fontSize: '18px',color:'black' }}>
                <span>{<FaUserMd  />} Doctor</span>
            </div>

    <div className="row" style={{ marginTop:'20px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="col-md-3 mb-1" style={{ marginLeft: '20px' }}>
            <div className="card-box tilebox-one" style={{ height: '128px', color: 'black',backgroundColor: ' #f5f5f5' }}>
            <i className="float-right mr-4" style={{ color: '#888' }}><FaUserPlus /></i>
                <h5 className="text-muted text-uppercase mb-3">Total Doctors</h5>
                <h4 className="mb-3" data-plugin="">{labCount}</h4>
            </div>
        </div>
        <div className="col-md-3 mb-1" style={{ marginLeft: '-90px' }}>
            <div className="card-box tilebox-one" style={{ height: '128px', color: 'black',backgroundColor: ' #f5f5f5' }}>
            <i className="float-right mr-4" style={{ color: '#888' }}><FaCalendar    /></i>
                <h5 className="text-muted text-uppercase mb-3">Appointment Slots</h5>
                <h4 className="mb-3" data-plugin="">{labCount}</h4>
            </div>
        </div>
        <div className="col-md-3 mb-1" style={{ marginLeft: '-90px' }}>
            <div className="card-box tilebox-one" style={{ height: '128px', color: 'black',backgroundColor: ' #f5f5f5' }}>
            <i className="float-right mr-4" style={{ color: '#888' }}>< FaStethoscope  /></i>
                <h5 className="text-muted text-uppercase mb-3">Specialist</h5>
                <h4 className="mb-3" data-plugin="">{labCount}</h4>
            </div>
        </div>
        <div className="col-md-1 mb-3" style={{ marginLeft: '-90px' }}>
            <button className="btn btn-primary">View</button>
        </div>
        <div className="col-md-1 mb-3" style={{ marginLeft: '-90px' }}>
            <button className="btn btn-success">Add</button>
        </div>
    </div>
    <div className="row">
    <div className="col-md-3 mb-3" style={{ marginLeft: '20px' }}>
        <div className="vertical-card" style={{
            width: '200px', // Decreased card width
            backgroundColor: '#FFFFFF',// Card background color
            padding: '10px', // Card padding
            borderRadius: '5px', // Card border radius
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
        }}>
            <img src="/images/doctor1 (2).jpg" alt="Doctor" style={{ width: '80%', height:'100px',marginLeft: '10%', marginBottom: '10px' }} />
            <button className="btn btn-primary btn-block">View</button>
            <button className="btn btn-danger btn-block">Delete</button>
        </div>
    </div>
    <div className="col-md-3 mb-3">
        <div className="vertical-card" style={{
            width: '200px', 
          marginLeft:'-50px',
            backgroundColor: '#FFFFFF',// Card background color
            padding: '10px', // Card padding
            borderRadius: '5px', // Card border radius
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
        }}>
            <img src="/images/doctor2 (2).jpg" alt="Doctor" style={{ width: '80%', height:'100px',marginLeft: '10%', marginBottom: '10px' }} />
            <button className="btn btn-primary btn-block">View</button>
            <button className="btn btn-danger btn-block">Delete</button>
        </div>
    </div>
    <div className="col-md-3 mb-3">
        <div className="vertical-card" style={{
            width: '200px',
            marginLeft:'-100px', // Decreased card width
            backgroundColor: '#FFFFFF',// Card background color
            padding: '10px', // Card padding
            borderRadius: '5px', // Card border radius
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
        }}>
            <img src="/images/doctor3 (2).jpg" alt="Doctor" style={{ width: '80%', height:'100px',marginLeft: '10%', marginBottom: '10px' }} />
            <button className="btn btn-primary btn-block">View</button>
            <button className="btn btn-danger btn-block">Delete</button>
        </div>
    </div>

    <div className="col-md-3 mb-3">
        <div className="vertical-card" style={{
            width: '200px',
            marginLeft:'770px',
            marginTop:'-230px', // Decreased card width
            backgroundColor: '#FFFFFF',// Card background color
            padding: '10px', // Card padding
            borderRadius: '5px', // Card border radius
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Card shadow
        }}>
            <img src="/images/doctor4.jpg" alt="Doctor" style={{ width: '80%', height:'100px',marginLeft: '10%', marginBottom: '10px' }} />
            <button className="btn btn-primary btn-block">View</button>
            <button className="btn btn-danger btn-block">Delete</button>
        </div>
    </div>


    
    

    
</div>
</div>

    





        </div>

        
 
       
    );

    return <React.Fragment>{content()}</React.Fragment>;
}

export default Users;
