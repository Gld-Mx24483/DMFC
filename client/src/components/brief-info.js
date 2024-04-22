// Brief-info.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
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

  const screenWidth = window.innerWidth;

  if (screenWidth <= 400) {
    return null;
  }

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/dalmachfoundation', '_blank');
  };

  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/dalmachfoundation', '_blank');
  };

  const handleWhatsappClick = () => {
    window.open('https://api.whatsapp.com/send?phone=%2B2348139922932&context=ARAtLbB2roIW-K-4gZAhIKHLXueHXUUs3mSko_9toCLL0Aw6en_wr-75B-ob6c8WsAdcNheM85_V82TdK-qxYNTsHkqEFc3JT0z9GY5Vh1y-C97PxrwtTSmE6qywjlpOBraEfrgwFO1uKBPSJ-9T_LSC5A&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwZXh0bgNhZW0CMTAAAR3qmx1xisKFq9c2Qpo2H9HfFFP2hi6dObLpSHbRdyUaFXhMI8PHguhYkZM_aem_ATosv4xTCu0iU_S7EjXOOANIESAzJGTGrRtVP0F3XfMi9zMew7dSH99ex3oeGbsK7kpgGnxsFmkRDliGLmSkm13J', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:dalmachfoundation@gmail.com', '_blank');
  };

  return (
    <div className={`brief-info-navbar ${showBriefInfo ? 'show' : 'hide'}`}>
      <div className="info-left">
        <FontAwesomeIcon icon={faMapMarkerAlt} /> Lagos, Nigeria
        <FontAwesomeIcon onClick={handleEmailClick} icon={faEnvelope} /> foundation@gmail.com
      </div>
      <div className="info-right">
        Follow Us:
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faFacebook} onClick={handleFacebookClick} />
        <FontAwesomeIcon icon={faInstagram} onClick={handleInstagramClick} />
        <FontAwesomeIcon icon={faWhatsapp} onClick={handleWhatsappClick}/>
      </div>
    </div>
  );
};

export default BriefInfo;