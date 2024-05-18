import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../Header';
import Topbar from '../topbar';

const PatientVisit = () => {
    const [activeTab, setActiveTab] = useState('today'); // State to manage active tab

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        header: {
            textAlign: 'center',
            marginBottom: '50px',
        },
        tabs: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
        },
        tab: {
            cursor: 'pointer',
            padding: '10px 20px',
            borderRadius: '5px',
            margin: '0 10px',
            backgroundColor: '#f0f0f0',
            transition: 'background-color 0.3s ease',
        },
        activeTab: {
           
            backgroundColor: 'grey',
            color: '#fff',
        },
        visitCard: {
            width: '30%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#fff',
            marginLeft:'250px',
        },
        actions: {
            marginTop: '10px',
            textAlign: 'right',
        },
        actionBtn: {
            marginLeft: '5px',
            padding: '5px 10px',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'grey',
            color: '#fff',
        },
    };

    return (
        <div>
        <Head>
                <title>Patient List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <Topbar/>
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>Patient Visit</h1>
            </div>
            <div style={styles.tabs}>
                <div
                    style={{ ...styles.tab, ...(activeTab === 'today' && styles.activeTab) }}
                    onClick={() => handleTabClick('today')}
                >
                    Today's Visits
                </div>
                <div
                    style={{ ...styles.tab, ...(activeTab === 'week' && styles.activeTab) }}
                    onClick={() => handleTabClick('week')}
                >
                    This Week's Visits
                </div>
                <div
                    style={{ ...styles.tab, ...(activeTab === 'month' && styles.activeTab) }}
                    onClick={() => handleTabClick('month')}
                >
                    This Month's Visits
                </div>
            </div>
            <div style={styles.visitCard}>
                <h3>Patient Name</h3>
                <p>Visit Date: DD/MM/YYYY</p>
                <p>Doctor: Dr. XYZ</p>
                <div style={styles.actions}>
                    <button style={styles.actionBtn}>View Details</button>
                    <button style={styles.actionBtn}>Edit</button>
                    <button style={styles.actionBtn}>Delete</button>
                </div>
            </div>
           
        </div>
        </div>
    );
};

export default PatientVisit;
