// contact.js
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './contact.css';

const Contact = () => {
  const navigate = useNavigate();
  const [showReplySection, setShowReplySection] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showViewReply, setShowViewReply] = useState(false);
  const [showGlobalReply, setShowGlobalReply] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [userMessages, setUserMessages] = useState([]);
  const [globalReplyMessages, setGlobalReplyMessages] = useState([]);

  useEffect(() => {
    const fetchUserMessagesWithAdminResponses = async () => {
      try {
        const data = await api.contact.getUserMessagesWithAdminResponses();
        setUserMessages(data);
      } catch (error) {
        console.error('Error fetching user messages with admin responses:', error);
      }
    };

    fetchUserMessagesWithAdminResponses();
  }, []);

  useEffect(() => {
    const fetchAdminBroadcastMessages = async () => {
      try {
        const data = await api.contact.getAdminBroadcastMessages();
        setGlobalReplyMessages(data);
      } catch (error) {
        console.error('Error fetching admin broadcast messages:', error);
      }
    };

    fetchAdminBroadcastMessages();
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await api.contact.submitForm(formData);
      console.log('Contact form submitted successfully:', data);
      alert('Contact form submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      navigate('/');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error submitting contact form!');
    }
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
        <div className="reply-section-container">
          <div className="reply-section-button">
            <h3>View Replies</h3>
            <div className="toggle-buttons">
              <button
                className={`toggle-btn ${showViewReply ? 'active' : ''}`}
                onClick={() => {
                  setShowViewReply(true);
                  setShowGlobalReply(false);
                }}
              >
                View Reply
              </button>
              <button
                className={`toggle-btn ${showGlobalReply ? 'active' : ''}`}
                onClick={() => {
                  setShowGlobalReply(true);
                  setShowViewReply(false);
                }}
              >
                Global Reply
              </button>
            </div>
            {showViewReply && (
              <div>
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
            {showGlobalReply && (
              <div className="global-reply-messages">
                {globalReplyMessages.map((message) => (
                  <div key={message.id} className="global-reply-message">
                    <div className="message-sender-global">Admin</div>
                    <div className="message-content-global">{message.message}</div>
                    <div className="message-date-global">{new Date(message.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;