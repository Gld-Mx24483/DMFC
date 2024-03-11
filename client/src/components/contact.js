// contact.js
import React from 'react';
import './contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className='main-ontact-container'>
      <div className="contact-container">
      <div className="right-halff">
          <h2>Contact Details</h2>
          <p>
            If you have any questions or inquiries, <br />
            feel free to reach out to us.
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className='contact-icons' /> Lagos, Nigeria
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} className='contact-icons' /> +234 810 677 5111
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className='contact-icons' /> foundation@gmail.com
          </p>
        </div>
        <div className="left-halff">
            <h1>Keep in touch with us</h1>
          <form className='contact-form'>
            <div className="form-group">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Phone" />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" />
            </div>
            <div className="contact-us">
            <a href='#' className='contact-us-link'>
              Submit <i className='fas fa-arrow-right'></i>
            </a>
            </div>
          </form>
        </div>
       
      </div>
    </div>
  );
}

export default Contact;
