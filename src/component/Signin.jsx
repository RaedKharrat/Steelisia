import React, { useState } from 'react';
import './style.css';
import Modal from './Modal'; // Import the modal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faPhone, faMapMarkerAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logoapp from './logoAppDark.png';
import logoapp2 from './logoAppDark2.png';

const LoginSignupForm = () => {
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const togglePasswordVisibilityLogin = () => {
    setShowPasswordLogin(prev => !prev);
  };

  const togglePasswordVisibilitySignup = () => {
    setShowPasswordSignup(prev => !prev);
  };

  const handleForgotPasswordClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="container">
      <input type="checkbox" id="flip" />
      <div className="cover">
        <div className="front">
          <img src="/Frontoffice/assets/images/backgroundLogin1.jpg" alt="" />
          <div className="text">
            <span className="text-1">Transform Your Space <br /> with Our Unique Furniture & Decor</span>
            <span className="text-2">Style Meets Functionality</span>
          </div>
        </div>
        <div className="back">
          <img className="backImg" src="/Frontoffice/assets/images/backgroundImg22.jpg" alt="" />
          <div className="text">
            <span className="text-1">Discover Timeless Pieces <br /> for Every Room</span>
            <span className="text-2">Elevate Your Home Experience</span>
          </div>
        </div>
      </div>
      <div className="forms">
        <div className="form-content">
          <div className="login-form">
            <img src={logoapp2} alt="Logo" className="form-logo" style={{ marginBottom: '40px', height: '50px', width: 'auto' }} />
            <div className="title" style={{ color: '#4E7A50' }}>Login</div>
            <form action="#">
              <div className="input-boxes">
                <div className="input-box">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input type="text" placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faLock} />
                  <input 
                    type={showPasswordLogin ? 'text' : 'password'} 
                    placeholder="Enter your password" 
                    required 
                  />
                  <span onClick={togglePasswordVisibilityLogin}>
                    <FontAwesomeIcon icon={showPasswordLogin ? faEyeSlash : faEye} />
                  </span>
                </div>
                <div className="text"><a href="#" onClick={handleForgotPasswordClick}>Forgot password?</a></div> {/* Update the link to open the modal */}
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
                <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Signup now</label></div>
              </div>
            </form>
          </div>
          <div className="signup-form">
            <img src={logoapp} alt="Logo" className="form-logo" />
            <div className="title" style={{ color: '#4E7A50' }}>Signup</div>
            <form action="#">
              <div className="input-boxes">
                <div className="input-box">
                  <FontAwesomeIcon icon={faUser} />
                  <input type="text" placeholder="Enter your name" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input type="text" placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faLock} />
                  <input 
                    type={showPasswordSignup ? 'text' : 'password'} 
                    placeholder="Enter your password" 
                    required 
                  />
                  <span onClick={togglePasswordVisibilitySignup}>
                    <FontAwesomeIcon icon={showPasswordSignup ? faEyeSlash : faEye} />
                  </span>
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faPhone} />
                  <input type="text" placeholder="+216 ** *** ***" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <input type="text" placeholder="Enter your address" required />
                </div>
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
                <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} /> {/* Include the modal */}
    </div>
  );
};

export default LoginSignupForm;
