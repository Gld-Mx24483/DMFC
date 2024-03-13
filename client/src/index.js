import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import './index.css';
import Homepage from './components/homepage';
import Navbar from './components/navbar';
import BriefInfo from './components/brief-info';
import AboutUs from './components/about-us';
import Donate from './components/donate';
import Donating from './components/donating';
import Footer from './components/footer';
import Ceo from './components/ceo';
import ProgramsMain from './components/programs-main';
import AboutUsMain from './components/about-us-main';
import ContactUs from './components/contact-us';
import EventsMain from './components/events-main';
import Outreach from './components/outreach';
import Initiative from './components/initiative';
import Feminine from './components/feminine';
import Admin from './components/admin';
import Involve from './components/involve';
import InvolveMain from './components/involve-main';
import StaffLogin from './components/staff-login';
import AdminDashboard from './components/admin-dashboard';
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
      <Route exact path="/events-main" element={<EventsMain />} />
      <Route exact path="/outreach" element={<Outreach />} />
      <Route exact path="/initiative" element={<Initiative />} />
      <Route exact path="/feminine" element={<Feminine />} />
      <Route exact path="/donating" element={<Donating />} />
      <Route exact path="/admin" element={<Admin />} />
      <Route exact path="/involve" element={<Involve />} />
      <Route exact path="/staff-login" element={<StaffLogin />} />
      <Route exact path="/involve-main" element={<InvolveMain />} />
      <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();



//------------------------REACT-NODE CONNECTION----------------------------//
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:9000';
console.log(`API URL: ${apiUrl}`);
//-------------------------------------------------------------------------//