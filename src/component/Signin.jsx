import React, { useState } from 'react'; // Import useState for managing password visibility
import './style.css'; // Ensure to create and import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faPhone, faMapMarkerAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import logoapp from './logoAppDark.png'; // Import the logo image
import logoapp2 from './logoAppDark2.png'; // Import the logo image

const LoginSignupForm = () => {
  const [showPasswordLogin, setShowPasswordLogin] = useState(false); // State for login password visibility
  const [showPasswordSignup, setShowPasswordSignup] = useState(false); // State for signup password visibility

  const togglePasswordVisibilityLogin = () => {
    setShowPasswordLogin(prev => !prev); // Toggle password visibility for login
  };

  const togglePasswordVisibilitySignup = () => {
    setShowPasswordSignup(prev => !prev); // Toggle password visibility for signup
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
            <img src={logoapp2} alt="Logo" className="form-logo" style={{ marginBottom: '40px', height: '50px', width: 'auto' }} /> {/* Logo added here */}
            <div className="title">Login</div>
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
                <div className="text"><a href="#">Forgot password?</a></div>
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
                <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Signup now</label></div>
              </div>
            </form>
          </div>
          <div className="signup-form">
            <img src={logoapp} alt="Logo" className="form-logo" /> {/* Logo added here */}
            <div className="title">Signup</div>
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
                  <FontAwesomeIcon icon={faPhone} /> {/* Phone icon for the phone number field */}
                  <input type="text" placeholder="+216 ** *** ***" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {/* Map marker icon for the address field */}
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
    </div>
  );
};

export default LoginSignupForm;
