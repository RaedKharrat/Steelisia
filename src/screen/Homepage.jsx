import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header.jsx';
import LoadingScreen from '../component/LoadingScreen.jsx'; // Import the Preloader component
import FunFacts from '../component/FunFact.jsx';
import NewestProductsSlider from '../component/NewestProductsSlider.jsx';
import ContactUs from '../component/Contact.jsx';
import Footer from '../component/Footer.jsx';
import HeroSection from '../component/HeroSection.jsx';
import CategorySection from '../component/CategorySection.jsx';



const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading) {
    return <LoadingScreen />; // Render Preloader if loading is true
  }

  return (
    <div>
      <Header />
      <HeroSection />

      <NewestProductsSlider />
      <FunFacts />
      <CategorySection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Homepage;
