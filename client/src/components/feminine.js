//Feminine.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import Fem from './fem';
import './feminine.css';

const Feminine = () => {
  return (
    <div>
    <div className="about-us-main-container feminine-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top">
        <h1>Dalmach Feminine</h1>
        <p>Home /Programs / Dalmach Feminine</p>
      </div>
      </div>
      <div className='Femm'>
      <Fem />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default Feminine;
