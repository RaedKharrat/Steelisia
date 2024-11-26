import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header.jsx';
import LoadingScreen from '../component/LoadingScreen.jsx';
import Footer from '../component/Footer.jsx';
import DetailsProduit from '../component/DetaisProduitC.jsx';
import CartModal from '../component/cartModal.jsx';

const DetaisProduutScreen = () => {
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  // Load cart items from local storage on mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedItems = JSON.parse(storedCartItems);
      setCartItems(parsedItems);
      setCartCount(parsedItems.length);
    }
  }, []);

  // Save cart items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Simulate a loading screen for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const updateCartCount = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setCartCount(cartCount + 1);
  };

  const handleClearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('cartItems'); // Clear local storage
  };

  const toggleCartModal = () => setCartModalOpen(!cartModalOpen);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Header cartCount={cartCount} onCartClick={toggleCartModal} />
      {/* <h2 style={{    background: '#1b1b1b', padding:'20px', marginTop :'70px' , color:'white' , textAlign: 'center', fontWeight: 'bold', borderRadius:'50px',marginRight:'20px',marginLeft:'20px' }}>   Product details  </h2> */}

      <DetailsProduit updateCartCount={updateCartCount} />
      <Footer />
      {cartModalOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={toggleCartModal}
          onCartUpdate={handleClearCart}
        />
      )}
    </div>
  );
};

export default DetaisProduutScreen;
