import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <div className="main-banner" id="top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="owl-carousel owl-banner">
              <div className="item item-1">
                <div className="header-text">
                  <span className="category">Exclusive Collection</span>
                  <h2>Transform Your Space with Stunning Furniture</h2>
                  <p>Discover our exquisite range of furniture designed to elevate your home. From modern to classic, find pieces that reflect your style and personality.</p>
                  <div className="buttons">
                    <div className="main-button">
                      <a href="#">Shop Now</a>
                    </div>
                  
                  </div>
                </div>
              </div>
              <div className="item item-2">
                <div className="header-text">
                  <span className="category">Best Sellers</span>
                  <h2>Furnish Your Dream Home with Top Picks</h2>
                  <p>Check out our best-selling furniture pieces that have captivated hearts! Enjoy unmatched quality and style at amazing prices.</p>
                  <div className="buttons">
                    <div className="main-button">
                      <a href="#">Request a Catalog</a>
                    </div>
              
                  </div>
                </div>
              </div>
              <div className="item item-3">
                <div className="header-text">
                  <span className="category">Online Shopping</span>
                  <h2>Convenient Shopping from Home</h2>
                  <p>Experience a seamless shopping journey with us. Browse, compare, and order your favorite furniture without leaving your home.</p>
                  <div className="buttons">
                    <div className="main-button">
                      <a href="#">Start Shopping</a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
