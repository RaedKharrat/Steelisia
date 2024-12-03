import React, { useState } from 'react';
import './Modal.css';

const OtpModal = ({ isOpen, onClose, onVerify, onResend, email }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (element, index) => {
    const { value } = element;

    // Handle single character input
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Move focus to the next input if it exists
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  const handlePaste = (e, index) => {
    const pasteData = e.clipboardData.getData('text');
    const newOtp = [...otp];

    // Update the OTP array with the pasted values
    for (let i = 0; i < pasteData.length && index + i < otp.length; i++) {
      newOtp[index + i] = pasteData[i];
    }

    setOtp(newOtp);

    // Move focus to the next empty input after pasting
    const nextIndex = pasteData.length + index;
    if (nextIndex < otp.length) {
      document.querySelectorAll('.otp-field')[nextIndex].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    const { key } = e;

    // Handle backspace to clear the current field and move focus to the previous input
    if (key === 'Backspace') {
      if (otp[index] === '') {
        // Move focus to the previous input if the current one is empty
        if (index > 0) {
          const newOtp = [...otp];
          newOtp[index - 1] = ''; // Clear the previous input
          setOtp(newOtp);
          document.querySelectorAll('.otp-field')[index - 1].focus();
        }
      } else {
        // Clear the current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join(""); // Join the array to form a 6-digit OTP string

    try {
      const response = await fetch('https://steelisia-tunisie.onrender.com/user/otpverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
        onVerify();          // Call onVerify prop to handle additional logic
        onClose();           // Close the OTP modal on success
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
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
                onPaste={(e) => handlePaste(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
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

          <div className="modal-buttons">
            <button onClick={onClose} style={{ borderRadius: '20px' }}>Cancel</button>
            <button type="button" onClick={handleVerify} style={{ borderRadius: '20px', color: 'white', backgroundColor: 'black' }}>Verify</button>
          </div>
        </div>
      </div>
    )
  );
};

export default OtpModal;
