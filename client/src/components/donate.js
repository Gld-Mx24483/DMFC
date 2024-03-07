// Donate.js
import React, { useState } from "react";
import './donate.css';
import { PaystackConsumer } from 'react-paystack';

const Donate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handlePayment = (initializePayment) => {
        if (name && email && amount) {
            const amountInKobo = parseFloat(amount) * 100;

            initializePayment({ email, name, amount: amountInKobo });
        } else {
            alert('Please fill in all required fields.');
        }
        setIsButtonClicked(true);
    };

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
                    <input
                        placeholder="Your Name"
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Your Email"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Amount (NGN)"
                        type="number"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <PaystackConsumer publicKey={`pk_live_7d23af7cfd5254be23c8c471db0d3489c7f978d7` } email={email} name={name} amount={amount * 100} >
                        {({ initializePayment }) => (
                            <button type="button" className="donate-btn" onClick={() => handlePayment(initializePayment)}>
                                Donate Now  <i className='fas fa-arrow-right'></i>
                            </button>
                        )}
                    </PaystackConsumer>
                </form>
            </div>
        </div>
    );
}

export default Donate;
