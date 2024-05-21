import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../Header';
import Topbar from '../topbar';

const BillAndPayments = () => {
    const [bills, setBills] = useState([
        { id: 1, patientName: 'John Doe', amount: 100, status: 'Paid' },
        { id: 2, patientName: 'Jane Doe', amount: 150, status: 'Pending' },
        { id: 3, patientName: 'Alice Smith', amount: 200, status: 'Paid' },
    ]); // Sample data for bills, you can replace this with your actual data

    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        billCard: {
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            border: '1px solid #e0e0e0',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        },
        cardHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
        },
        actionBtn: {
            marginLeft: '10px',
            padding: '8px 16px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'grey',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
        },
        statusBadge: {
            padding: '4px 8px',
            borderRadius: '3px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            backgroundColor: '#4caf50',
            color: '#fff',
        },
    };

    return (
        <div>
            <Head>
                <title>Bill and Payments</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <Topbar/>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1>Bill and Payments</h1>
                </div>
                {bills.map((bill) => (
                    <div key={bill.id} style={styles.billCard}>
                        <div style={styles.cardHeader}>
                            <h3>Patient Name: {bill.patientName}</h3>
                            <span style={styles.statusBadge}>{bill.status}</span>
                        </div>
                        <p>Amount: ${bill.amount}</p>
                        <div>
                            <button style={styles.actionBtn}>View Details</button>
                            <button style={styles.actionBtn}>Edit</button>
                            <button style={styles.actionBtn}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BillAndPayments;
