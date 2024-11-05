import React, { useState, useEffect } from 'react';
import { FaShoppingBasket } from 'react-icons/fa'; // Changed to a more significant icon

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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',  // Semi-transparent background color
        backdropFilter: 'blur(10px)',  // Blur effect for frosted glass effect
        borderRadius: '20px',
        padding: '20px',
        width: '400px',
        maxWidth: '90%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        position: 'relative',
      }}>
        <button
          style={{
            color: 'white',
            backgroundColor: '#2b2b2b',
            border: 'none',
            borderRadius: '20px',
            padding: '5px 10px',
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          X
        </button>
        <h2 style={{
          color: 'black',
          backgroundColor: '#bbbbbb',
          borderRadius: '20px',
          padding: '10px',
        }}>
          {product.name}
        </h2>
        <div style={{
          position: 'relative',
          margin: '20px 0',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <img
            src={`http://localhost:9090/images/${product.images[currentImageIndex]}`}
            alt={`${product.name} ${currentImageIndex + 1}`}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          {/* Centered State Overlay at the top */}
          <span style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: stateColor,
            color: 'white',
            padding: '5px 10px',
            borderRadius: '10px',
            fontWeight: 'bold',
            opacity: '0.8'
          }}>
            {product.etat}
          </span>
          {/* Add to Cart Icon */}
          <button  style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            backgroundColor: '#2b2b2b',
            border: 'none',
            color: 'white',
            padding: '10px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'brown'
          }}>
            <FaShoppingBasket size={20} />
          </button>
        </div>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          padding: '15px',
          margin: '10px',
          borderRadius: '20px',
          color: 'white',
        }}>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> DT {product.prix}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
