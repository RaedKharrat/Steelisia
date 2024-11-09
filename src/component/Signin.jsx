import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Modal from './Modal';
import OtpModal from './OtpModal';
import ResetPasswordModal from './ResetPasswordModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faPhone, faMapMarkerAlt, faEye, faEyeSlash, faBuilding } from '@fortawesome/free-solid-svg-icons';
import logoapp from './logoAppDark.png';
import logoapp2 from './logoAppDark2.png';

const LoginSignupForm = () => {
  const navigate = useNavigate();
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState(''); // State to hold the email

  useEffect(() => {
    document.body.style.backgroundColor = '#2b2b2b';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';
    document.body.style.margin = '10px';

    return () => {
      resetBodyStyles();
    };
  }, []);

  const resetBodyStyles = () => {
    document.body.style.backgroundColor = ''; 
    document.body.style.display = '';
    document.body.style.justifyContent = '';
    document.body.style.alignItems = '';
    document.body.style.height = '';
    document.body.style.margin = '';
  };

  const togglePasswordVisibilityLogin = () => {
    setShowPasswordLogin((prev) => !prev);
  };

  const togglePasswordVisibilitySignup = () => {
    setShowPasswordSignup((prev) => !prev);
  };

  const handleForgotPasswordClick = () => {
    setIsModalOpen(true); // Show modal when "Forgot password" is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal when canceled
  };

  const handleOpenOtpModal = () => {
    setIsModalOpen(false); // Close modal when OTP modal opens
    setIsOtpModalOpen(true);
  };

  const handleCloseOtpModal = () => {
    setIsOtpModalOpen(false);
  };

  const handleVerify = () => {
    console.log("OTP Verified");
    handleCloseOtpModal();
    setIsResetPasswordModalOpen(true); 
  };

  const handleCloseResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target[0].value.toLowerCase();
    const password = event.target[1].value;

    try {
      const response = await axios.post('http://localhost:9090/user/login', { email, password });

      if (response.data && response.data.jwt) {
        const token = response.data.jwt;
        localStorage.setItem('authToken', token);
        navigate('/home');
        resetBodyStyles();
      } else {
        setErrorMessage('Login failed: No token received');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const first_name = event.target[0].value;
    const last_name = event.target[1].value;
    const email = event.target[2].value.toLowerCase();
    const password = event.target[3].value;
    const phone = event.target[4].value;
    const adresse = event.target[5].value;
    const companyName = event.target[6].value; // New company name field
    const role = "Client";

    try {
      const response = await axios.post("http://localhost:9090/user/signup", {
        first_name,
        last_name,
        email,
        password,
        phone,
        adresse,
        companyName, // Include company name in the request
        role,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed");
      console.error("Signup error:", error.response);
    }
  };

  const handleSubmitEmail = (submittedEmail) => {
    setEmail(submittedEmail);
    handleOpenOtpModal();
  };

  return (
    <div className="containerauth">
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
            <img src={logoapp2} alt="Logo" className="form-logo" />
            <div className="title">Login</div>
            <form onSubmit={handleLogin}>
              <div className="input-boxes">
                <div className="input-box">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input type="text" placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faLock} />
                  <input type={showPasswordLogin ? 'text' : 'password'} placeholder="Enter your password" required />
                  <span onClick={togglePasswordVisibilityLogin}>
                    <FontAwesomeIcon icon={showPasswordLogin ? faEyeSlash : faEye} />
                  </span>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="text"><a  onClick={handleForgotPasswordClick}>Forgot password?</a></div>
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
                <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Signup now</label></div>
              </div>
            </form>
          </div>

          <div className="signup-form">
            <img src={logoapp} alt="Logo" className="form-logo" />
            <div className="title">Signup</div>
            <form onSubmit={handleSignup}>
              <div className="input-boxes">
                <div className="input-box">
                  <FontAwesomeIcon icon={faUser} />
                  <input type="text" placeholder="Enter your first name" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faUser} />
                  <input type="text" placeholder="Enter your last name" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input type="text" placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faLock} />
                  <input type={showPasswordSignup ? 'text' : 'password'} placeholder="Enter your password" required />
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
                <p>If you are a company owner, please write it down below (Optional)</p>
                <div className="input-box">
                  <FontAwesomeIcon icon={faBuilding} />
                  <input type="text" placeholder="Company Name" required />
                </div>
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for Forgot Password */}
      <Modal isOpen={isModalOpen} handleClose={handleCloseModal} onSubmit={handleSubmitEmail} />

      {/* OTP Modal */}
      <OtpModal isOpen={isOtpModalOpen} handleClose={handleCloseOtpModal} onVerify={handleVerify} />

      {/* Reset Password Modal */}
      <ResetPasswordModal isOpen={isResetPasswordModalOpen} handleClose={handleCloseResetPasswordModal} />
    </div>
  );
};

export default LoginSignupForm;
