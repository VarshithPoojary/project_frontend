import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';



const StateView = () => {
    const [stateDetail, setStateDetail] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        // Load state details
        loadStateDetails();
    }, []);

    const loadStateDetails = () => {
        // Simulate fetching state details (replace with actual API call)
        const dummyStateData = [
            { id: 1,  stateName: 'Karnataka', countryCode: 'KA', countryName: 'India' },
            { id: 2, stateName: 'Texas', countryCode: 'US', countryName: 'United States' },
            { id: 3,  stateName: 'New York', countryCode: 'US', countryName: 'United States' },
            // Add more states as needed
        ];
        // Add serial number to each item in the array
        const statesWithSerial = dummyStateData.map((state, index) => ({
            ...state,
            serialNumber: index + 1
        }));
        setStateDetail(statesWithSerial);
    }

    const handleEdit = (row) => {
        // Implement edit functionality
    }

    const handleDelete = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this state!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete state logic here
                setMsg(`State "${row.stateName}" deleted successfully.`);
                // Reload state details after deletion
                loadStateDetails();
            }
        });
    }

    const actionFormatter = (cell, row) => {
        return (
            <div>
                <button className="icons-edit" onClick={() => handleEdit(row)}>
                    <FiEdit style={{ fill: '#ff0000' }} />
                </button>
                <button className="icons-delete" onClick={() => handleDelete(row)}>
                    <FiTrash2 />
                </button>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>State List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* Add other meta tags as needed */}
            </Head>
            <div className="container">
                <div className="center-table">
                    <center><h2><b>STATE LIST</b></h2></center>
                    <Link href="/state/add">
                        <a className="btn btn-success mb-3">Add State</a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <BootstrapTable data={stateDetail} search={true}>
                        <TableHeaderColumn dataField="serialNumber" width="100" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="id" isKey hidden>ID</TableHeaderColumn>
                       
                        <TableHeaderColumn dataField="stateName" dataSort><b>State Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="countryCode" dataSort><b>Country Code</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="countryName" dataSort><b>Country Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="actions" dataFormat={actionFormatter}><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .center-table {
                    width: 80%;
                }
            `}</style>  
        </Fragment>
    );
};

export default StateView;
