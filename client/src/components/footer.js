// Footer.js
import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
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
        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Lagos, Nigeria</p>
        <p><FontAwesomeIcon icon={faPhone} /> +234 810 677 5111</p>
        <p><FontAwesomeIcon icon={faEnvelope} /> foundation@gmail.com</p>
      </div>
      <div className="footer-column">
        <h4>Quick Links</h4>
        <p><a href="#">About Us</a></p>
        <p><a href="#">Contact Us</a></p>
        <p><a href="#">Programs</a></p>
        <p><a href="#">Support</a></p>
      </div>
      <div className="footer-column">
        <h4>Be a member</h4>
        <p>Become a member of Dalmach Foundation and join us in making a difference in the community.</p>
        <p><a href="#">Sign Up</a></p>
      </div>
      <div className="footer-bottom">
        <p>&copy; DalmachFoundation.org, All Right Reserved</p>
        <p><a href="#">Admin</a></p>
      </div>
    </div>
  );
}

export default Footer;
