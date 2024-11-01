import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './component/Header.jsx';
import Preloader from './component/Preloader.jsx';
import Services from './component/Services.jsx';
import AboutUs from './component/AboutUs.jsx';
import MainBanner from './component/MainBanner.jsx';
import FunFacts from './component/FunFact.jsx';
import Testimonials from './component/Testimonials.jsx';
import Events from './component/Events.jsx';
import Signin from './component/Signin.jsx';
import ContactUs from './component/Contact.jsx';
import Footer from './component/Footer.jsx';




const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Signin />
         
        </>
      )}
    </div>
  );
};

export default App;
