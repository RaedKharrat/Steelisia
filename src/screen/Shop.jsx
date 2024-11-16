import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header.jsx';
import MainBanner2 from '../component/MainBannerShop.jsx';
import FurnitureSales from '../component/ShopComponent.jsx';
import Footer from '../component/Footer.jsx';
import CartModal from '../component/cartModal.jsx';
import LoadingScreen from '../component/LoadingScreen.jsx'; // Import LoadingScreen
import ShopProduit from '../component/shopByCategorie.jsx'; // Import LoadingScreen

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 2 seconds delay for the loading screen

    return () => clearTimeout(timer); // Cleanup on unmount
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
    return <LoadingScreen  />; // Use LoadingScreen here
  }

  return (
    <div>
      <Header cartCount={cartCount} onCartClick={toggleCartModal} />
      <ShopProduit updateCartCount={updateCartCount} />
      <Footer />
      {cartModalOpen && <CartModal cartItems={cartItems} onClose={toggleCartModal}   onCartUpdate={handleClearCart}  />}
    </div>
  );
};

export default Shop;
