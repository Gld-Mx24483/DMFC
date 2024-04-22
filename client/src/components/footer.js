// Footer.js
import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {

  const handleEmailClick = () => {
    window.open('mailto:dalmachfoundation@gmail.com', '_blank');
  };

  const handleLinkedLnClick = () => {
    window.open('https://www.linkedin.com/in/adedapo-toki-b3a277287', '_blank');
  };

  return (
    <div className="footer-container">
      <div className="footer-column">
        <div className="logo-container">
          <img src={require('../Media/Pictures/logo.png')} alt="Logo" className="footer-logo" />
          <h4>DALMACH <br/> FOUNDATION</h4>
        </div>
        <p>We are committed to making a positive impact in the lives of people through love and empowerment.</p>
      </div>
      <div className="footer-column">
        <h4>Address</h4>
        <p className='click'><FontAwesomeIcon icon={faMapMarkerAlt} /> Lagos, Nigeria</p>
        <p className='click'><FontAwesomeIcon icon={faPhone} /> +234 813 992 2932</p>
        <p onClick={handleEmailClick} className='click' ><FontAwesomeIcon icon={faEnvelope} /> dalmachfoundation@gmail.com</p>
      </div>
      <div className="footer-column">
        <h4>Quick Links</h4>
        <p><a href="./about-us-main">About Us</a></p>
        <p><a href="./contact-us">Contact Us</a></p>
        <p><a href="./programs-main">Programs</a></p>
        <p><a href="./events-main">Events</a></p>
        <p><a href="./blogs-main">Blogs</a></p>
        <p><a href="./gallery-main">Gallery</a></p>
        <p><a href="./donating">Support</a></p>
      </div>
      <div className="footer-column">
        <h4>Be a member</h4>
        <p>Become a member of Dalmach Foundation and join us in making a difference in the community.</p>
        <p><a href="/team-main">Be a part of the team</a></p>
        <p><a href="/staff-login">Login</a></p>
      </div>
      <div className="footer-bottom">
        <p>&copy; DalmachFoundation.org, All Right Reserved</p>
        <p>Developed By <span className='developer' onClick={handleLinkedLnClick}>Toki Adedapo</span></p>
        <p><a href="/admin">Admin</a></p>
      </div>
    </div>
  );
}

export default Footer;
