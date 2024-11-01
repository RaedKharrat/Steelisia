// OtpModal.js
import React, { useState } from 'react';
import './Modal.css';

const OtpModal = ({ isOpen, onClose, onVerify, onResend }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (element, index) => {
    if (element.value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);
      
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  const handleVerify = () => {
    onVerify(); // Call the verify function passed as a prop
    onClose(); // Close the OTP modal
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 style={{ color: 'black' }}>Enter OTP</h2>
          <p>Please enter the 6-digit code sent to your email:</p>
          <div className="otp-inputs">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                className="otp-field"
                style={{
                  width: '40px',
                  height: '40px',
                  fontSize: '18px',
                  textAlign: 'center',
                  margin: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            ))}
          </div>
          <button 
            onClick={onResend} 
            style={{
              backgroundColor: '#4CAF50', // Green background
              color: 'white', // White text
              border: 'none', // Remove border
              borderRadius: '20px', // Rounded corners
              padding: '10px 20px', // Add some padding
              cursor: 'pointer', // Pointer on hover
              margin: '10px 0', // Space above and below
              fontSize: '16px', // Increase font size
              transition: 'background-color 0.3s', // Smooth transition for hover effect
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} // Darker green on hover
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'} // Return to original color
          >
            Resend OTP Code
          </button>
          <div className="modal-buttons">
            <button onClick={onClose} style={{ borderRadius: '20px' }}>Cancel</button>
            <button type="submit" onClick={handleVerify}>Verify</button>
          </div>
        </div>
      </div>
    )
  );
};

export default OtpModal;
