import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { DeleteCountryDetails,country_list } from '../../actions/countryAction';

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
        let admin_deleted_by_id = localStorage.getItem('id');
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
                let query = { "_id": row._id, "admin_deleted_by_id": admin_deleted_by_id }
                DeleteCountryDetails(query).then(data => {
                    loadCountryDetails();
                setMsg(`Country "${row.admin_country_name}" deleted successfully.`);
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
                <button className="icons-edit"  style={{ backgroundColor: "#3085d6", borderColor: "#3085d6",width:"50px"}}  onClick={() => handleEdit(row)}>
                    <FiEdit  />
                </button>
                <button className="icons-delete"  style={{ backgroundColor: "rgb(225, 76, 76)", borderColor: "rgb(225, 76, 76)",width:"50px",marginLeft:"10%" }} onClick={() => handleDelete(row)}>
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
                <meta name="title" content='Country List' />
                <link rel="icon" href="/images/title_logo.png" />
   
            </Head>
            <Header/>
            <Topbar/>
            <div className="container-viewLocation">
                <div className="center-table" >
                 <center > <h2><b>COUNTRY LIST</b></h2></center>  
                    <Link href="/Location/Addcountry">
                        <a className="btn btn-success mb-3"  style={{  background: "#3085d6",borderColor: "#0c9da8", width:'20%' }}>Add Country</a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <BootstrapTable data={countrydetail} search={true} >

                        <TableHeaderColumn dataField="sno"  width="100" dataAlign="center" dataSort ><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id"  isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_country_name" dataAlign="center" dataSort><b>Country Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_firstname" dataAlign="center" dataSort><b>Created Admin</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="actions" dataAlign="center" dataFormat={actionFormatter}  ><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </Fragment>
    );
};

export default CountryView;
