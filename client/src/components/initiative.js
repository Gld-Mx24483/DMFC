//Initiative.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import Initiate from './initiate';
import './initiative.css';

const Initiative = () => {
  return (
    <div>
    <div className="about-us-main-container initiative-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top">
        <h1>Dalmach Initiative</h1>
        <p>Home / Programs / Dalmach Initiative</p>
      </div>
      </div>
      <div className='Initiatee'>
      <Initiate />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default Initiative;
