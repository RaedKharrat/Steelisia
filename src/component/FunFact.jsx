import React from 'react';
//import './FunFacts.css'; // Import CSS file if necessary

const FunFacts = () => {
  return (
    <div className="section fun-facts">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="wrapper">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="counter">
                    <h2 className="timer count-title count-number" data-to="150" data-speed="1000">150</h2>
                    <p className="count-text">Happy Students</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="counter">
                    <h2 className="timer count-title count-number" data-to="804" data-speed="1000">804</h2>
                    <p className="count-text">Course Hours</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="counter">
                    <h2 className="timer count-title count-number" data-to="50" data-speed="1000">50</h2>
                    <p className="count-text">Employed Students</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="counter end">
                    <h2 className="timer count-title count-number" data-to="15" data-speed="1000">15</h2>
                    <p className="count-text">Years Experience</p>
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

export default FunFacts;
