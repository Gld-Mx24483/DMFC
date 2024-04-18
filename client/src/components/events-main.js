// events.js
import React from 'react';
import Navbar from './navbar';
import EventU from './events-user';
import BriefInfo from './brief-info';
import Footer from './footer';
import './events-main.css';

const Eventss = () => {
  return (
    <div>
    <div className="about-us-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top">
        <h1>Events</h1>
        <p>Home / Events</p>
      </div>
      </div>
      <div className='Event-u'>
      <EventU />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default Eventss;
