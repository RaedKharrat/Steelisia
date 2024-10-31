import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './component/Header.jsx';
import Preloader from './component/Preloader.jsx';
import MainBanner from './component/MainBanner.jsx';
import FurnitureSales from './component/Courses.jsx';
import Footer from './component/Footer.jsx';




const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

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

          <FurnitureSales />

          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
