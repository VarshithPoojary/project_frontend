import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Topbar from './topbar';
import Head from 'next/head';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { appointment_details_by_id, appointment_payment_update } from '../actions/appointmentAction';

const Invoice = () => {
  const router = useRouter();
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    generateInvoiceNumber();
    if (router.query._id) {
      loadAppointmentDetails();
    }
  }, [router.query._id]);

  const generateInvoiceNumber = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    setInvoiceNumber(randomNumber.toString());
  };

  const loadAppointmentDetails = () => {
    appointment_details_by_id(router.query._id)
      .then((appointment) => {
        if (appointment.error) {
          console.log(appointment.error);
        } else {
          const doneAppointments = appointment.appointment_list.filter((app) => app.status === 'Done');
          if (doneAppointments.length > 0) {
            setAppointmentDate(doneAppointments[0].appointment_date);
            setDisclaimer(doneAppointments[0].disclaimer);
          }
          setAppointmentDetails(appointment.appointment_list);

          // Check if any of the done appointments have pending payments
          const hasPendingPayment = doneAppointments.some((app) =>
            app.amount_details.some((detail) => detail.payment_status === 'Pending')
          );
          setIsPaid(!hasPendingPayment); // If there's no pending payment, set isPaid to true
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = '/images/title_logo.png';
    img.onload = () => {
      addPage(doc, img, appointmentDetails, 1);
      doc.addPage();
      addPage(doc, img, appointmentDetails, 2);
      doc.save('invoice.pdf');
    };
  };

  const addPage = (doc, img, appointmentDetails, pageNumber) => {
    doc.setDrawColor(0);
    doc.setLineWidth(0.7);
    doc.rect(10, 10, 190, 277);
    doc.addImage(img, 'PNG', 20, 20, 20, 20);
    doc.setFontSize(20);
    doc.setTextColor("#1464af");
    doc.setFont("helvetica", "bold");
    doc.text('HealthCare Connect System', 60, 30);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    if (pageNumber === 1) {
      doc.text('Invoice Number:', 14, 60);
      doc.text(invoiceNumber, 50, 60);
      doc.text('Date:', 14, 70);
      doc.text(appointmentDate, 50, 70);
      doc.text('Treatment Fees', 90, 120);
      const treatmentFeesColumns = ['S.NO.', 'Treatment Name', 'Price'];
      const treatmentFeesRows = appointmentDetails.map((appointment, index) => {
        return appointment.amount_details.map((detail, i) => [
          index + 1,
          appointment.treatmentName || 'N/A',
          parseFloat(detail.amount).toFixed(2)
        ]);
      });
      doc.autoTable({
        head: [treatmentFeesColumns],
        body: treatmentFeesRows.flat(),
        startY: 130,
        margin: { top: 10 }
      });
      const total = calculateTotalAmount();
      doc.text(`Total Amount: ₹ ${total.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
      doc.setFontSize(14);
      doc.text('Treatment Disclaimer', 85, doc.autoTable.previous.finalY + 30);
      doc.setFontSize(12);
      const disclaimerColumns = ['Description'];
      const disclaimerRows = [[disclaimer || 'N/A']];
      doc.autoTable({
        head: [disclaimerColumns],
        body: disclaimerRows,
        startY: doc.autoTable.previous.finalY + 40,
        margin: { top: 10 }
      });
    } else if (pageNumber === 2) {
      doc.text('Treatment Description', 90, 98);
      const treatmentMedicinesColumns = ['Description'];
      const treatmentMedicinesRows = appointmentDetails.map((appointment) => {
        return appointment.amount_details.map((detail) => [
          detail.description || 'N/A'
        ]);
      });
      doc.autoTable({
        head: [treatmentMedicinesColumns],
        body: treatmentMedicinesRows.flat(),
        startY: 110,
        margin: { top: 10 }
      });
    }
  };

  const handleSendInvoice = () => {
    alert('Invoice sent successfully!');
  };

  const handlePaid = () => {
    const appointmentId = router.query._id;
    appointment_payment_update(appointmentId)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setIsPaid(true);
          loadAppointmentDetails();
        }
      })
      .catch((err) => console.log(err));
  };

  const calculateTotalAmount = () => {
    return appointmentDetails.reduce((total, appointment) => {
      const amountDetails = appointment.amount_details || [];
      const appointmentTotal = amountDetails.reduce((sum, amountDetail) => {
        return sum + parseFloat(amountDetail.amount);
      }, 0);
      return total + appointmentTotal;
    }, 0);
  };

  return (
    <>
      <Head>
        <title>Invoice</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>
      <Topbar />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginTop: '100px' }}>
        <button onClick={handlePrint} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}>Print Preview</button>
        <button onClick={handleDownloadPDF} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}>Download PDF</button>
        <button onClick={handleSendInvoice} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', marginRight: '20px' }}>Send Invoice</button>
      </div>
      <div className="container" style={{ maxWidth: '800px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', fontFamily: "'Arial', sans-serif", backgroundColor: 'white', marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'normal' }}>HealthCare Connect System</h3>
            <p style={{ marginTop: '5px' }}>Invoice Number: {invoiceNumber}</p>
            <p>Date: {appointmentDate}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'normal', textAlign: 'right', margin: 0, color: 'black' }}>INVOICE</h2>
          </div>
        </div>
        {appointmentDetails.length > 0 ? (
          <>
            <div>
              <h4 style={{ fontSize: '14px', textDecoration: 'underline' }}>Treatment Fees</h4>
              <table className="table table-bordered" style={{ width: '100%', marginBottom: '20px' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px', textAlign: 'left' }}>S.NO.</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Treatment Name</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentDetails.map((appointment, index) => (
                    appointment.amount_details.map((detail, i) => (
                      <tr key={`${index}-${i}`}>
                        <td style={{ padding: '8px', textAlign: 'left' }}>{index + 1}</td>
                        <td style={{ padding: '8px', textAlign: 'left' }}>{appointment.treatmentName || 'N/A'}</td>
                        <td style={{ padding: '8px', textAlign: 'left' }}>{parseFloat(detail.amount).toFixed(2)}</td>
                      </tr>
                    ))
                  ))}
                  <tr>
                    <td colSpan="2" style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Total Amount:</td>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{calculateTotalAmount().toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              {isPaid ? (
                <p style={{ color: 'green', fontWeight: 'bold', marginLeft: '700px' }}>Paid</p>
              ) : (
                <button 
                  onClick={handlePaid} 
                  style={{ padding: '8px 16px', backgroundColor: '#d3d3d3', color: 'black', border: 'none', borderRadius: '5px', marginLeft: '620px' }}
                >
                  Mark as Paid
                </button>
              )}
              <h4 style={{ fontSize: '14px', textDecoration: 'underline' }}>Treatment Disclaimer</h4>
              <table className="table table-bordered" style={{ width: '100%', marginBottom: '20px' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Disclaimer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'pre-line' }}>{disclaimer || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ pageBreakAfter: 'always' }}></div> {/* Page break after first page */}
            <div>
              <h4 style={{ fontSize: '14px', textDecoration: 'underline' }}>Treatment Description</h4>
              <table className="table table-bordered" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentDetails.map((appointment) => (
                    appointment.amount_details.map((detail, i) => (
                      <tr key={i}>
                        <td style={{ padding: '8px', textAlign: 'left', whiteSpace: 'pre-line' }}>{detail.description || 'N/A'}</td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>No appointment details found.</p>
        )}
      </div>
    </>
  );
};

export default Invoice;