import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faTruck, faUserTie } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  return (
    <div className="services section" id="services">
      <div className="container">
        <h1 className="text-center" style={{ marginBottom: '7rem' }}>
          <strong>Our</strong> <span style={{ fontWeight: '100' }}>Services</span>
        </h1>

        <div className="row">
          {/* Custom Furniture Service */}
          <div className="col-lg-4 col-md-6">
            <div className="service-item">
              <div className="icon">
                <FontAwesomeIcon icon={faCouch} size="4x" style={{ color: 'white', marginBottom: '-1rem' }} />
              </div>
              <div className="main-content">
                <h4>Custom Furniture</h4>
                <p>Bring your dream furniture to life with our custom design services tailored to your style and space.</p>
                <div className="main-button">
                  <a href="#">Learn More</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Livraison Service */}
          <div className="col-lg-4 col-md-6">
            <div className="service-item">
              <div className="icon">
                <FontAwesomeIcon icon={faTruck} size="4x" style={{ color: 'white', marginBottom: '-1rem' }} />
              </div>
              <div className="main-content">
                <h4>Livraison Service</h4>
                <p>Enjoy swift and reliable delivery to bring your furniture right to your doorstep, hassle-free.</p>
                <div className="main-button">
                  <a href="#">Discover Now</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Expert Consultation */}
          <div className="col-lg-4 col-md-6">
            <div className="service-item">
              <div className="icon">
                <FontAwesomeIcon icon={faUserTie} size="4x" style={{ color: 'white', marginBottom: '-1rem' }} />
              </div>
              <div className="main-content">
                <h4>Expert Consultation</h4>
                <p>Get personalized advice from our furniture experts to find the perfect pieces for your space.</p>
                <div className="main-button">
                  <a href="#">Book a Session</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
