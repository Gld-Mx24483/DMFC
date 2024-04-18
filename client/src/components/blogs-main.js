// blog-main.js
import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Blg from './blogs';
import Footer from './footer';
import './blogs-main.css';

const BlogMain = () => {
  return (
    <div>
    <div className="about-us-main-container">
        <BriefInfo />
        <Navbar />
        <div className="centered-text sub-top">
        <h1>Blogs</h1>
        <p>Home / Blogs</p>
      </div>
      </div>
      <div className='Blogg'>
      <Blg />
      </div>
      <div className='Footer-a'>
      <Footer />
      </div>
    </div>
  );
}

export default BlogMain;
