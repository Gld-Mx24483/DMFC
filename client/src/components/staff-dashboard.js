// admin-dashboard.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import StaffDash from './staff-dash';
import './staff-dashboard.css';

const StaffDashh = () => {
  return (
    <div>
    <div className="staff-dashboard-container aadmin">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top sub">
        <h1>Dashboard</h1>
        <p>Home / Staff / Dashboard</p>
      </div>
      </div>
      <div className='Staffdashh'>
      <StaffDash />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default StaffDashh;
