import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Topbar from '../topbar';
import Header from '../Header';
import { banner_list_by_id, banner_list_update } from '../../actions/bannerAction';

const EditBanner = () => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [image, setImage] = useState(null);
    const [bannerDetails, setBannerDetails] = useState({
        banner_title: ''
    });

    const router = useRouter();
    const { _id } = router.query;

    useEffect(() => {
        if (_id) {
            loadBannerDetails(_id);
        }
    }, [_id]);

    const loadBannerDetails = (id) => {
        banner_list_by_id(id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBannerDetails(data);
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const adminId = localStorage.getItem('id');
        try {
            const formData = new FormData();
            formData.append('admin_updated_by_id', adminId);
            formData.append('_id', _id);
            formData.append('banner_title', bannerDetails.banner_title);
            if (image) {
                formData.append('bannerImg', image);
            }

            const res = await banner_list_update(formData);
            
            setLoading(false);
            if (res.msg) {
                setMsg(res.msg);
                setTimeout(() => setMsg(''), 1000);
            } else if (res.error) {
                setMsg('An error occurred. Please try again.');
            } else {
                setMsg('Updated Successfully');
                setTimeout(() => {
                    setMsg('');
                    Router.push(`/AdminDemo/viewBannerList`);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBannerDetails({ ...bannerDetails, [name]: value });
    };

    return (
        <div id="wrapper">
            <Head>
                <title>Edit Banner</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Edit Banner' />
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
                                    <div className="card-header">Edit Banner</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="banner_image" className="col-sm-3 col-form-label">Select Image</label>
                                                <div className="col-sm-9">
                                                    <input 
                                                        type="file" 
                                                        className="form-control-file" 
                                                        id="banner_image" 
                                                        name="banner_image" 
                                                        accept="image/*" 
                                                        onChange={handleImageChange} 
                                                    />
                                                </div>
                                            </div>
                                            
                                            <button className="btn btn-primary" type="submit" style={{ background: "#3085d6", borderColor: "#0c9da8" }}>Submit</button>
                                            {loading ? (<div className="alert alert-success margin-top-10">Updating...</div>) : null}
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

export default EditBanner;
