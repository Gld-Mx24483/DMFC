// // involve.js
// import React from 'react';
// import Navbar from './navbar';
// import BriefInfo from './brief-info';
// import Footer from './footer';
// import './about-us-main.css';

// const AboutUsMain = () => {
//   return (
//     <div>
//     <div className="involve-container">
//         <BriefInfo />
//         <Navbar />

//       </div>
//       <div className='Footer-a'>
//       <Footer />
//       </div>
//     </div>
//   );
// }

// export default AboutUsMain;

import React from 'react';
import Navbar from './navbar';
import BriefInfo from './brief-info';
import Footer from './footer';
import './about-us-main.css';
import './involve.css';

const AboutUsMain = () => {
  return (
    <div>
      <div className="involve-container">
        <div className="get-involved-form">
          <h2>Be a part of the team</h2>
          <form>
            <label htmlFor="fullName">Full Name <span>*</span></label>
            <input type="text" id="fullName" name="fullName" required />
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" />
            <label htmlFor="email">Email <span>*</span> </label>
            <input type="email" id="email" name="email" required />
            <label>Volunteer For? (Please choose one) <span>*</span></label>
            <div className="volunteer-options">
            <div className='radio-opt'>
              <input type="radio" id="dalmachOutreach" name="volunteerFor" value="Dalmach Outreach Program" required />
              <label htmlFor="dalmachOutreach">Dalmach Outreach Program</label>
            </div>
            <div className="radio-opt">
              <input type="radio" id="dalmachInitiative" name="volunteerFor" value="Dalmach Initiative Program" required />
              <label htmlFor="dalmachInitiative">Dalmach Initiative Program</label>
            </div>
            <div className="radio-opt">
              <input type="radio" id="dalmachFeminine" name="volunteerFor" value="Dalmach Feminine Program" required />
              <label htmlFor="dalmachFeminine">Dalmach Feminine Program</label>
            </div>
            <div className="radio-opt">
              <input type="radio" id="fullParticipation" name="volunteerFor" value="Full Participation" required />
              <label htmlFor="fullParticipation">Full Participation</label>
            </div>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutUsMain;
