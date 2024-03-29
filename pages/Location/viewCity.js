import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const CityView = () => {
    const [cityDetail, setCityDetail] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        // Load city details
        loadCityDetails();
    }, []);

    const loadCityDetails = () => {
        // Simulate fetching city details (replace with actual API call)
        const dummyCityData = [
            { id: 1,  cityName: 'Udupi', stateName: 'Karnataka', countryName: 'India' },
            { id: 2,  cityName: 'Los Angeles', stateName: 'California', countryName: 'United States' },
            { id: 3, cityName: 'Chicago', stateName: 'Illinois', countryName: 'United States' },
            // Add more cities as needed
        ];
        // Add serial number to each item in the array
        const citiesWithSerial = dummyCityData.map((city, index) => ({
            ...city,
            serialNumber: index + 1
        }));
        setCityDetail(citiesWithSerial);
    }

    const handleEdit = (row) => {
        // Implement edit functionality
    }

    const handleDelete = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this city!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete city logic here
                setMsg(`City "${row.cityName}" deleted successfully.`);
                // Reload city details after deletion
                loadCityDetails();
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
                <title>City List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* Add other meta tags as needed */}
            </Head>
            <div className="container">
                <div className="center-table">
                    <center><h2><b>CITY LIST</b></h2></center>
                    <Link href="/city/add">
                        <a className="btn btn-success mb-3">Add City</a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <BootstrapTable data={cityDetail} search={true}>
                        <TableHeaderColumn dataField="serialNumber" width="100" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="id" isKey hidden>ID</TableHeaderColumn>
                        
                        <TableHeaderColumn dataField="cityName" dataSort><b>City Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="stateName" dataSort><b>State Name</b></TableHeaderColumn>
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

export default CityView;
