// about-us.js
import React from 'react';
import './about-us.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-image">
        <img src={require('../Media/Pictures/About-us.jpg')} alt="About Us" />
      </div>
      <div className="about-us-content">
        <h2>About Us</h2>
        <h3>Empowering Lives, <br />Igniting Hope</h3>
        <p>
        Dalmach Foundation is a Charity Foundation established specifically to help empower the life of the less privileged, 
        which include the fatherless and motherless children, from the age of 1-20 years, poor widows and also, to contribute in propagating the gospel. <br /> <br /> 
        It is a growing charity and non-profit organization that is dedicated towards going to the grass root, 
        empowering those who are in dire need of assistance and those who have been affected by insurmountable challenges and life detours. 
        </p>
        <div className="contact-us">
        <a href='#contact-us' className='contact-us-link'>
          Contact Us <i className='fas fa-arrow-right'></i>
        </a>
      </div>
      </div>
    </div>
  );
}

export default AboutUs;
