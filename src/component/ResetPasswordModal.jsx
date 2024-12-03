// ResetPasswordModal.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons
import axios from 'axios'; // Import axios for making HTTP requests
import './Modal.css';

const ResetPasswordModal = ({ isOpen, onClose, email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (password === confirmPassword) {
      try {
        const response = await axios.post('https://steelisia-tunisie.onrender.com/user/resetpwd', {
          email, 
          newPassword: password,
        });
        console.log(response.data);
        alert("Password reset successfully!"); // Display success message
        onClose(); // Close the modal after submission
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Error resetting password');
        console.error('Reset password error:', error);
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 style={{ color: 'black' }}>Reset Password</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modal-input"
              style={{ opacity: '0.5' }}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="password-field">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="modal-input"
              style={{ opacity: '0.5' }}
              required
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="modal-buttons">
            <button onClick={onClose} style={{ borderRadius: '20px' }}>Cancel</button>
            <button onClick={handleSubmit} style={{ borderRadius: '20px', color: 'white', backgroundColor: 'black' }}>Reset Password</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ResetPasswordModal;
