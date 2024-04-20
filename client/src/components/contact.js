// contact.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const navigate = useNavigate();
  const [showReplySection, setShowReplySection] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    const fetchUserMessagesWithAdminResponses = async () => {
      try {
        const response = await fetch('http://localhost:9000/get-user-messages-with-admin-responses');
        const data = await response.json();
        setUserMessages(data);
      } catch (error) {
        console.error('Error fetching user messages with admin responses:', error);
      }
    };

    fetchUserMessagesWithAdminResponses();
  }, []);

  const toggleReplySection = () => {
    setShowReplySection(!showReplySection);
    setUserEmail('');
  };

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
    <div className="main-contact-container">
      <div className="contact-container">
        <div className="right-halff">
          <h2>Contact Details</h2>
          <p>
            If you have any questions or inquiries, <br />
            feel free to reach out to us.
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icons" /> Lagos, Nigeria
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} className="contact-icons" /> +234 810 677 5111
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="contact-icons" /> foundation@gmail.com
          </p>
        </div>
        <div className="left-halff">
          <h1>Keep in touch with us</h1>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="contact-us">
              <button type="submit" className="contact-us-link">
                Submit <i className="fas fa-arrow-right"></i>
              </button>
              <button className="view-reply-btn" onClick={toggleReplySection}>
                {showReplySection ? 'Hide Reply' : 'View Reply'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showReplySection && (
        <div className="reply-section-button">
          <h3>View Reply</h3>
          <input
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <div className="user-messages-chat">
            {userMessages
              .filter((message) => message.email === userEmail)
              .map((message) => (
                <div key={message.id} className="user-message-container-chat">
                  <div className="user-message-chat">
                    <div className="message-sender-chat">{message.name}</div>
                    <div className="message-content-chat">{message.message}</div>
                    <div className="message-date-chat">{new Date(message.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
                  </div>
                  {message.admin_message && (
                    <div className="admin-reply-chat">
                      <div className="message-sender-chat">Admin</div>
                      <div className="message-content-chat">{message.admin_message}</div>
                      <div className="message-date-chat">{new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;