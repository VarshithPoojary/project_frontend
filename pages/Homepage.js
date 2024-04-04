import React from 'react';
import "../styles/Home.module.css"

// Define a functional component for the homepage
function HomePage() {
  return (
    
    <div  className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '70px', fontFamily: 'Arial, sans-serif' }}>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <header style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h1>Welcome to HealthCare Plus</h1>
      <p>Your trusted partner for healthcare services</p>
    </header>
    <section id="services" style={{ marginBottom: '40px' }}>
      <h2>Our Services</h2>
      <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h3>Primary Care</h3>
        <p>Comprehensive primary care for all ages.</p>
      </div>
      <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h3>Specialty Care</h3>
        <p>Specialized care for complex medical conditions.</p>
      </div>
      <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h3>Emergency Care</h3>
        <p>24/7 emergency medical services.</p>
      </div>
    </section>
    <section id="about" style={{ marginBottom: '40px' }}>
      <h2>About Us</h2>
      <p>We are dedicated to providing high-quality healthcare services to our community. Our team of experienced healthcare professionals is committed to your well-being.</p>
    </section>
    <section   id="contact" style={{ marginBottom: '40px' }}>
        <h2>Contact Us</h2>
        <p>Get in touch with us to schedule an appointment or inquire about our services.</p>
        <p>Phone: 123-456-7890</p>
        <p>Email: info@healthcareplus.com</p>
      </section>
  
  </div>
    
  );
}

export default HomePage;
