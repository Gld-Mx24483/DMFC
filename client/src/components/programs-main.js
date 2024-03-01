// about-us.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Programs from './programs';
import Footer from './footer';
import './programs-main.css';

const ProgramsMain = () => {
  return (
    <div>
    <div className="about-us-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text">
        <h1>Programs</h1>
      </div>
      </div>
      <div className='Programs'>
        <Programs />
        </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default ProgramsMain;
