import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
// Import or define add_banner_image function here
import Topbar from '../topbar';
import Header from '../Header';
import { add_banner } from '../../actions/bannerAction';


const BannerImageAdd = () => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const adminId = localStorage.getItem('id');
        try {
            const formData = new FormData();
            formData.append('admin_created_by_id', adminId);
            formData.append('bannerImg', image);
            
            // Call the add_banner_image function here with formData
             const res = await add_banner(formData);
            // Below is a placeholder response
           // const res = { msg: 'Banner image added successfully' };
            
            setLoading(false);
            if (res.msg) {
                setMsg(res.msg);
                setTimeout(() => setMsg(''), 1000);
            } else if (res.error) {
                setMsg('An error occurred. Please try again.');
            } else {
                setMsg('Added Successfully');
                setTimeout(() => {
                    setMsg('');
                    Router.push(`/dashboard`);
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            setMsg('An unexpected error occurred. Please try again.');
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    return (
        <div id="wrapper">
            <Head>
                <title>Add Banner Image</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Add Banner Image' />
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
                                    <div className="card-header">Add Banner Image here</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="banner_image" className="col-sm-3 col-form-label">Select Image</label>
                                                <div className="col-sm-9">
                                                    <input type="file" className="form-control-file" id="banner_image" name="banner_image" accept="image/*" onChange={handleImageChange} required />
                                                </div>
                                            </div>
                                            
                                            <button className="btn btn-primary" type="submit" style={{  background: "#3085d6", borderColor: "#0c9da8" }}>Submit</button>
                                            {loading ? (<div className="alert alert-success margin-top-10">Added successfully</div>) : null}
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

export default BannerImageAdd;
