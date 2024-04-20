// contact.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch('http://localhost:9000/submit-contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Contact form submitted successfully:', data);
        alert('Contact form submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('Error submitting contact form:', error);
        alert('Error submitting contact form!');
      });
  };

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
          {/* <form className='contact-form'>
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
          </form> */}
          <form className='contact-form' onSubmit={handleSubmit}>
  <div className="form-group">
    <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} required />
    <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
  </div>
  <div className="form-group">
    <input type="tel" placeholder="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
  </div>
  <div className="form-group">
    <textarea placeholder="Your Message" name="message" value={formData.message} onChange={handleInputChange} required />
  </div>
  <div className="contact-us">
    <button type="submit" className='contact-us-link'>
      Submit <i className='fas fa-arrow-right'></i>
    </button>
  </div>
</form>
        </div>
       
      </div>
    </div>
  );
}

export default Contact;
