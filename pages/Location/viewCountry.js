import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { DeleteCountryDetails,country_list } from '../../actions/locationAction';

const CountryView = () => {
    const [values, setValues] = useState({
        countrydetail: []
    });
    const [msg, setMsg] = useState('');
    const { countrydetail} = values;


    useEffect(() => {
        loadCountryDetails();
    }, []);

    const loadCountryDetails = () => {
        country_list().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setValues({ ...values, countrydetail: data.admin_country_list });
          }
      })
  }
    

    const handleEdit = (row) => {
        Router.push({
            pathname: '/Location/Editcountry',
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
                DeleteCountryDetails(query).then(data => {
                    loadCountryDetails();
                setMsg(`Country "${row.admin_country_name}" deleted successfully.`);
                setTimeout(() => {
                    setMsg('');
                }, 5000); 
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
                <title>Country List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* Add other meta tags as needed */}
            </Head>
            <Header/>
            <Topbar/>
            <div className="container-viewLocation">
                <div className="center-table" >
                 <center > <h2><b>COUNTRY LIST</b></h2></center>  
                    <Link href="/country/add">
                        <a className="btn btn-success mb-3">Add Country</a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <BootstrapTable data={countrydetail} search={true} >

                        <TableHeaderColumn dataField="sno" width="100" dataAlign="center" dataSort ><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_country_name" dataSort><b>Country Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_firstname" dataSort><b>Created Admin</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="actions" dataFormat={actionFormatter}><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
           
        </Fragment>
    );
};

export default CountryView;
