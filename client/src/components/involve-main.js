// involve-main.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import Involve from './involve'
import './about-us-main.css';

const Involvee = () => {
  return (
    <div>
    <div className="about-us-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top">
        <h1>Get Involved</h1>
        <p>Home / Get Involved</p>
      </div>
      </div>
      <div className='Involve'>
      <Involve />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default Involvee;
