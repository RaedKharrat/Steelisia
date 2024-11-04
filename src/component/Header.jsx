import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.css';
import logoApp from './logoApp.png';
import logoApp2 from './logoApp2.png';

const Header = () => {
  const [logo, setLogo] = useState(logoApp);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleMouseEnter = () => {
    setLogo(logoApp2);
  };

  const handleMouseLeave = () => {
    setLogo(logoApp);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Add your search handling logic here
    }
  };

  const handleSignInClick = () => {
    navigate('/auth'); // Navigate to the root route using useNavigate
  };
  const handleShop = () => {
    navigate('/shop'); // Navigate to the root route using useNavigate
  };
  const handleHome = () => {
    navigate('/home'); // Navigate to the root route using useNavigate
  };
  return (
    <header
      className="header-area header-sticky"
      style={{
        opacity: 0.95,
          backdropFilter: 'blur(5px)',
        borderRadius: '10px',

      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* Logo Start */}
              <a className="logo"  onClick={handleHome} // Use the click handler here
              >
                <img
                  src={logo}
                  alt="Steelisia Logo"
                  className="logo-img"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    height: '45px',
                    width: 'auto',
                    paddingRight: '50px',
                  }}
                />
              </a>
              {/* Logo End */}

              {/* Search Start */}
              <div className="search-input">
                <form id="search" action="#">
                  <input
                    type="text"
                    placeholder="Type Something"
                    id="searchText"
                    name="searchKeyword"
                    onKeyPress={handleSearchKeyPress}
                  />
                  <i className="fa fa-search"></i>
                </form>
              </div>
              {/* Search End */}

              {/* Menu Start */}
              <ul className="nav">
               
                <li className="scroll-to-section">
                  <a href="#services">Services</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#team">About Us</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#events">Exclusive Offer</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#contact">Contact</a>
                </li>
                <li className="scroll-to-section">
                  <a 
                    style={{ color: 'white', paddingLeft: '80px', fontWeight: 'bold' }} 
                    onClick={handleSignInClick} // Use the click handler here
                  >
                    Sign In
                  </a>
                </li>
                <li className="scroll-to-section">
                  <a 
                    style={{ color: 'white',fontWeight: 'bold' }} 
                    onClick={handleShop} // Use the click handler here
                  >
                  Shop
                  </a>
                </li>
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
              {/* Menu End */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
