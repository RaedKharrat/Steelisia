import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './component/Header.jsx';
import Preloader from './component/Preloader.jsx';
import Services from './component/Services.jsx';
import AboutUs from './component/AboutUs.jsx';
import MainBanner from './component/MainBanner.jsx';
import FunFacts from './component/FunFact.jsx';
import TeamSection from './component/Team.jsx';
import Testimonials from './component/Testimonials.jsx';
import Events from './component/Events.jsx';
import Courses from './component/Courses.jsx';
import ContactUs from './component/Contact.jsx';
import Footer from './component/Footer.jsx';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Header />
          <MainBanner />
          <Services />
          <AboutUs />
          <TeamSection />
          <FunFacts />
          <Testimonials />
          <Events />
          <Courses />
          <ContactUs />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
