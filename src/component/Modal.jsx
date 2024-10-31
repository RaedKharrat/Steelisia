import React from 'react';
import './Modal.css'; // Ensure to create a CSS file for styling

const Modal = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 style={{color: 'black',opacity:''}}>Forgot Password?</h2>
          <p>Please enter your email address:</p>
          <input type="email" placeholder="Enter your email" required />
          <div className="modal-buttons">
            <button onClick={onClose} style={{borderRadius: '20px'}}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
    )
  );
};


export default Modal;
