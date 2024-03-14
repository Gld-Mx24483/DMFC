// admin-dashboard.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import AdminDash from './admin-dash';
import './admin-dashboard.css';

const AdminDashh = () => {
  return (
    <div>
    <div className="admin-dashboard-container aadmin">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top sub">
        <h1>Dashboard</h1>
        <p>Home / Admin / Dashboard</p>
      </div>
      </div>
      <div className='Admindashh'>
      <AdminDash />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default AdminDashh;
