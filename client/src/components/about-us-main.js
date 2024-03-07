// about-us.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import AboutUs from './about-us';
import Footer from './footer';
import Ceo from './ceo';
import VisionMission from './vis-mis';
import './about-us-main.css';

const AboutUsMain = () => {
  return (
    <div>
    <div className="about-us-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top">
        <h1>About Us</h1>
        <p>Home / About Us</p>
      </div>
      </div>
      <div className='about-uss'>
      <AboutUs />
      </div>
      <div className='VisionMission'>
    <VisionMission />
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
