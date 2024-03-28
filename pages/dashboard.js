import Topbar from './topbar';
import Link from 'next/link';
import Sidebar from './sidebar';
import Head  from 'next/head';
import Content from './content';
import Header from './Header';
import React, { useEffect, useState } from 'react';





const Signup = () => {
    
    return (
        <div id="wrapper">

            <Head>
            <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
<meta name="title" content='Dashboard' />
            </Head>
        

        <Topbar/>
        <Header/>
        <Content/>
        </div> 
    );
};

export default Signup;