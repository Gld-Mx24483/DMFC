// admin-dashboard.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import './admin-dashboard.css';

const AdminDash = () => {
  return (
    <div>
    <div className="admin-dashboard-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top">
        <h1>Dashboard</h1>
        <p>Home / Admin / Dashboard</p>
      </div>
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default AdminDash;
