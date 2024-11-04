import React from 'react';
//import './Team.css'; // Import CSS file if necessary

const Team = () => {
  return (
    <div className="team section" >
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="team-member">
              <div className="main-content">
                <img src="/Frontoffice/assets/images/member-01.jpg" alt="Sophia Rose" />
                <span className="category">UX Teacher</span>
                <h4>Sophia Rose</h4>
                <ul className="social-icons">
                  <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="team-member">
              <div className="main-content">
                <img src="/Frontoffice/assets/images/member-02.jpg" alt="Cindy Walker" />
                <span className="category">Graphic Teacher</span>
                <h4>Cindy Walker</h4>
                <ul className="social-icons">
                  <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="team-member">
              <div className="main-content">
                <img src="/Frontoffice/assets/images/member-03.jpg" alt="David Hutson" />
                <span className="category">Full Stack Master</span>
                <h4>David Hutson</h4>
                <ul className="social-icons">
                  <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="team-member">
              <div className="main-content">
                <img src="/Frontoffice/assets/images/member-04.jpg" alt="Stella Blair" />
                <span className="category">Digital Animator</span>
                <h4>Stella Blair</h4>
                <ul className="social-icons">
                  <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
