import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Settingsidebar from './Settingsidebar';
import Topbar from './topbar';

const Appearance = () => {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.style.setProperty('--background-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#000000');
    } else if (theme === 'dark') {
      document.documentElement.style.setProperty('--background-color', '#000000');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
    } else {
      // System default
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDarkScheme) {
        document.documentElement.style.setProperty('--background-color', '#000000');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
      } else {
        document.documentElement.style.setProperty('--background-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#000000');
      }
    }
  }, [theme]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Top Specialties</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>
      <Topbar />
      <Settingsidebar />

      <div className="appearance-container">
        <h2>Appearance</h2>
        <p>Manage settings for your booking appearance</p>
        <div className="appearance-theme-section">
          <h5>Theme</h5>
          <p>This only applies to your public booking pages</p>
          <div className="appearance-btn-group btn-group-toggle" data-toggle="buttons">
            <label className={`btn btn-light ${theme === 'system' ? 'active' : ''}`}>
              <input type="radio" name="theme" value="system" checked={theme === 'system'} onChange={handleThemeChange} />
              System default
            </label>
            <label className={`btn btn-light ${theme === 'light' ? 'active' : ''}`}>
              <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={handleThemeChange} />
              Light
            </label>
            <label className={`btn btn-light ${theme === 'dark' ? 'active' : ''}`}>
              <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={handleThemeChange} />
              Dark
            </label>
          </div>
        </div>
        <div className="custom-brand-colors mt-4">
          <h5>Custom brand colors</h5>
          <p>Customize your own brand color into your booking page.</p>
          <div className="form-group">
            <label htmlFor="light-theme-color">Brand Color (Light Theme)</label>
            <input type="text" className="form-control" id="light-theme-color" defaultValue="#292929" />
          </div>
          <div className="form-group">
            <label htmlFor="dark-theme-color">Brand Color (Dark Theme)</label>
            <input type="text" className="form-control" id="dark-theme-color" defaultValue="#fafafa" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .appearance-theme-section {
          margin-top: 50px;
        }
        .appearance-container {
          margin-top: -450px;
          margin-left: 500px;
        }
        .appearance-btn-group .btn {
          width: 150px;
          text-align: center;
        }
        .form-group label {
          margin-top: 10px;
        }
        .form-control {
          width: 200px;
        }
      `}</style>
      <style jsx global>{`
        :root {
          --background-color: #ffffff;
          --text-color: #000000;
        }
        body {
          background-color: var(--background-color);
          color: var(--text-color);
        }
      `}</style>
    </>
  );
};

export default Appearance;
