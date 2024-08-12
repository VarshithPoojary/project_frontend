import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';
import Topbar from './topbar';
import { useRouter } from 'next/router';
import { appointment_list } from '../actions/appointmentAction';
import { admin_payment_list } from '../actions/paymentAction';

const PaymentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadAppointments();
    loadTreatments();
  }, []);

  const loadAppointments = () => {
    appointment_list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        const doneAppointments = data.appointment_list.filter(appointment => appointment.status === 'Done');
        setAppointments(doneAppointments);
      }
    });
  };

  const loadTreatments = () => {
    admin_payment_list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTreatments(data.admin_payment_list || []);
      }
    });
  };

  const getTreatmentName = (treatment_fees_id) => {
    const treatment = treatments.find(t => t._id === treatment_fees_id);
    return treatment ? treatment.admin_treatment_name : 'Unknown Treatment';
  };

  const getStatusStyles = (status) => {
    return {
      color: status === 'Pending' ? 'red' : 'green',
      fontWeight: 'bold'
    };
  };

  const handleViewInvoice = (appointmentId) => {
    router.push(`/Invoice?_id=${appointmentId}`);
  };

  return (
    <>
      <Head>
        <title>Payment History</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Topbar />
      <div className="payment-history-container">
        <center><h2 style={{ marginTop: '100px' }}><b>PAYMENT HISTORY</b></h2></center>
        <div className="payment-cards-container">
          {appointments.map((appointment, index) => (
            <div key={index} className="payment-card">
              <div className="payment-card-content">
                <img
                  src={appointment.patient_profile_img || '/default_profile.png'}
                  alt="Profile"
                  className="profile-image"
                />
                <h5 className="patient-name">{appointment.patient_name}</h5>
                {appointment.amount_details && appointment.amount_details[0] && (
                  <>
                    <p className="appointment-detail">{appointment.doctor_name}</p>
                    <p className="appointment-detail">{getTreatmentName(appointment.amount_details[0].treatment_fees_id)}</p>
                    <p className="appointment-detail" style={getStatusStyles(appointment.amount_details[0].payment_status)}>
                      {appointment.amount_details[0].payment_status}
                    </p>
                    <button
                      className="view-button"
                      onClick={() => handleViewInvoice(appointment._id)}
                    >
                      View Invoice
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .payment-cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
          justify-content: center;
          margin-top: 20px;
          margin-left: 130px;
        }
        .payment-cards-container {
          display: flex;
          margin-left:130px;

          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          margin-top: 20px;
        }
        .payment-card {
         background: #f2f2f3;
           border-radius: 10px;
        border: 1px solid #ddd;
          width: 180px;
          display: flex;
          justify-content: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
        }
        .payment-card-content {
          background-color: #f2f2f3;
          padding: 20px;
          width: 100%;
          border-radius: 10px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .payment-card-content:hover {
          transform: scale(1.05);
        }
        .profile-image {
          width: 80px;
          height: 80px;
          border-radius: 10%;
          margin-bottom: 10px;
          object-fit: cover;
        }
        .patient-name {
          margin-bottom: 10px;
          font-size: 18px;
          color: #000;
        }
        .appointment-detail {
          margin-bottom: 5px;
          font-size: 14px;
        }
        .view-button {
          padding: 8px 16px;
          background-color: #9e6ad7;
          color: white;
          border: none;
          border-radius: 5px;
          margin-top: 10px;
          cursor: pointer;
        }
        .view-button:hover {
          background-color: #6a5acd;
        }
      `}</style>
    </>
  );
};

export default PaymentHistory;
