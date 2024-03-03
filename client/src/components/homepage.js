// Homepage.js
import React from 'react';
import Navbar from './navbar';
import AboutUs from './about-us';
import BriefInfo from './brief-info';
import VisionMission from './vis-mis';
import Programs from './programs';
import Donate from './donate';
import Footer from './footer';
import './homepage.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Homepage = () => {
  return (
    <div>
    <div className="homepage-container">
      <BriefInfo />
      <Navbar />
      <div className="centered-text">
        <h1>Let’s Change the World with Humanity</h1>
        <p>We Transform, Inspire & Impact Lives Through Love!</p>
      </div>
      <div className="learn-more">
        <a href='./programs-main' className='learn-more-link'>
          Learn More <i className='fas fa-arrow-right'></i>
        </a>
      </div>
    </div>
    <div className='AboutUs'>
      <AboutUs />
    </div>
    <div className='VisionMission'>
    <VisionMission />
    </div>
    <div className='Programs'>
    <Programs />
    </div>
    <div className='Donate'>
    <Donate />
    </div>
    <div className='Footer'>
    <Footer />
    </div>
    </div>
  );
}

export default Homepage;
