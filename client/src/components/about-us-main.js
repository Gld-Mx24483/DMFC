// about-us.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import AboutUs from './about-us';
import Footer from './footer';
import Ceo from './ceo';
import './about-us-main.css';

const AboutUsMain = () => {
  return (
    <div>
    <div className="about-us-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text">
        <h1>About Us</h1>
      </div>
      </div>
      <div className='about-uss'>
      <AboutUs />
      </div>
      <div className='ceo'>
      <Ceo />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default AboutUsMain;
