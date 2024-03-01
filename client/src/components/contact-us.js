// about-us.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import Contact from './contact';
import './contact-us.css';

const ContactUs = () => {
  return (
    <div>
    <div className="about-us-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text">
        <h1>Contact Us</h1>
      </div>
      </div>
      <div className='contactt'>
      <Contact />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default ContactUs;
