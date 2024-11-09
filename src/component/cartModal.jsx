import React, { useState } from 'react';
import axios from 'axios';  // Import axios for making API requests
import { jwtDecode } from 'jwt-decode';
import './CartModal.css';

const CartModal = ({ cartItems, onClose, userId }) => {  // Add userId prop
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item, index) => ({ ...acc, [index]: item.quantity || 1 }), {})
  );
  const [errorMessage, setErrorMessage] = useState(''); // Define state for error messages

  const handleQuantityChange = (index, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: newQuantity,
    }));
  };

  const calculateTotalPrice = (item, index) => {
    const quantity = quantities[index] || 1;
    return item.prix * quantity;
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item, index) => total + calculateTotalPrice(item, index), 0);
  };

  // Handle the checkout
  const handleCheckout = async () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      setErrorMessage('No authentication token found.');
      return; // Early return if no token is found
    }
  
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      
      if (!userId) {
        setErrorMessage('User ID not found in token.');
        return; // Return early if userId is missing
      }
  
      if (!cartItems || cartItems.length === 0) {
        setErrorMessage('Your cart is empty.');
        return; // Early return if cart is empty
      }
  
      // Prepare request data with proper productId and userId
      const requestData = {
        userId,  // userId passed correctly from token
        products: cartItems.map((item, index) => ({
          productId: item._id.toString(), // Ensure to send the ObjectId as string if needed
          quantity: quantities[index] || 1
        }))
      };
  
      // Log requestData to confirm its structure
      console.log('Request Data:', requestData);
  
      // Send the request to the backend
      const response = await axios.post('http://localhost:9090/cmd/commande/', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Checkout successful:', response.data);
      // Further success handling logic
      
    } catch (error) {
      console.error('Error during checkout:', error.response ? error.response.data : error);
      setErrorMessage('Error during checkout.');
    }
  };
  

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <div className="cart-header" style={{ backgroundColor: '#2b2b2b' }}>
          <h2 style={{ color: 'white' }}>
            Shopping Cart <i className="fa fa-shopping-cart" style={{ margin: '18px', color: 'white' }}></i>
          </h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="total-amount">
          <p>Total Amount:</p>
          <h1 style={{ color: '#2b2b2b', fontWeight: 'bold' }}>
            {calculateTotalAmount().toFixed(2)} Dt
          </h1>
          <hr className="total-amount-separator" />
        </div>

        <ul className="cart-items">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>Price: {item.prix} Dt</p>
              </div>
              <div className="item-quantity">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantities[index]}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10) || 1)}
                />
              </div>
              <p className="total-price">
                Total: <p>{calculateTotalPrice(item, index).toFixed(2)} Dt</p>
              </p>
            </li>
          ))}
        </ul>
        <hr className="total-amount-separator" />

        {/* Display error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button className="checkout-button" style={{ marginBottom: '10px' }} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartModal;
