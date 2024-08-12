import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Topbar from './topbar';
import Header from './Header';
import { update_appointment_disclaimer } from '../actions/appointmentAction';
import { admin_payment_list } from '../actions/paymentAction';

const DescriptionAdd = () => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [payment, setPayment] = useState([]);
    const [disclaimer, setDisclaimer] = useState('');
    const [treatment_fees_id, setTreatmentId] = useState('');
    const [treatmentDescription, setTreatmentDescription] = useState('');
    const [amount, setAmount] = useState('');
    const router = useRouter();
    const { appointmentId, status } = router.query;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user_id = localStorage.getItem('id');
            if (!user_id) {
              Router.push('/login');
            } else {
        if (appointmentId) {

            // loadAppointmentDetails();
            loadTreatmentDetails();
        }
    }
}
    }, [appointmentId]);

    // const loadAppointmentDetails = async () => {
    //     try {
    //         const data = await update_appointment_disclaimer(appointmentId); 
    //         if (data.error) {
    //             console.error(data.error);
    //         } else {
    //             setDisclaimer(data.disclaimer || '');
    //             setTreatmentId(data.treatment_fees_id || '');
    //             setAmount(data.amount || '');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching appointment details:', error);
    //     }
    // };
    const loadTreatmentDetails = async () => {
        try {
            const data = await admin_payment_list(); 
            if (data.error) {
                console.error(data.error);
            } else {
                setPayment(data.admin_payment_list || '');
               
            }
        } catch (error) {
            console.error('Error fetching appointment details:', error);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const disclaimerdata = {
            appointmentId,
            disclaimer,
            status,
            treatment_fees_id,
            amount,
            description: treatmentDescription
          };
          console.log('Disclaimer data:', disclaimerdata);
          const res = await update_appointment_disclaimer(disclaimerdata);
        //   alert(JSON.stringify(res))
          setLoading(false);
          if (res.error) {
            setMsg(res.error || 'An error occurred while updating the appointment.');
          } else {
            setMsg(res.message);
            router.push('/MedicalReport');
          }
        } catch (error) {
          console.error('Error updating appointment:', error);
          setLoading(false);
          setMsg('An error occurred while updating the appointment.');
        }
      };

    const handleChange = (event) => {
        const value = JSON.parse(event.target.value);
        const { id, amount } = value;
        setTreatmentId(id);
        setAmount(amount);
       
    };
    
    return (
        <div id="wrapper">
            <Head>
                <title>Add Disclaimer</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Add Description' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                                    <div className="card-header" style={{ background: "#D3C8F1", color: "black" }}>Add Disclaimer here</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="description" className="col-sm-6 col-form-label">Enter Patient Disclaimer:</label>
                                                <div className="col-sm-9">
                                                    <textarea
                                                        className="form-control"
                                                        id="description"
                                                        name="description"
                                                        rows="8"
                                                        onChange={(e) => setDisclaimer(e.target.value)}
                                                        value={disclaimer}
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="treatment" className="col-sm-6 col-form-label">Select Treatment Name:</label>
                                                <div className="col-sm-9">
                                                    <select className="form-group row" id="treatment" name="treatment" onChange={handleChange} required>
                                                        <option value="">Select Treatment</option>
                                                        {payment.map(treatmentname => (
                                                            <option key={treatmentname._id} value={JSON.stringify({ id: treatmentname._id, amount: treatmentname.admin_amount })}>
                                                                {treatmentname.admin_treatment_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-sm-9 mt-2">
                                                    <textarea
                                                        className="form-control"
                                                        id="treatmentDescription"
                                                        name="treatmentDescription"
                                                        rows="4"
                                                        placeholder="Add treatment description"
                                                        onChange={(e) => setTreatmentDescription(e.target.value)}
                                                        value={treatmentDescription}
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary" type="submit" style={{
                                                        backgroundColor: '#9370DB',  
                                                        width:'100px',
                                                        color: 'white',
                                                        padding: '10px 20px',
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        fontSize: '15px',
                                                        fontWeight: 'bold',
                                                        marginTop: '10px'
                                                    }}>Submit</button>
                                            {loading && <div className="alert alert-success margin-top-10">Processing...</div>}
                                            {msg && <div className="alert alert-success margin-top-10">{msg}</div>}
                                        </form>
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

export default DescriptionAdd;
