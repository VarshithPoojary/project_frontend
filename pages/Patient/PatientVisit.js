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
            color: '#333', // Professional dark grey color
            fontWeight: 'bold',
        },
        activeTab: {
            backgroundColor: '#2c3e50', // Professional navy blue color
            color: '#fff',
        },
        visitListCard: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '50%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            backgroundColor: '#fff',
            margin: '0 auto',
        },
        visitItem: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '10px 0',
            borderBottom: '1px solid #eee',
        },
        profileImage: {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#f0f0f0',
            marginRight: '15px',
        },
        visitDetails: {
            flexGrow: 1,
        },
        patientName: {
            margin: 0,
            fontSize: '16px',
            fontWeight: 'bold',
        },
        doctorName: {
            margin: 0,
            fontSize: '14px',
            color: '#888',
        },
        actions: {
            display: 'flex',
            alignItems: 'center',
        },
        actionIcon: {
            marginLeft: '10px',
            cursor: 'pointer',
            fontSize: '15px',
            color: '#2c3e50', // Professional navy blue color for icons
        },
        noDivider: {
            borderBottom: 'none',
        },
    };

    const patients = [
        { name: "Patient 1", doctor: "Dr. John Doe" },
        { name: "Patient 2", doctor: "Dr. Hannah" },
        { name: "Patient 3", doctor: "Dr. Nevaeh" },
        { name: "Patient 4", doctor: "Dr. Eliana" },
    ];

    return (
        <div>
            <Head>
                <title>Patient List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Topbar />
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
                <div style={styles.visitListCard}>
                    {patients.map((patient, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.visitItem,
                                ...(index === patients.length - 1 && styles.noDivider),
                            }}
                        >
                            <div style={styles.profileImage}></div>
                            <div style={styles.visitDetails}>
                                <p style={styles.patientName}>{patient.name}</p>
                                <p style={styles.doctorName}>Doctor: {patient.doctor}</p>
                            </div>
                            <div style={styles.actions}>
                                <i className="fas fa-user" style={styles.actionIcon}></i>
                                <i className="fas fa-pencil-alt" style={styles.actionIcon}></i>
                                <i className="fas fa-trash" style={styles.actionIcon}></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PatientVisit;
