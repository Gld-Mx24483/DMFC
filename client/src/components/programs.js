// Programs.js
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping, faLightbulb, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import './programs.css';

const Programs = () => {
  return (
    <div className="programs-container">
      <h1 className="programs-heading">What We Do</h1>
      <div className="programs-row">
        <div className="program-card">
          <FontAwesomeIcon icon={faHandsHelping} className="icon" />
          <h2>Dalmach Outreach Program</h2>
          <p>
            Our outreach program is dedicated to reaching out to communities in need, providing assistance, support, and spreading love.
          </p>
          <div className="learn-more-prog">
        <a href='./outreach' className='learn-more-link-prog'>
          Learn More <i className='fas fa-arrow-right'></i>
        </a>
      </div>
        </div>
        <div className="program-card">
          <FontAwesomeIcon icon={faLightbulb} className="icon" />
          <h2>Dalmach Initiative Program</h2>
          <p>
            The initiative program focuses on innovative projects and initiatives that bring positive change and empowerment to individuals and communities.
          </p>
          <div className="learn-more-prog">
        <a href='./initiative' className='learn-more-link-prog'>
          Learn More <i className='fas fa-arrow-right'></i>
        </a>
      </div>
        </div>
        <div className="program-card">
          <FontAwesomeIcon icon={faVenusMars} className="icon" />
          <h2>Dalmach Feminine Program</h2>
          <p>
            Our feminine program aims to empower and uplift young women, providing them with the tools and support they need to thrive and become influential leaders.
          </p>
          <div className="learn-more-prog">
        <a href='./feminine' className='learn-more-link-prog r'>
          Learn More <i className='fas fa-arrow-right'></i>
        </a>
      </div>
        </div>
      </div>
    </div>
  );
}

export default Programs;
