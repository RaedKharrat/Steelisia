import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import React from 'react';
//import './Events.css'; // Import CSS file if necessary

const Events = () => {
  return (
    <div className="section events" id="events">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-heading">
              <h6>Promotions</h6>
              <h2>Exclusive Furniture Sales</h2>
            </div>
          </div>

          {/* Event 1 */}
          <div className="col-lg-12 col-md-6">
            <div className="item">
              <div className="row">
                <div className="col-lg-3">
                  <div className="image">
                    <img src="/Frontoffice/assets/images/course-01.jpg" alt="Living Room Set Sale" style={{height:'250px', width:'auto'}} />
                  </div>
                </div>
                <div className="col-lg-9">
                  <ul>
                    <li>
                      <span className="category">Living Room</span>
                      <h4>Exclusive Living Room Set Sale</h4>
                    </li>
                    <li>
                      <span>Date:</span>
                      <h6>16 Nov 2024</h6>
                    </li>
                    <li>
                      <span>Duration:</span>
                      <h6>2 Days</h6>
                    </li>
                    <li>
                      <span>Price:</span>
                      <h6>Starting at $999</h6>
                    </li>
                  </ul>
                  <a href="#"><i className="fa fa-angle-right"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* Event 2 */}
          <div className="col-lg-12 col-md-6">
            <div className="item">
              <div className="row">
                <div className="col-lg-3">
                  <div className="image">
                    <img src="/Frontoffice/assets/images/course-06.jpg" alt="Bedroom Furniture Promotion" style={{height:'250px', width:'auto'}}  />
                  </div>
                </div>
                <div className="col-lg-9">
                  <ul>
                    <li>
                      <span className="category">Bedroom</span>
                      <h4>Special Bedroom Furniture Promotion</h4>
                    </li>
                    <li>
                      <span>Date:</span>
                      <h6>20 Nov 2024</h6>
                    </li>
                    <li>
                      <span>Duration:</span>
                      <h6>3 Days</h6>
                    </li>
                    <li>
                      <span>Price:</span>
                      <h6>Up to 30% Off</h6>
                    </li>
                  </ul>
                  <a href="#"><i className="fa fa-angle-right"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* Event 3 */}
          <div className="col-lg-12 col-md-6">
            <div className="item">
              <div className="row">
                <div className="col-lg-3">
                  <div className="image">
                    <img src="/Frontoffice/assets/images/course-01.jpg" alt="Office Furniture Clearance" style={{height:'250px', width:'auto'}} />
                  </div>
                </div>
                <div className="col-lg-9">
                  <ul>
                    <li>
                      <span className="category">Office</span>
                      <h4>Office Furniture Clearance Sale</h4>
                    </li>
                    <li>
                      <span>Date:</span>
                      <h6>25 Nov 2024</h6>
                    </li>
                    <li>
                      <span>Duration:</span>
                      <h6>4 Days</h6>
                    </li>
                    <li>
                      <span>Price:</span>
                      <h6>Starting at $199</h6>
                    </li>
                  </ul>
                  <a href="#"><i className="fa fa-angle-right"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Events;
