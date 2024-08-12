import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Topbar from '../topbar';
import Header from '../Header';
import { specialistType_update, specialist_details_by_id } from '../../actions/SpeciaListTypeAction';

const SpecialistTypeEdit = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [values, setValues] = useState({
        admin_specialist_type_name: '',
        admin_color_code: '',
        admin_priority: '',
        admin_icon: '',
        admin_icon_preview: '', 
    });

    const { admin_specialist_type_name, admin_color_code, admin_priority, admin_icon } = values;

    useEffect(() => {
        const specialist_id = localStorage.getItem('id');
        if (!specialist_id) {
            Router.push('/login');
        } else {
            loadSpecialistDetails();
        }
    }, [router.query._id]);

    const loadSpecialistDetails = () => {
        specialist_details_by_id(router.query._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    const specialistData = data.admin_specialist_type_list[0];
                    setValues({
                        ...values,
                        admin_specialist_type_name: specialistData.specialist_type_name,
                        admin_color_code: specialistData.admin_color_code,
                        admin_priority: specialistData.admin_priority,
                        admin_icon: specialistData.admin_icon,
                        admin_icon_preview: specialistData.admin_icon, 
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setValues({ ...values, error: 'Error: Network request failed', loading: false });
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const admin_updated_by_id = localStorage.getItem('id');
        const _id = router.query._id;
        const formData = new FormData();
        formData.append('_id', _id);
        formData.append('admin_specialist_type_name', admin_specialist_type_name);
        formData.append('admin_color_code', admin_color_code);
        formData.append('admin_priority', admin_priority);
        if (admin_icon) {
            formData.append('admin_icon', admin_icon);
        }
        formData.append('admin_updated_by_id', admin_updated_by_id);

        try {
            const response = await specialistType_update(formData);
            setLoading(false);
            if (response.error) {
                setValues({ ...values, error: response.error });
            } else {
                setMsg('Edited Successfully');
                setTimeout(() => {
                    setMsg('');
                    Router.push(`/SpecialistPage`);
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            setValues({ ...values, error: 'Error updating', loading: false });
        }
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const handleIconChange = (e) => {
        const selectedIcon = e.target.files[0];
        setValues({ ...values, admin_icon: selectedIcon, admin_icon_preview: URL.createObjectURL(selectedIcon) });
    };

    const Cancel = () => {
        const specialist_id = localStorage.getItem("id");
        loadUserDetails(specialist_id);
    };

    return (
        <div id="wrapper">
            <Head>
                <title>Edit Specialist Type</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Edit Specialist Type' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                                    <div className="card-header" style={{background: "#D3C8F1" ,color:"black"}}>Edit Specialist Type</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="admin_specialist_type_name" className="col-sm-3 col-form-label">Specialist Type Name</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="admin_specialist_type_name" name="admin_specialist_type_name" value={admin_specialist_type_name} onChange={handleChange('admin_specialist_type_name')} required />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="admin_color_code" className="col-sm-3 col-form-label">Color Code</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="admin_color_code" name="admin_color_code" value={admin_color_code} onChange={handleChange('admin_color_code')} required />
                                                    <small className="text-muted">Enter a text representing the color code</small>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="admin_priority" className="col-sm-3 col-form-label">Priority</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="admin_priority" name="admin_priority" value={admin_priority} onChange={handleChange('admin_priority')} required />
                                                    <small className="text-muted">Enter a text representing the priority</small>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="admin_icon" className="col-sm-3 col-form-label">Icon</label>
                                                <div className="col-sm-9">
                                                    <input type="file" className="form-control-file" id="admin_icon" name="admin_icon" onChange={handleIconChange} accept="image/*" />
                                                    {values.admin_icon_preview && (
                                                        <img src={values.admin_icon_preview} alt="Icon Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-sm-4"></div>
                                                <div className="col-sm-8">
                                                    <button className="btn btn-primary mr-3" type="submit" disabled={loading} style={{ backgroundColor: '#9370DB' }}>Update</button>
                                                    <button className="btn btn-secondary" type="button" onClick={Cancel}>Cancel</button>
                                                </div>
                                            </div>
                                            {loading && (<div className="alert alert-success margin-top-10">Updating...</div>)}
                                            {msg && (<div className="alert alert-success margin-top-10">{msg}</div>)}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialistTypeEdit;
