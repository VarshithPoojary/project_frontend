import React from 'react';
import Header from './Header';
import Topbar from './topbar';
import Head from 'next/head';


const styles = {
  container: {
    width: '70%',
    margin: '0 auto',
    backgroundColor: '#F6F6F6',
    padding: '0',
    fontFamily: 'Arial, sans-serif',
  },
  brandSection: {
    marginTop:'100px',
    backgroundColor: ' grey',
    padding: '10px 40px',
  },
  logo: {
    width: '50%',
  },
  companyDetails: {
    float: 'right',
    textAlign: 'right',
    color: '#fff',
  },
  bodySection: {
    padding: '16px',
    border: '1px solid gray',
  },
  heading: {
    fontSize: '20px',
    marginBottom: '8px',
  },
  subHeading: {
    color: '#262626',
    marginBottom: '5px',
  },
  table: {
    backgroundColor: '#fff',
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #111',
  },
  tableCell: {
    verticalAlign: 'middle',
    textAlign: 'center',
    paddingTop: '8px',
    paddingBottom: '8px',
    border: '1px solid #dee2e6',
  },
  textRight: {
    textAlign: 'end',
  },
  w20: {
    width: '20%',
  },
  floatRight: {
    float: 'right',
  },
};

const Invoice = () => {
  return (
    <div>
            <Head>
                <title>Bill and Payments</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <Topbar/>
    <div style={styles.container}>
      <div style={styles.brandSection}>
        <div style={styles.logo}>
          <h1 style={{ color: '#fff' }}>HelathPlus</h1>
        </div>
        
      </div>

      <div style={styles.bodySection}>
        <div className="row">
          <div style={{ width: '50%' }}>
            <h2 style={styles.heading}>Invoice No.: 001</h2>
            <p style={styles.subHeading}>Tracking No. fabcart2025</p>
            <p style={styles.subHeading}>Order Date: 20-20-2021</p>
            <p style={styles.subHeading}>Email Address: customer@gfmail.com</p>
          </div>
          <div style={{ width: '50%' }}>
            <p style={styles.subHeading}>Full Name:</p>
            <p style={styles.subHeading}>Address:</p>
            <p style={styles.subHeading}>Phone Number:</p>
            <p style={styles.subHeading}>City,State,Pincode:</p>
          </div>
        </div>
      </div>

      <div style={styles.bodySection}>
        <h3 style={styles.heading}>Ordered Items</h3>
        <br />
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableCell}>Product</th>
              <th style={{ ...styles.tableCell, ...styles.w20 }}>Price</th>
              <th style={{ ...styles.tableCell, ...styles.w20 }}>Quantity</th>
              <th style={{ ...styles.tableCell, ...styles.w20 }}>Grandtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>Product Name</td>
              <td style={styles.tableCell}>10</td>
              <td style={styles.tableCell}>1</td>
              <td style={styles.tableCell}>10</td>
            </tr>
            <tr>
              <td colSpan="3" style={styles.tableCell}>Sub Total</td>
              <td style={styles.tableCell}>10.XX</td>
            </tr>
            <tr>
              <td colSpan="3" style={styles.tableCell}>Tax Total %1X</td>
              <td style={styles.tableCell}>2</td>
            </tr>
            <tr>
              <td colSpan="3" style={styles.tableCell}>Grand Total</td>
              <td style={styles.tableCell}>12.XX</td>
            </tr>
          </tbody>
        </table>
        <br />
        <h3 style={styles.heading}>Payment Status: Paid</h3>
        <h3 style={styles.heading}>Payment Mode: Cash on Delivery</h3>
      </div>

      </div>
    </div>
  );
};

export default Invoice;
