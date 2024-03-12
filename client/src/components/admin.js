// admin.js
import React, { useState } from 'react';
import BriefInfo from './brief-info';
import Navbar from './navbar';
import Footer from './footer';
import './admin.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get navigation function

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (username === 'Admin123' && password === '12345678') {
      navigate('/admin-dashboard'); // Navigate to admin-dashboard on success
    } else {
      alert('Wrong username or password!');
    }
  };

  return (
    <div>
      <div className="admin-container">
        <BriefInfo />
        <Navbar />
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
