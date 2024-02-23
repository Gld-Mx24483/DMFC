// Brief-info.js
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { faWhatsapp, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import './brief-info.css';

// const BriefInfo = () => {
//   return (
//     <div className="brief-info-navbar">
//       <div className="info-left">
//         <FontAwesomeIcon icon={faMapMarkerAlt} /> Lagos, Nigeria
//         <FontAwesomeIcon icon={faEnvelope} /> foundation@gmail.com
//       </div>
//       <div className="info-right">
//         Follow Us:
//         <FontAwesomeIcon icon={faTwitter} />
//         <FontAwesomeIcon icon={faLinkedin} />
//         <FontAwesomeIcon icon={faInstagram} />
//         <FontAwesomeIcon icon={faWhatsapp} />
//       </div>
//     </div>
//   );
// }

// export default BriefInfo;

// Brief-info.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './brief-info.css';

const BriefInfo = () => {
  const [showBriefInfo, setShowBriefInfo] = useState(true);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setShowBriefInfo(scrollPosition === 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`brief-info-navbar ${showBriefInfo ? 'show' : 'hide'}`}>
      <div className="info-left">
        <FontAwesomeIcon icon={faMapMarkerAlt} /> Lagos, Nigeria
        <FontAwesomeIcon icon={faEnvelope} /> foundation@gmail.com
      </div>
      <div className="info-right">
        Follow Us:
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faLinkedin} />
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faWhatsapp} />
      </div>
    </div>
  );
}

export default BriefInfo;
