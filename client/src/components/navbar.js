// navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation(); 

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 0);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className='logo-container'>
        <img src={require('../Media/Pictures/logo.png')} alt="Logo" className="logo" />
        <div className='logo-txt'>
          <h1>DALMACH <br />FOUNDATION</h1>
        </div>
      </div>
      <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <li className={pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={pathname === "/about-us-main" ? "active" : ""}>
          <Link to="/about-us-main">About Us</Link>
        </li>
        <li className={pathname === "/programs-main" ? "active" : ""}>
          <Link to="/programs-main">Programs</Link>
        </li>
        <li className={pathname === "/events-main" ? "active" : ""}>
          <Link to="/events-main">Events</Link>
        </li>
        <li className={pathname === "/blogs-main" ? "active" : ""}>
          <Link to="/blogs-main">Blogs</Link>
        </li>
        <li className={pathname === "/gallery-main" ? "active" : ""}>
          <Link to="/gallery-main">Gallery</Link>
        </li>
        <li className={pathname === "/get-involved" ? "active" : ""}>
          <Link to="/involve-main">Get Involved</Link>
        </li>
        <li className={pathname === "/contact-us" ? "active" : ""}>
          <Link to="/contact-us">Contact Us</Link>
        </li>
        <li className='donate-link'>
          <Link to="/donating" className='donate-now-link'>
            <p>Donate Now</p> <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </li>
      </ul>
      <div className="menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </nav>
  );
};

export default Navbar;
