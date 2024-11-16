import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:9090/user/forgetpwd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
        onSubmit(email); // Pass the email to the parent component
        onClose();  // Close the modal on success
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to send OTP. Please try again.');
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
          <h2 style={{ color: 'black' }}>Forgot Password?</h2>
          <p style={{ color: 'white' }}>Please enter your email address:</p>
          <input
            type="email"
            placeholder="John.joe@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="modal-buttons">
            <button onClick={onClose} style={{ borderRadius: '20px' }}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                borderRadius: '20px',
                color: 'white',
                backgroundColor: 'black',
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
