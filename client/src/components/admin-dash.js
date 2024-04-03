// admin-dash.js
import React, { useState } from 'react';
import './admin-dash.css';
import UserMann from './user-management';
import EventMann from './event-management';
import ContentMann from './content-management';
import Gallery from './gallery';
import DonationMann from './donation-management';
import Communication from './communication';

const AdminDash = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='admin-dash-main-container'>
      <div className={`admin-dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Admin Dashboard</h2>
        <div className="admin-dash-options">
          <button
            className={`admin-dash-option ${selectedOption === 'User Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('User Management')}
          >
            User Management
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'Content Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Content Management')}
          >
            Content Management
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'Donation Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Donation Management')}
          >
            Donation Management
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'Event Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Event Management')}
          >
            Event Management
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'Communication' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Communication')}
          >
            Communication
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'Gallery' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Gallery')}
          >
            Gallery
          </button>
        </div>
      </div>
      <div className="admin-dash-content">
        <h1>{selectedOption || 'Welcome'}</h1>
        {selectedOption === 'User Management' && <UserMann />}
        {selectedOption === 'Event Management' && <EventMann />}
        {selectedOption === 'Content Management' && <ContentMann />}
        {selectedOption === 'Gallery' && <Gallery />}
        {selectedOption === 'Donation Management' && <DonationMann />}
        {selectedOption === 'Communication' && <Communication />}
      </div>
      <div className="menu-icons" onClick={toggleSidebar}>
        ☰
      </div>
    </div>
  );
}

export default AdminDash;
