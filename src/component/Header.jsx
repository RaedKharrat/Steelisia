import React, { useState } from 'react';
import './Header.css';
import logoApp from './logoApp.png';
import logoApp2 from './logoApp2.png';


const Header = () => {
  const [logo, setLogo] = useState(logoApp);

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
      // Example: console.log("Searching for:", event.target.value);
    }
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
              <a href="index.html" className="logo">
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
                  <i className="fa fa-search"></i> {/* Restore the original FontAwesome icon */}
                </form>
              </div>
              {/* Search End */}

              {/* Menu Start */}
              <ul className="nav">
                <li className="scroll-to-section">
                  <a href="#top" className="active">
                    Home
                  </a>
                </li>
                <li className="scroll-to-section">
                  <a href="#services">Services</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#courses">Courses</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#team">Team</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#events">Events</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#contact">Register Now!</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#contact" style={{ color: 'white', paddingLeft: '80px', fontWeight: 'bold' }}>
                    Sign In
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