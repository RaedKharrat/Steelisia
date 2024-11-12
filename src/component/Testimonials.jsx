import React, { useEffect, useState } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "I couldn't be happier with my custom-made sectional! The quality and craftsmanship are incredible, and it fits perfectly in my living room. Thank you for bringing my vision to life!",
      img: "/Frontoffice/assets/images/profile-pic (1).png",
      name: "Kharrat Raed",
      role: "Software Engineer",
    },
    {
      text: "The delivery service was amazing – fast, professional, and careful with the furniture. Our new dining set is stunning, and the customer service was top-notch from start to finish!",
      img: "/Frontoffice/assets/images/alimochlilwayn.JPG",
      name: "Ayouni Aly",
      role: "Business Advisor",
    },
    {
      text: "Finding the perfect pieces for our space was easy with their consultation service. We are thrilled with our new furniture, and it has completely transformed our home!",
      img: "/Frontoffice/assets/images/testimonial-author.jpg",
      name: "Ayari Chayma",
      role: "Satisfied Customer",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // Autoplay every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="section testimonials" style={{ marginTop: '30px' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="testimonial-slider">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`item ${index === currentIndex ? 'active' : ''}`}
                  style={{ display: index === currentIndex ? 'block' : 'none' }}
                >
                  <p>“{testimonial.text}”</p>
                  <div className="author">
                    <img src={testimonial.img} alt={testimonial.name} />
                    <span className="category">{testimonial.role}</span>
                    <h4>{testimonial.name}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className="dots">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
          </div>

          <div className="col-lg-5 align-self-center">
            <div className="section-heading">
              <h6>TESTIMONIALS</h6>
              <h2>What our customers are saying</h2>
              <p>
                Our clients love our selection of furniture, custom design
                options, and exceptional customer service. Here’s what they
                have to say about shopping with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for Dots and Slider */}
      <style>
        {`
          .testimonial-slider {
            position: relative;
            overflow: hidden;
          }
          .testimonial-slider .item {
            transition: opacity 0.5s ease-in-out;
          }
          .dots {
            text-align: center;
            margin-top: 15px;
          }
          .dot {
            height: 12px;
            width: 12px;
            margin: 0 5px;
            background-color: #ddd;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .dot.active {
            background-color: #ff4500;
          }
        `}
      </style>
    </div>
  );
};

export default Testimonials;
