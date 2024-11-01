// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 style={{color: 'black'}}>Forgot Password?</h2>
          <p>Please enter your email address:</p>
          <input type="email" placeholder="example@exp.ex" required />
          <div className="modal-buttons">
            <button onClick={onClose} style={{borderRadius: '20px'}}>Cancel</button>
            <button type="submit" onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
