import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const CountryView = () => {
    const [countryDetail, setCountryDetail] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        // Load country details
        loadCountryDetails();
    }, []);

    const loadCountryDetails = () => {
        // Simulate fetching country details (replace with actual API call)
        const dummyCountryData = [
            // { id: 1, countryCode: 'IN', countryName: 'India' },
            // { id: 2, countryCode: 'CA', countryName: 'Canada' },
            // { id: 3, countryCode: 'MX', countryName: 'Mexico' },
            // Add more countries as needed
        ];
        // Add serial number to each item in the array
        const countriesWithSerial = dummyCountryData.map((country, index) => ({
            ...country,
            serialNumber: index + 1
        }));
        setCountryDetail(countriesWithSerial);
    }

    const handleEdit = (row) => {
        // Implement edit functionality
    }

    const handleDelete = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this country!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete country logic here
                setMsg(`Country "${row.countryName}" deleted successfully.`);
                // Reload country details after deletion
                loadCountryDetails();
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
                <title>Country List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* Add other meta tags as needed */}
            </Head>
            <div className="container">
                <div className="center-table">
                 <center > <h2><b>COUNTRY LIST</b></h2></center>  
                    <Link href="/country/add">
                        <a className="btn btn-success mb-3">Add Country</a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <BootstrapTable data={countryDetail} search={true}>

                        <TableHeaderColumn dataField="serialNumber" width="100" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="id" isKey hidden>ID</TableHeaderColumn>
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

export default CountryView;
