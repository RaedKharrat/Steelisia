import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from '../component/Header.jsx';
import LoadingScreen from '../component/LoadingScreen.jsx'; 
import ContactUs from '../component/Contact.jsx';
import Footer from '../component/Footer.jsx';
import CommandeShowcase from '../component/CommandeShowcase.jsx';

const MycommandesScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading) {
    return <LoadingScreen />; // Render Preloader if loading is true
  }

  return (
    <div>
      <Header />
      <CommandeShowcase />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default MycommandesScreen;
