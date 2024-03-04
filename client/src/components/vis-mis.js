// import React from "react";
// import './vis-mis.css';

// vis-mis.js
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faBinoculars } from '@fortawesome/free-solid-svg-icons';
import './vis-mis.css';

const VisMis = () => {
  return (
    <div className="vis-mis-container">
      <div className="vision-container">
        <FontAwesomeIcon icon={faBinoculars} className="icon" />
        <h2>Vision</h2>
        <p>
          To reach out to as many lives in Nigeria and Africa by giving hope and empowerment through love. <br /> <br />
          To have an academy in subsequent years from now, where we inculcate skills and values into young passionate less privileged. <br /> <br />
          To raise influential young women through our DALMACH FEMININE PROGRAM (DFP), who will stand out to be a voice in their area of field or wherever they find themselves.
        </p>
      </div>
      <div className="goal-container">
        <FontAwesomeIcon icon={faBullseye} className="icon" />
        <h2>Goal</h2>
        <p>
          To be among the best recognized Charity FOUNDATION impacting and transforming lives in Nigeria and across the globe.
        </p>
      </div>
    </div>
  );
}

export default VisMis;
