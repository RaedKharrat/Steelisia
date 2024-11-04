import React from 'react';
import './Modal.css'; // Import CSS for styling

const ProductModal = ({ product, onClose }) => {
  if (!product) return null; // Don't render if there's no product

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{product.name}</h2>
        <img src={`http://localhost:9090/images/${product.images[0]}`} alt={product.name} />
        <p><strong></strong> DT {product.prix}</p>
        <p><strong>Description:</strong> </p><p>{product.description}</p>
        <p><strong>State:</strong> {product.etat}</p>
        {/* Add more fields as needed */}
    
      </div>
    </div>
  );
};

export default ProductModal;
