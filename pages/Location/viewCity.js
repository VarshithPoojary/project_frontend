import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { city_list , DeleteCityDetails } from '../../actions/locationAction';

const CityView = () => {
    const [cityDetail, setCityDetail] = useState([]);
    const [values, setValues] = useState({
        citydetail: []
    });

    const [msg, setMsg] = useState('')
    const { citydetail} = values;
    useEffect(() => {
        loadCityDetails();
    }, []);

    const loadCityDetails = () => {
        city_list().then(data => {
              //alert(JSON.stringify(data));
            if (data.error) {
                console.log(data.error);
            } else {
                //alert(data.caretakerLists);
                // console.log(data.caretakerDetailLists);
                setValues({ ...values, citydetail: data.city_list });
            }
        })
    }

    const handleEdit = (row) => {
        Router.push({
            pathname: '/Location/Editcity',
            query: {
                _id: row._id,

            }
        })
    }

    const handleDelete = (row) => {
        let created_by_id = localStorage.getItem('id');
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
                let query = { "_id": row._id, "created_by_id": created_by_id }
                DeleteCityDetails(query).then(data => {
                    loadCityDetails();
                    setMsg(`State "${row.city_name}" deleted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 2000); 
                });
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
            <Header/>
            <Topbar/>
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>CITY LIST</b></h2></center>
                    <Link href="/Addcity">
                        <a className="btn btn-success mb-3">Add City</a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <BootstrapTable data={citydetail} search={true}>
                        <TableHeaderColumn dataField="sno" width="100" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                        
                        <TableHeaderColumn dataField="city_name" dataSort><b>City Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="state_name" dataSort><b>State Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="country_name" dataSort><b>Country Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_pincode" dataSort><b>Pincode</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_firstname" dataSort><b>Creadted Admin</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="actions" dataFormat={actionFormatter}><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </Fragment>
    );
};

export default CityView;
