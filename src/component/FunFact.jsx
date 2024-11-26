import React from 'react';
//import './FunFacts.css'; // Import CSS file if necessary

const FunFacts = () => {
  return (
    <div className="section fun-facts" style={{marginBottom:'70px'}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="wrapper">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="counter">
                    <h2 className="timer count-title count-number" data-to="50" data-speed="5000">50</h2>
                    <p className="count-text">Produits</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="counter">
                    <h2 className="timer count-title count-number" data-to="200" data-speed="5000">200</h2>
                    <p className="count-text">Client Verifié</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="counter">
                    <h2 className="timer count-title count-number" data-to="10" data-speed="5000">10</h2>
                    <p className="count-text">Entreprise Conventionnelle</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="counter end">
                    <h2 className="timer count-title count-number" data-to="1" data-speed="5000">1</h2>
                    <p className="count-text">Années d'expérience
                    </p>
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
