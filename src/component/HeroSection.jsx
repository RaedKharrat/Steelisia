import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import logoSteelisia from "./logoSteelisia.png";
import { FaDownload } from "react-icons/fa";
import axios from "axios";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/shop?categoryId=6730d2bf4e5f6d1bf8cd2536");
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(
        "https://steelisia-tunisie.onrender.com/product/download-pdf",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "product_details.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
  };

  return (
    <div className="hero-section">
      {/* Left side - logo */}
      <div className="logo-container">
        <img src={logoSteelisia} alt="Steelisia Logo" className="logo-image" />
      </div>

      {/* Right side - hero content */}
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="thin-text">Trouvez votre meuble en ligne</span>{" "}
          <strong className="bold-text">Steelisia 🇹🇳</strong>
        </h1>
        <p className="hero-description" style={{color:'white'}}>
          L’élégance rencontre la robustesse. Explorez notre collection de
          meubles en bois et fer pour transformer votre intérieur en œuvre
          d'art.
        </p>
        <div className="button-container">
          <button className="hero-button" onClick={handleButtonClick}>
            Découvrir Nos Offres
          </button>
          <button className="download-button" onClick={handleDownloadPDF}>
            <FaDownload size={20} />
            Téléchargé catalogue
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
