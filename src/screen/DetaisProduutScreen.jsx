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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading

    return () => clearTimeout(timer);
  }, []);

  const updateCartCount = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setCartCount(cartCount + 1);
  };
  const handleClearCart = () => {
    setCartCount(0);
  };
  const toggleCartModal = () => setCartModalOpen(!cartModalOpen);
  

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Header cartCount={cartCount} onCartClick={toggleCartModal} />
      <DetailsProduit updateCartCount={updateCartCount} />
      <Footer />
      {cartModalOpen && <CartModal cartItems={cartItems} onClose={toggleCartModal}   onCartUpdate={handleClearCart}  />}

    </div>
  );
};

export default DetaisProduutScreen;
