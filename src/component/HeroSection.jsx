import React from "react";
import "./HeroSection.css";
import logoSteelisia from './logoSteelisia.png';

const HeroSection = () => {
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
        <img 
          src="https://cdn.dribbble.com/users/3752227/screenshots/10861282/media/5ff20e1ea27d71052d6f4e90ac8a0b0b.gif" 
          alt="Product GIF" 
          style={{height:'150px', width:'160px', margin:'20px'}}
        />
        <button className="hero-button" style={{marginLeft:'80px'}}>Nouvelle collection</button>
      </div>
    </div>
  );
};

export default HeroSection;
