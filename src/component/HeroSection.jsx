import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./HeroSection.css";
import logoSteelisia from './logoSteelisia.png';

const HeroSection = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleButtonClick = () => {
    // Navigate to the shop page with the specific categoryId
    navigate("/shop?categoryId=6730d2bf4e5f6d1bf8cd2536");
  };

  return (
    <div className="hero-section">
      {/* Left side with logo */}
      <div className="logo-container">
        <img src={logoSteelisia} alt="Steelisia Logo" className="logo-image" />
      </div>

      {/* Hero Content on the right */}
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="thin-text">Trouvez votre meuble en ligne </span> <strong className="bold-text"> Steelisia 🇹🇳</strong>
        </h1>
        <div className="description-container">
          <p className="hero-description">
            L’élégance rencontre la robustesse. Explorez notre collection de meubles en bois et fer pour transformer votre intérieur en œuvre d'art.
          </p>
        </div>
        <button className="hero-button" onClick={handleButtonClick}>
          Découvrir Nos Offres
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
