// Oreach.js
import React from 'react';
import './oreach.css';

const Oreach = () => {
  return (
    <div className='oreach-main-container'>
      <div className="oreach-content">
        <h1>Dalmach Outreach Program</h1>
        <p>
          Dalmach Outreach is a program dedicated specifically towards reaching out to the less privileged and the poor widows, supporting them with consumable material goods, and if needed, providing financial support.
        </p>
        <p>
          Through this program, we have the opportunity to locate and render help where needed, especially to those in grassroots communities, schools, and hospitals.
        </p>
        <h2>Description</h2>
        <p>
          The Dalmach Outreach Program is designed to identify and assist individuals and communities facing economic hardships. We aim to provide support in the form of essential goods and financial assistance to those in need.
        </p>
        <h2>Goals</h2>
        <ul className='goals-list'>
          <li>Reach out to the less privileged and poor widows.</li>
          <li>Provide consumable material goods and financial support.</li>
          <li>Locate and render help to grassroots communities, schools, and hospitals.</li>
        </ul>
        <h2 className='Impact'>Impact</h2>
        <p>
          Our goal is to make a positive impact on the lives of the underprivileged by offering assistance, support, and hope. The Dalmach Outreach Program seeks to bring about positive change, uplift communities, and contribute to the well-being of society.
        </p>
      </div>
    </div>
  );
}

export default Oreach;
