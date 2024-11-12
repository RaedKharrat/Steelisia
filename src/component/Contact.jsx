import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:noreplysteelisia@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)} - From: ${encodeURIComponent(email)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-us section" id="contact">
      <div className="container">
        <div className="row">
          {/* Updated Content for Social Media Links and Map */}
          <div className="col-lg-6 align-self-center">
            <div className="section-heading">
              <h6>Follow Us</h6>
              <div className="social-links">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i> Facebook
                </a>
              </div>
              <h4 style={{marginBottom:'-40px' , marginTop:'50px'}}>Our Location</h4>
              <p>Find us at our physical store to explore our collection in person.</p>
              {/* Embed Google Map */}
              <div 
                className="map-container" 
                style={{
                  padding: '5px', // to provide some spacing inside the border
                  borderRadius: '30px', 
                  borderWidth: '30px', 
                  borderStyle: 'solid',
                  borderImage: 'linear-gradient(0deg, #2b2b2b, #2b2b2b) 1'
                }}
              >
                <iframe
                  title="location-map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5578678241767!2d-122.41941568468137!3d37.774929279758816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c8f8e5e0d%3A0x102ee0e5f7eabbeb!2sSteelisia%20Furniture!5e0!3m2!1sen!2sus!4v1634106468540!5m2!1sen!2sus"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '8px' }} // optional: add rounding to iframe
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="contact-us-content">
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <fieldset>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Name..."
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Your E-mail..."
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Tell us your furniture needs..."
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="orange-button">
                        Send Your Message
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for Styling Social Links and Map */}
      <style>
        {`
          .section-heading .social-links {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
          }
          .section-heading .social-links a {
            text-decoration: none;
            color: #333;
            font-size: 1.2em;
          }
          .section-heading .social-links a i {
            margin-right: 8px;
            color: #ff4500;
          }
          .map-container {
            margin-top: 20px;
            border-radius: 10px;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default ContactUs;
