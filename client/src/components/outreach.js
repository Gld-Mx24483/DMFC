//Outreach.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import Oreach from './oreach';
import './outreach.css';

const Outreach = () => {
  return (
    <div>
    <div className="about-us-main-container outreach-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text">
        <h1>Dalmach Outreach</h1>
      </div>
      </div>
      <div className='O-reach'>
      <Oreach />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default Outreach;
