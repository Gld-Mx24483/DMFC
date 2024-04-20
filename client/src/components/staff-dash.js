import React, { useState } from 'react';
import './staff-dash.css'; 
import EventMann from './event-management';
import ContentMann from './content-management';
import Gallery from './gallery';

const StaffDash = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='staff-dash-main-container'>
      <div className={`staff-dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Staff Dashboard</h2>
        <div className="staff-dash-options">
          <button
            className={`staff-dash-option ${selectedOption === 'Content Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Content Management')}
          >
            Content Management
          </button>
          <button
            className={`staff-dash-option ${selectedOption === 'Event Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Event Management')}
          >
            Event Management
          </button>
          <button
            className={`staff-dash-option ${selectedOption === 'Gallery' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Gallery')}
          >
            Gallery
          </button>
        </div>
      </div>
      <div className="staff-dash-content">
        <h1>{selectedOption || 'Welcome'}</h1>
        {selectedOption === 'Event Management' && <EventMann />}
        {selectedOption === 'Content Management' && <ContentMann />}
        {selectedOption === 'Gallery' && <Gallery />}
      </div>
      <div className="menu-icons" onClick={toggleSidebar}>
        ☰
      </div>
    </div>
  );
}

export default StaffDash;
