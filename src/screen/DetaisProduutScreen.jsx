import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header.jsx';
import LoadingScreen from '../component/LoadingScreen.jsx';
import Footer from '../component/Footer.jsx';
import DetailsProduit from '../component/DetaisProduitC.jsx';

const DetaisProduutScreen = () => {
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]); // Maintain cart state
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading

    return () => clearTimeout(timer);
  }, []);

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const updateCartCount = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    setCartCount(newCart.length);
  };
  

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Header cartCount={cartCount} onCartClick={toggleCartModal} />
      <DetailsProduit updateCartCount={updateCartCount} />
      <Footer />
    </div>
  );
};

export default DetaisProduutScreen;
