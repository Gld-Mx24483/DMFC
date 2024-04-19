// team-main.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import TeamMain from './team';
import './team-main.css';

const TMain = () => {
  return (
    <div>
    <div className="about-us-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top">
        <h1>Be a Member</h1>
        <p>Home / Be a Member</p>
      </div>
      </div>
      <div className='Team-a'>
      <TeamMain />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default TMain;
