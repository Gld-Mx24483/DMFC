// team.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './team.css';

const TeamForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    role: '',
    customRole: '',
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

    const role = formData.role === 'custom' ? formData.customRole : formData.role;

    fetch('http://localhost:9000/submit-team-form', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, role }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Team form submitted successfully:', data);
        alert('Team form submitted successfully!');
        const templateParams = {
          fullName: formData.fullName,
          email: formData.email,
          message: 'Your message content here', 
        };
      
        emailjs.send('service_97230z5', 'template_mkmdp1d', templateParams, 'ig47yihiXPhRzPqZH')
          .then((response) => {
            console.log('Email sent:', response);
            alert('Email sent successfully!');
          })
          .catch((error) => {
            console.error('Error sending email:', error);
            alert('Error sending email!');
          });
        setFormData({
          fullName: '',
          address: '',
          phoneNumber: '',
          email: '',
          role: '',
          customRole: '',
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('Error submitting team form:', error);
        alert('Error submitting team form!');
      });
  };

  // emailjs.init('service_97230z5');

  return (
    <div className="teams-main-container">
      <div className="get-involved-form">
        <h2>Join Our Team</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">
            Full Name <span>*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="address">
            Address <span>*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <label htmlFor="email">
            Email <span>*</span>{' '}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label>
            Role (Please choose one) <span>*</span>
          </label>
          <div className="volunteer-options">
            <div className="radio-opt">
              <input
                type="radio"
                id="blogger"
                name="role"
                value="Blogger"
                checked={formData.role === 'Blogger'}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="blogger">Blogger</label>
            </div>
            <div className="radio-opt">
              <input
                type="radio"
                id="eventPlanner"
                name="role"
                value="Event Planner"
                checked={formData.role === 'Event Planner'}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="eventPlanner">Event Planner</label>
            </div>
            <div className="radio-opt">
              <input
                type="radio"
                id="photographer"
                name="role"
                value="Photographer"
                checked={formData.role === 'Photographer'}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="photographer">Photographer</label>
            </div>
            <div className="radio-opt">
              <input
                type="radio"
                id="instructor"
                name="role"
                value="Instructor"
                checked={formData.role === 'Instructor'}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="instructor">Instructor</label>
            </div>
            <div className="radio-opt other-container">
              <input
                type="radio"
                id="customRole"
                name="role"
                value="custom"
                checked={formData.role === 'custom'}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="customRole" className='other'>Other</label>
              <input
                type="text"
                id="customRole"
                name="customRole"
                value={formData.customRole}
                onChange={handleInputChange}
                disabled={formData.role !== 'custom'}
              />
            </div>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default TeamForm;