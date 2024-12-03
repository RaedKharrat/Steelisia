import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Modal from './Modal';
import OtpModal from './OtpModal';
import ResetPasswordModal from './ResetPasswordModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faPhone, faMapMarkerAlt, faEye, faEyeSlash, faBuilding } from '@fortawesome/free-solid-svg-icons';
import logoapp from './logoSteelisiaBB.png';
import logoapp2 from './logoSteelisiaBB.png';
import { ToastContainer, toast } from 'react-toastify';
import GoogleAuthButton from './GoogleOauthButton'; // Assurez-vous que le chemin est correct

const LoginSignupForm = () => {
  const navigate = useNavigate();
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Suivi de la visibilité du modal
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState(''); // État pour contenir l'email

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
    setIsModalOpen(true); // Afficher le modal lorsque "Mot de passe oublié" est cliqué
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fermer le modal lorsqu'on annule
  };

  const handleOpenOtpModal = () => {
    setIsModalOpen(false); // Fermer le modal lorsqu'on ouvre le modal OTP
    setIsOtpModalOpen(true);
  };

  const handleCloseOtpModal = () => {
    setIsOtpModalOpen(false);
  };

  const handleVerify = () => {
    console.log("OTP Vérifié");
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
      const response = await axios.post('https://steelisia-tunisie.onrender.com/user/login', { email, password });

      if (response.data && response.data.jwt) {
        const token = response.data.jwt;
        localStorage.setItem('authToken', token);
        navigate('/home');
        resetBodyStyles();
      } else {
        setErrorMessage('Échec de la connexion : aucun jeton reçu');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Échec de la connexion');
      console.error('Erreur de connexion:', error);
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
    const companyName = event.target[6].value;
    const role = "Client";

    try {
      const response = await axios.post("https://steelisia-tunisie.onrender.com/user/signup", {
        first_name,
        last_name,
        email,
        password,
        phone,
        adresse,
        companyName,
        role,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter à votre compte.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Échec de l'inscription");
      console.error("Erreur d'inscription:", error.response);
    }
  };

  const handleSubmitEmail = (submittedEmail) => {
    setEmail(submittedEmail);
    handleOpenOtpModal();
  };

  return (
    <div className="containerauth">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

      <input type="checkbox" id="flip" />
      <div className="cover">
        <div className="front">
          <img src="/Frontoffice/assets/images/backgroundLogin1.jfif" alt="" />
          <div className="text">
            <span className="text-1">Transformez votre espace <br /> avec notre mobilier et décoration uniques</span>
            <span className="text-2">Le style rencontre la fonctionnalité</span>
          </div>
        </div>
        <div className="back">
          <img className="backImg" src="/Frontoffice/assets/images/backgroundImg22.jfif" alt="" />
          <div className="text">
            <span className="text-1">Découvrez des pièces intemporelles <br /> pour chaque pièce</span>
            <span className="text-2">Élevez votre expérience à la maison</span>
          </div>
        </div>
      </div>
      <div className="forms">
        <div className="form-content">
          <div className="login-form">
            <img src={logoapp2} alt="Logo" className="form-logo" />
            <div className="title">Connexion</div>
            <form onSubmit={handleLogin}>
              <div className="input-boxes">
                <div className="input-box">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input type="text" placeholder="Entrez votre email" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faLock} />
                  <input type={showPasswordLogin ? 'text' : 'password'} placeholder="Entrez votre mot de passe" required />
                  <span onClick={togglePasswordVisibilityLogin}>
                    <FontAwesomeIcon icon={showPasswordLogin ? faEyeSlash : faEye} />
                  </span>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="text"><a onClick={handleForgotPasswordClick} style={{ color: 'orange' }}>Mot de passe oublié ?</a></div>
                <div className="button input-box">
                  <input type="submit" value="se connecte" />
                </div>
                <div className="text sign-up-text">Vous n'avez pas de compte ? <label htmlFor="flip" style={{ color: 'orange' }}>Inscrivez-vous maintenant</label></div>
              </div>
            </form>

            {/* Bouton d'authentification Google */}
            <div className="google-login" style={{margin:'20px'}}>
              <GoogleAuthButton />
            </div>
          </div>

          <div className="signup-form">
            <img src={logoapp} alt="Logo" className="form-logo" />
            <div className="title">Créer un compte</div>
            <form onSubmit={handleSignup}>
              <div className="input-boxes">
                <div className="input-box">
                  <FontAwesomeIcon icon={faUser} />
                  <input type="text" placeholder="Entrez votre prénom" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faUser} />
                  <input type="text" placeholder="Entrez votre nom" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input type="text" placeholder="Entrez votre email" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faLock} />
                  <input type={showPasswordSignup ? 'text' : 'password'} placeholder="Entrez votre mot de passe" required />
                  <span onClick={togglePasswordVisibilitySignup}>
                    <FontAwesomeIcon icon={showPasswordSignup ? faEyeSlash : faEye} />
                  </span>
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faPhone} />
                  <input type="text" placeholder="Entrez votre numéro de téléphone" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <input type="text" placeholder="Entrez votre adresse" required />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faBuilding} />
                  <input type="text" placeholder="Entrez le nom de votre entreprise" required />
                </div>
                <div className="button input-box">
                  <input type="submit" value="Soumettre" />
                </div>
                <div className="text sign-in-text">Vous avez déjà un compte ? <label htmlFor="flip" style={{ color: 'orange' }}>Connectez-vous</label></div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal} />
      <OtpModal open={isOtpModalOpen} onClose={handleCloseOtpModal} onVerify={handleVerify} />
      <ResetPasswordModal open={isResetPasswordModalOpen} onClose={handleCloseResetPasswordModal} />
    </div>
  );
};

export default LoginSignupForm;
