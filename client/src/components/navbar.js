// navbar.js
// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className='logo-container'>
      <img src={require('../Media/Pictures/logo.png')} alt="Logo" className="logo" />
      <div className='logo-txt'>
      <h1>DALMACH</h1>
      <p>FOUNDATION</p>
      </div>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/programs">Programs</Link></li>
        <li><Link to="/get-involved">Get Involved</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        <li className='donate-link'>
          <Link to="/donate-now" className='donate-now-link'>
            <p>Donate Now</p> <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
