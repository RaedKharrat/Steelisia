import React from 'react';
import './LoadingScreen.css'; // Make sure to create this CSS file for styling

const LoadingScreen = ({ message = "Steelisia is Loading, please wait..." }) => {
  return (
    <div className="loading-screen">
        
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingScreen;
