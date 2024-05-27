import React from 'react';


const Invoice = () => {
  return (
    <div className="container" style={{ maxWidth: '800px', marginTop: '90px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', fontFamily: "'Arial', sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ textAlign: 'left', }}>
          <h3 style={{ }}>HealthCare  Plus</h3>
          <p style={{ marginTop: '5px' }}>Invoice Number: 2677</p>
          <p style={{ margin: 0 }}>Date: 02/02/2022</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'right', margin: 0,color:'black' }}>INVOICE</h2>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ textAlign: 'left' }}>
          <h6 style={{ margin: 0 }}>Bill from:</h6>
          <p style={{ margin: 0 }}>Company Name</p>
          <p style={{ margin: 0 }}>Street Address, Zip Code</p>
          <p style={{ margin: 0 }}>Phone Number</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h6 style={{ margin: 0 }}>Bill to:</h6>
          <p style={{ margin: 0 }}>Customer Name</p>
          <p style={{ margin: 0 }}>Street Address, Zip Code</p>
          <p style={{ margin: 0 }}>Phone Number</p>
        </div>
      </div>
      <table className="table table-bordered" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', textAlign: 'left' }}>Item</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Quantity</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Rate</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Tax</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px', textAlign: 'left' }}>Ambulance Service</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>01</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>$1200.00</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>0.00</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>$1200.00</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', textAlign: 'left' }}>Veneers</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>04</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>$700.00</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>0.00</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>$2800.00</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', textAlign: 'left' }}>Cognitive Behavioral Therapy</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>03</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>$200.00</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>0.00</td>
            <td style={{ padding: '8px', textAlign: 'left' }}>$600.00</td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ margin: 0 }}>Terms & Conditions:</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ margin: 0 }}>Subtotal: $4600.00</p>
        <p style={{ margin: 0 }}>Discount: $0.00</p>
        <p style={{ margin: 0 }}>Tax: $0.00</p>
        <p style={{ margin: 0 }}>Paid: $0.00</p>
        <p style={{ fontWeight: 'bold', fontSize: '24px', margin: 0,color:'black' }}>Total: $4600.00</p>
      </div>
    </div>
  );
};

export default Invoice;
