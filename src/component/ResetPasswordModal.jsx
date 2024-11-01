// ResetPasswordModal.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons
import './Modal.css';

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleSubmit = () => {
    if (password === confirmPassword) {
      // Handle password reset logic here
      console.log("Password reset successfully!");
      onClose(); // Close the modal after submission
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 style={{ color: 'black' }}>Reset Password</h2>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modal-input"
              style={{ opacity: '0.5' }}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
            </span>
          </div>
          <div className="password-field">
            <input
              type={showConfirmPassword ? 'text' : 'password'} // Toggle confirm password visibility
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="modal-input"
              style={{ opacity: '0.5' }}
              required
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
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
