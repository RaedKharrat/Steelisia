import React from 'react';

const FurnitureSales = () => {
  return (
    <section className="section furniture-sales" id="furniture-sales">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-heading">
              <h6>Shop</h6>
              <h2>Latest Furniture Items for Sale</h2>
            </div>
          </div>
        </div>
        <ul className="event_filter">
          <li>
            <a className="is_active" href="#!" data-filter="*">Show All</a>
          </li>
          <li>
            <a href="#!" data-filter=".design">Sofas</a>
          </li>
          <li>
            <a href="#!" data-filter=".development">Tables</a>
          </li>
          <li>
            <a href="#!" data-filter=".wordpress">Chairs</a>
          </li>
        </ul>
        <div className="row event_box">
          <div className="col-lg-4 col-md-6 align-self-center mb-30 event_outer design">
            <div className="events_item">
              <div className="thumb">
                <a href="#"><img src="/Frontoffice/assets/images/course-01.jpg" alt="Comfortable Sofa" /></a>
                <span className="category">Sofa</span>
                <span className="price"><h6><em>$</em>850</h6></span>
              </div>
              <div className="down-content">
                <span className="author">Modern Living</span>
                <h4>Luxury Comfort Sofa</h4>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6 align-self-center mb-30 event_outer wordpress design">
            <div className="events_item">
              <div className="thumb">
                <a href="#"><img src="/Frontoffice/assets/images/course-06.jpg" alt="Sectional Sofa" /></a>
                <span className="category">Sofa</span>
                <span className="price"><h6><em>$</em>900</h6></span>
              </div>
              <div className="down-content">
                <span className="author">Luxury Living</span>
                <h4>Spacious Sectional Sofa</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FurnitureSales;
