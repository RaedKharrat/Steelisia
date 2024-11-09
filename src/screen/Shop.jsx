import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header.jsx';
import MainBanner2 from '../component/MainBannerShop.jsx';
import FurnitureSales from '../component/ShopComponent.jsx';
import Footer from '../component/Footer.jsx';
import CartModal from '../component/cartModal.jsx'; // Import CartModal

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0); // Initialize cartCount state
  const [cartItems, setCartItems] = useState([]); // Cart items state
  const [cartModalOpen, setCartModalOpen] = useState(false); // Cart modal visibility state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay for the loading screen

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const updateCartCount = (item) => {
    setCartItems((prevItems) => [...prevItems, item]); // Add item to cart
    setCartCount(cartCount + 1);
  };
  const toggleCartModal = () => setCartModalOpen(!cartModalOpen); // Toggle modal open/close

  if (loading) {
    // You can add a loader or spinner here while the content is loading
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header cartCount={cartCount} onCartClick={toggleCartModal} /> {/* Open modal on cart click */}
      <MainBanner2 />
      <FurnitureSales updateCartCount={updateCartCount} />
      <Footer />
      {cartModalOpen && <CartModal cartItems={cartItems} onClose={toggleCartModal} />} {/* Show modal if open */}
    </div>
  );
};

export default Shop;
