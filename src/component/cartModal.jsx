import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import './CartModal.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartModal = ({ cartItems, onClose, userId, onCartUpdate }) => {
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item, index) => ({ ...acc, [index]: item.quantity || 1 }), {})
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [cart, setCart] = useState(cartItems); // Local cart state to manage item removal

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
    return cart.reduce((total, item, index) => total + calculateTotalPrice(item, index), 0);
  };

  const handleDeleteItem = (index) => {
    // Remove the item from the cart state
    const updatedCartItems = cart.filter((_, i) => i !== index);
    
    // Recalculate quantities for remaining items
    setQuantities(prevQuantities => {
      const { [index]: _, ...rest } = prevQuantities;
      return rest;
    });

    // Update the local cart state
    setCart(updatedCartItems);

    // Call the parent component to update cart in the parent state (if needed)
    if (onCartUpdate) {
      onCartUpdate(updatedCartItems);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      setErrorMessage('No authentication token found.');
      return;
    }
  
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
  
      if (!userId) {
        setErrorMessage('User ID not found in token.');
        return;
      }
  
      if (!cart || cart.length === 0) {
        setErrorMessage('Your cart is empty.');
        return;
      }
  
      const requestData = {
        userId,
        products: cart.map((item, index) => ({
          productId: item._id.toString(),
          quantity: quantities[index] || 1,
        })),
      };
  
      const response = await axios.post('http://localhost:9090/cmd/commande/', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Checkout successful:', response.data);
  
      // Show success notification
      toast.success('🎉 Your Commande have been successfully sent !!', {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#4CAF50',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 'bold',
        },
        icon: "🛒",
      });
  
      // Clear the cart and quantities after successful checkout
      setCart([]);
      setQuantities({});
      onCartUpdate([]); // Update the cart count in the parent component (if applicable)
      
      // Delay the closing of the modal to allow the toast to show
      setTimeout(() => {
        onClose();
      }, 2500); // 1-second delay before closing the modal
  
    } catch (error) {
      console.error('Error during checkout:', error.response ? error.response.data : error);
      setErrorMessage('Error during checkout.');
    }
  };
  

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <ToastContainer /> {/* Ensure ToastContainer is present */}
        <div className="cart-header" style={{ backgroundColor: '#2b2b2b' }}>
          <h2 style={{ color: 'white' }}>
            Shopping Cart <i className="fa fa-shopping-cart" style={{ margin: '18px', color: 'white' }}></i>
          </h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="total-amount">
          <p>Total Amount:</p>
          <h1 style={{ color: '#2b2b2b', fontWeight: 'bold' }}>
            {calculateTotalAmount().toFixed(2)}  Dt
          </h1>
          <hr className="total-amount-separator" />
        </div>

        <ul className="cart-items">
          {cart.map((item, index) => (
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
                Total: <span>{calculateTotalPrice(item, index).toFixed(2)} Dt</span>
              </p>
              {/* Delete button */}
              <button
                className="delete-item-button"
                onClick={() => handleDeleteItem(index)}
                style={{
                  backgroundColor: '#D9533A', // Red color for delete
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                <i className="fa fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
        <hr className="total-amount-separator" />

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button className="checkout-button" style={{ marginBottom: '10px' }} onClick={handleCheckout}>
          <i className="fa fa-check-circle" style={{ marginRight: '8px' }}></i> Checkout
        </button>
      </div>
    </div>
  );
};

export default CartModal;
