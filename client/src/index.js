import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import './index.css';
import Homepage from './components/homepage';
import Navbar from './components/navbar';
import BriefInfo from './components/brief-info';
import AboutUs from './components/about-us';
import Donate from './components/donate';
import Footer from './components/footer';
import Ceo from './components/ceo';
import ProgramsMain from './components/programs-main';
import AboutUsMain from './components/about-us-main';
import ContactUs from './components/contact-us';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css'

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/navbar" element={<Navbar />} />
      <Route exact path="/brief-info" element={<BriefInfo />} />
      <Route exact path="/about-us" element={<AboutUs />} />
      <Route exact path="/donate" element={<Donate />} />
      <Route exact path="/footer" element={<Footer />} />
      <Route exact path="/about-us-main" element={<AboutUsMain />} />
      <Route exact path="/ceo" element={<Ceo />} />
      <Route exact path="/programs-main" element={<ProgramsMain />} />
      <Route exact path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();



//------------------------REACT-NODE CONNECTION----------------------------//
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:9000';
console.log(`API URL: ${apiUrl}`);
//-------------------------------------------------------------------------//