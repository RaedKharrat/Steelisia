import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header.jsx';
import LoadingScreen from '../component/LoadingScreen.jsx'; // Import the Preloader component
import Services from '../component/Services.jsx';
import AboutUs from '../component/AboutUs.jsx';
import MainBanner from '../component/MainBanner.jsx';
import FunFacts from '../component/FunFact.jsx';
import Testimonials from '../component/Testimonials.jsx';
import ContactUs from '../component/Contact.jsx';
import Footer from '../component/Footer.jsx';
import NewestProducts from '../component/NewestProducts.jsx';
import RandomP from '../component/RandomP.jsx';

const AboutUsScreen = () => {
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
      <AboutUs />
      <FunFacts />
      <Services />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default AboutUsScreen;
