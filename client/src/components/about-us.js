// about-us.js
import React from 'react';
import './about-us.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className='image-text'>
      <div className="about-us-image">
        <img src={require('../Media/Pictures/About-us.jpg')} alt="About Us" />
      </div>
      <div className="about-us-content">
        {/* <h2>About Us</h2> */}
        <h3>Empowering Lives, <br />Igniting Hope</h3>
        <p>
          Dalmach Foundation is a Charity Foundation established specifically to help empower the life of the less privileged,
          which includes fatherless and motherless children, from the age of 1-20 years, poor widows, and also, to contribute to propagating the gospel.
          It is a growing charity and non-profit organization that is dedicated towards going to the grassroots,
          empowering those who are in dire need of assistance and those who have been affected by insurmountable challenges and life detours.
          Dalmach Foundation tends to help people, most especially our benevolent target audience, to identify and improve their hidden potentials as they are the light of the world.
          This will really help reveal their purpose and guide them to fulfilling their potential to the full extent because purpose and fulfilling potentials are keys to life and without purpose life has no meaning.
          Subsequently, we’ll be inviting speakers on various fields of knowledge to come educate them on the related aspect above. This will have a greater and positive impact on the life of our target audience as it will equip them for greatness and help them achieve more in their endeavors.
          However, apart from being a veritable source of transformation, we seek to arouse the level of awareness and touch more lives through love.
        </p>
      </div>
      </div>
      <div className="contact-us">
        <a href='./contact-us' className='contact-us-link'>
          Contact Us <i className='fas fa-arrow-right'></i>
        </a>
      </div>
    </div>
  );
}

export default AboutUs;
