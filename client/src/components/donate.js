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
          <p>Write some paragraph text here...</p>
        </div>
        <div className="right-half">
          <form>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="amount">Amount (NGN)</label>
            <input type="number" id="amount" name="amount" required />

            <button type="submit" className="donate-btn">
              Donate Now <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
        </div>
      </div>
    );
}

export default Donate;
