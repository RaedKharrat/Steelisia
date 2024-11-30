import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./HeroSection.css";
import logoSteelisia from './logoSteelisia.png';
import { FaDownload } from 'react-icons/fa';  // Import FontAwesome download icon
import axios from 'axios';  // For making HTTP requests

const HeroSection = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  // Function to handle the "Découvrir Nos Offres" button click
  const handleButtonClick = () => {
    navigate("/shop?categoryId=6730d2bf4e5f6d1bf8cd2536");
  };

  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get("http://localhost:9090/product/download-pdf", {
        responseType: "blob",  // This is important for downloading files
      });

      // Create a URL for the downloaded PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      // Set download attribute to save the PDF with a filename
      link.href = url;
      link.setAttribute("download", "product_details.pdf");
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up the link element
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
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
        <div className="button-container">
          <button className="hero-button" onClick={handleButtonClick}>
            Découvrir Nos Offres
          </button>
          {/* Download PDF Icon Button */}
          <button className="download-button" onClick={handleDownloadPDF}>
            <FaDownload size={24} /> Telechargé catalogue {/* FontAwesome download icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
