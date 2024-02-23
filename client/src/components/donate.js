// 

// Donate.js
import React from "react";
import './donate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Donate = () => {
    return (
      <div className="donate-container">
        <div className="left-half">
          <h3>Donate Now</h3>
          <h2>Thanks For The Results Achieved With You</h2>
          <p>We extend our heartfelt gratitude for your ongoing commitment and contributions. 
            Thanks to your dedication, we anticipate even greater successes in the future.</p>
        </div>
        <div className="right-half">
          <form>
            <input placeholder="Your Name" type="text" id="name" name="name" required />

            <input placeholder="Your Email" type="email" id="email" name="email" required />

            <input placeholder="Amount (NGN)" type="number" id="amount" name="amount" required />

            <button type="submit" className="donate-btn">
              Donate Now  <i className='fas fa-arrow-right'></i>
            </button>
          </form>
        </div>
      </div>
    );
}

export default Donate;
