import React, { useEffect } from 'react';
//import './Testimonials.css'; // Import the CSS file

const Testimonials = () => {
  useEffect(() => {
    const $ = window.$; // Ensure jQuery is available globally
    $('.owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
    });
  }, []);

  return (
    <div className="section testimonials">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="owl-carousel owl-testimonials">
              <div className="item">
                <p>“I couldn't be happier with my custom-made sectional! The quality and craftsmanship are incredible, and it fits perfectly in my living room. Thank you for bringing my vision to life!”</p>
                <div className="author">
                  <img src="/Frontoffice/assets/images/profile-pic (1).png" alt="Claude David" />
                  <span className="category">Software Engineer</span>
                  <h4>Kharrat Raed</h4>
                </div>
              </div>
              <div className="item">
                <p>“The delivery service was amazing – fast, professional, and careful with the furniture. Our new dining set is stunning, and the customer service was top-notch from start to finish!”</p>
                <div className="author">
                  <img src="/Frontoffice/assets/images/alimochlilwayn.JPG" alt="Thomas Jefferson" />
                  <span className="category">Business Advisor </span>
                <h4>Ayouni Aly</h4>
                </div>
              </div>
              <div className="item">
                <p>“Finding the perfect pieces for our space was easy with their consultation service. We are thrilled with our new furniture, and it has completely transformed our home!”</p>
                <div className="author">
                  <img src="/Frontoffice/assets/images/testimonial-author.jpg" alt="Stella Blair" />
                  <span className="category">Satisfied Customer</span>
                  <h4>Ayari Chayma</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 align-self-center">
            <div className="section-heading">
              <h6>TESTIMONIALS</h6>
              <h2>What our customers are saying</h2>
              <p>Our clients love our selection of furniture, custom design options, and exceptional customer service. Here’s what they have to say about shopping with us.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
