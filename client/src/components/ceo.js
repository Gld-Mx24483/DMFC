// Footer.js
import React from 'react';
import './ceo.css';

const Ceo = () => {
  return (
    <div className="ceo-container">
        <div className='ceo-sub-container'>
      <div className="ceo-text">
        <p>
          DALMACH FOUNDATION was founded by MR. DANIEL U. C. AMADI as the CEO/PRESIDENT of the Foundation. <br /> <br /> <br /> 
          As a growing Foundation, one of our major goals at DALMACH FOUNDATION is to ensure that the most vulnerable 
          less privileged ones in Nigeria are taken care of and empowered with the necessary skills and information needed 
          for them to grow.
        </p>
      </div>
      <div className="ceo-profile">
        <img src={require('../Media/Pictures/DF.jpg')} alt="Profile" />
      </div>
      </div>
    </div>
  );
}

export default Ceo;
