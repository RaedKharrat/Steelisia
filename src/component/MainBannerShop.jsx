import React, { useEffect } from 'react';

const MainBanner = () => {
  useEffect(() => {
    const $ = window.$; // Ensure jQuery is available globally
    $('.owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
    });
  }, []);

  // Inline styles for the h1 title
  const titleStyle = {
    fontSize: '80px', // Large font size
    fontWeight: 'bold', // Bold text
    color: 'white', // White text color
    textAlign: 'center', // Centered text
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)', // Optional: text shadow for readability
  };

  // Inline styles for the container
  const bannerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50', // Optional background color for contrast
    position: 'relative',
  };

  return (
    <div className="main-banner2" id="top" style={bannerStyle}>
            <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="owl-carousel owl-banner">
      <h1 style={titleStyle}>Shop</h1>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default MainBanner;
