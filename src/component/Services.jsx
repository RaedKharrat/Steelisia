import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faTruck, faUserTie } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  return (
    <div className="services section" id="services">
      <div className="container">
        <h1 className="text-center" style={{ marginBottom: '7rem' }}>
          <strong>Nos</strong> <span style={{ fontWeight: '100' }}>Services</span>
        </h1>

        <div className="row">
          {/* Service de Meubles Sur Mesure */}
          <div className="col-lg-4 col-md-6">
            <div className="service-item">
              <div className="icon">
                <FontAwesomeIcon icon={faCouch} size="4x" style={{ color: 'white', marginBottom: '-1rem' }} />
              </div>
              <div className="main-content">
                <h4 style={{color:'orangered'}}>Meubles Sur Mesure</h4>
                <p>Donnez vie à vos meubles de rêve grâce à nos services de conception personnalisée adaptés à votre style et votre espace.</p>
                <div className="main-button">
                  <a href="#">En Savoir Plus</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Service de Livraison */}
          <div className="col-lg-4 col-md-6">
            <div className="service-item">
              <div className="icon">
                <FontAwesomeIcon icon={faTruck} size="4x" style={{ color: 'white', marginBottom: '-1rem' }} />
              </div>
              <div className="main-content">
                <h4 style={{color:'orangered'}}>Service de Livraison</h4>
                <p>Profitez d'une livraison rapide et fiable pour recevoir vos meubles directement chez vous, sans tracas.</p>
                <div className="main-button">
                  <a href="#">Découvrez Maintenant</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Consultation d'Expert */}
          <div className="col-lg-4 col-md-6">
            <div className="service-item">
              <div className="icon">
                <FontAwesomeIcon icon={faUserTie} size="4x" style={{ color: 'white', marginBottom: '-1rem' }} />
              </div>
              <div className="main-content">
                <h4 style={{color:'orangered'}}>Consultation d'Expert</h4>
                <p>Bénéficiez de conseils personnalisés de nos experts en ameublement pour trouver les pièces parfaites pour votre espace.</p>
                <div className="main-button">
                  <a href="#contact">Réserver une Session</a>
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
