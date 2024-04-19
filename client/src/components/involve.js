import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './about-us-main.css';
import './involve.css';

const Volunteer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    volunteerFor: '',
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

    fetch('http://localhost:9000/submit-volunteer-form', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Volunteer form submitted successfully:', data);
        alert('Volunteer form submitted successfully!');
        setFormData({
          fullName: '',
          address: '',
          phoneNumber: '',
          email: '',
          volunteerFor: '',
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('Error submitting volunteer form:', error);
        alert('Error submitting volunteer form!');
      });
  };

  return (
    <div>
      <div className="involve-container">
        <div className="get-involved-form">
          <h2>Get Involved</h2>
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
              Volunteer For? (Please choose one) <span>*</span>
            </label>
            <div className="volunteer-options">
              <div className="radio-opt">
                <input
                  type="radio"
                  id="dalmachOutreach"
                  name="volunteerFor"
                  value="Dalmach Outreach Program"
                  checked={formData.volunteerFor === 'Dalmach Outreach Program'}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="dalmachOutreach">Dalmach Outreach Program</label>
              </div>
              <div className="radio-opt">
                <input
                  type="radio"
                  id="dalmachInitiative"
                  name="volunteerFor"
                  value="Dalmach Initiative Program"
                  checked={formData.volunteerFor === 'Dalmach Initiative Program'}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="dalmachInitiative">Dalmach Initiative Program</label>
              </div>
              <div className="radio-opt">
                <input
                  type="radio"
                  id="dalmachFeminine"
                  name="volunteerFor"
                  value="Dalmach Feminine Program"
                  checked={formData.volunteerFor === 'Dalmach Feminine Program'}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="dalmachFeminine">Dalmach Feminine Program</label>
              </div>
              <div className="radio-opt">
                <input
                  type="radio"
                  id="fullParticipation"
                  name="volunteerFor"
                  value="Full Participation"
                  checked={formData.volunteerFor === 'Full Participation'}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="fullParticipation">Full Participation</label>
              </div>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;