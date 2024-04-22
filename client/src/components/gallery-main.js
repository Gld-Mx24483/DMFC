// gallery-main.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import GallSubb from './gallery-sub';
import './about-us-main.css';
import './gallery-main.css';

const GallMain = () => {
  return (
    <div>
    <div className="about-us-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top">
        <h1>Gallery</h1>
        <p>Home / Gallery</p>
      </div>
      </div>
      <div className='GallSubb'>
      <GallSubb />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default GallMain;
