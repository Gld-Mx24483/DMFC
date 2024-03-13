// admin.js
import React, { useState } from 'react';
import BriefInfo from './brief-info';
import Navbar from './navbar';
import Footer from './footer';
import './admin.css';
import './staff-login.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Admin = () => {
  const [email, setEmail] = useState('');
  const [uniquekey, setUniqueKey] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get navigation function

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (uniquekey === 'DMF123') {
      navigate('/admin-dashboard'); // Navigate to admin-dashboard on success
    } else {
      alert('Wrong username or password!');
    }
  };

  return (
    <div>
      <div className="admin-container staff-container">
        <BriefInfo />
        <Navbar />
        <form onSubmit={handleLogin} className="login-form staff-login-form">
          <h2>Login</h2>
          <label className='label' htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className='label' htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className='label' htmlFor="uniquekey">Unique Key:</label>
          <input
            type="password"
            id="password"
            value={uniquekey}
            onChange={(e) => setUniqueKey(e.target.value)}
            required
          />
          <div className="form-bottom">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <div className="forgot-password">
              <a href="">Forgot Password?</a>
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="Footer-a">
        <Footer />
      </div>
    </div>
  );
};

export default Admin;
