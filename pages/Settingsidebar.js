import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Topbar from './topbar';
import { useRouter } from 'next/router';


const SettingsSidebar = () => {
  const router = useRouter();

  return (
   
        <>
            <Head>
                <title>Settings sidebar</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
    <div className="settings-sidebar">
      <h2>Settings</h2>
      <ul>
        <li>
          <Link href="/settings/account">
            <a className={router.pathname == "/settings/account" ? "active" : ""}>Account Seetings</a>
          </Link>
        </li>
        <li>
          <Link href="/settings/profile">
            <a className={router.pathname == "/settings/profile" ? "active" : ""}>Profile Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/settings/general">
            <a className={router.pathname == "/settings/general" ? "active" : ""}>Notification Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/Appearences">
            <a className={router.pathname == "/Appearences" ? "active" : ""}>Appearence</a>
          </Link>
        </li>
        <li>
          <Link href="/settings/conferencing">
            <a className={router.pathname == "/settings/conferencing" ? "active" : ""}>Privacy and Security</a>
          </Link>
        </li>
        <li>
          <Link href="/settings/appearance">
            <a className={router.pathname == "/settings/appearance" ? "active" : ""}>Application Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/settings/security">
            <a className={router.pathname == "/settings/security" ? "active" : ""}>Help and Support</a>
          </Link>
        </li>
        <li>
          <Link href="/settings/password">
            <a className={router.pathname == "/settings/password" ? "active" : ""}>About</a>
          </Link>
        </li>
         
      </ul>
    </div>
    </>
  );
};

export default SettingsSidebar;
