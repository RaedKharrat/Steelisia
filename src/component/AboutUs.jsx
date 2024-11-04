import React from 'react';
// import './AboutUs.css'; // Import any necessary CSS

const AboutUs = () => {
  return (
    <div className="section about-us"  id="team">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-1">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Our Story
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Our journey began with a passion for quality craftsmanship and unique furniture designs. We believe that each piece in your home should tell a story and bring comfort and style into your life.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Our Design Philosophy
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    We prioritize sustainable materials and timeless designs that not only enhance your space but also respect the environment. Our design team carefully selects every element to ensure beauty, functionality, and durability.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Why Choose Us?
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    From custom furniture to curated decor essentials, we offer everything to bring your home to life. Our expert team and exceptional customer service make every purchase a seamless experience.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Unmatched Customer Support
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Our support team is here to assist you every step of the way, from design consultations to delivery. We are committed to making sure you’re delighted with every purchase.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 align-self-center">
            <div className="section-heading">
              <h6>About Us</h6>
              <h2>Creating Beautiful, Lasting Furniture for Every Space</h2>
              <p>We blend traditional craftsmanship with modern designs to create furniture that speaks to your unique style. Each piece is crafted with care, ensuring quality and beauty for years to come.</p>
              <div className="main-button">
                <a href="#">Learn More About Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
