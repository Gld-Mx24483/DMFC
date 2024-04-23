// admin.js
import React, { useState } from 'react';
import BriefInfo from './brief-info';
import Navbar from './navbar';
import Footer from './footer';
import './admin.css';
import './staff-login.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [uniquekey, setUniqueKey] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

const fetchEmail = async (email) => {
  try {
    const response = await fetch(`http://localhost:9000/get-team-members?email=${email}`);
    const data = await response.json();

    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error fetching email:', error);
    return false;
  }
};

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const emailExists = await fetchEmail(email);
  
    if (emailExists && uniquekey === 'DMF123' && password === 'DMF-TEAM') {
      setErrorMessage('');
      navigate('/staff-dashboard');
    } else if (!emailExists) {
      setErrorMessage('Email not found in the database!');
    } else {
      setErrorMessage('Wrong username or password!');
    }
  };

  return (
    <div>
      <div className="admin-container staff-container">
        <BriefInfo />
        <Navbar />
        <form onSubmit={handleLogin} className="login-form staff-login-form">
          <h2>Login</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            id="confirmpassword"
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
