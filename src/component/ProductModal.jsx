import React, { useState, useEffect } from 'react';
import { FaShoppingBasket } from 'react-icons/fa'; // Changed to a more significant icon
import { FaTimes } from 'react-icons/fa'; // Adding the 'Esc' icon for closing the modal

const ProductModal = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }, 2500); // Change image every 2.5 seconds

    return () => clearInterval(interval);
  }, [product.images.length]);

  if (!product) return null;

  // Determine state background color
  const stateColor = product.etat === 'disponible' ? 'green' : 'red';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for modal
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        overflow: 'auto', // Allow scrolling if content overflows
      }}
    >
      <div
        style={{
          backgroundColor: '#1E1E1E', // Dark background for the modal
          borderRadius: '20px',
          padding: '20px',
          width: '90%', // Set to 90% for responsiveness
          maxWidth: '600px', // Max width to keep the modal in control
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          position: 'relative',
          overflowY: 'auto', // Allow scrolling of content if it overflows
          maxHeight: '90vh', // Limiting max height to 90% of the viewport height
        }}
      >
        <button
          style={{
            color: 'white',
            background: 'linear-gradient(to right, orange, red)',
            border: 'none',
            borderRadius: '50%',
            padding: '8px', 
            position: 'absolute',
            top: '10px',
            left: '10px',
            cursor: 'pointer',
            fontSize: '10px',
          }}
          onClick={onClose}
        >
          <FaTimes />
        </button>
{/* Centered State Overlay at the top */}
<span
            style={{
              backgroundColor: stateColor,
              color: 'white',
              padding: '5px 10px',
              borderRadius: '10px',
              fontWeight: 'bold',
              opacity: '0.9',
              fontSize: '0.8rem',
            }}
          >
            {product.etat}
          </span>
        <h2
          style={{
            color: '#fff', // Light color for text in dark mode
            backgroundColor: '#2b2b2b',
            borderRadius: '20px',
            padding: '10px',
            marginBottom: '15px',
            fontSize: '1.4rem',
          }}
        >
          {product.name}
        </h2>

        <div
          style={{
            position: 'relative',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            src={`https://steelisia-tunisie.onrender.com/images/${product.images[currentImageIndex]}`}
            alt={`${product.name} ${currentImageIndex + 1}`}
            style={{
              width: 'auto',
              height: 'auto',
              maxHeight: '400px', // Make sure images don't exceed a certain height
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          
          
          {/* Dot Indicator Below Image */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            {product.images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  width: '10px',
                  height: '10px',
                  margin: '0 5px',
                  borderRadius: '50%',
                  backgroundColor: index === currentImageIndex ? 'orange' : 'gray',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(to right, orange, red)',
            padding: '15px',
            margin: '10px',
            borderRadius: '20px',
            color: '#F0F0F0',
          }}
        >
          DT <strong> {product.prix}</strong>DT
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
