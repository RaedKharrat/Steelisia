import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.css';
import logoApp from './logoApp.png';
import logoApp2 from './logoApp2.png';

const Header = ({ cartCount, onCartClick }) => {  // Accept props here
  const [logo, setLogo] = useState(logoApp);
  const [isCategorieOpen, setIsCategorieOpen] = useState(false); // State for handling dropdown visibility
  const [categories, setCategories] = useState([]); // State to store categories from API
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:9090/categorie/');
        const data = await response.json();
        setCategories(data); // Store fetched categories in state
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    
    // Check if authToken is present in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // User is logged in if authToken exists
    }
  }, []); // Empty dependency array ensures it runs once when the component mounts

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
    if (isLoggedIn) {
      handleLogout(); // Logout if user is logged in
    } else {
      navigate('/auth'); // Navigate to sign in page if user is not logged in
    }
  };

  const handleHome = () => {
    navigate('/home'); // Navigate to the home route using useNavigate
  };

  const toggleCategorieDropdown = () => {
    setIsCategorieOpen((prevState) => !prevState); // Toggle the dropdown menu visibility
  };

  const handleLogout = async () => {
    try {
      // Send DELETE request to logout API
      await fetch('http://localhost:9090/user/logout', {
        method: 'DELETE',
        credentials: 'include', // Include credentials (cookies) in the request
      });
      localStorage.removeItem('authToken'); // Remove authToken from localStorage
      setIsLoggedIn(false); // Update state to reflect user is logged out
      navigate('/home'); // Redirect to the home page
    } catch (error) {
      console.error('Error during logout:', error);
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
              <a className="logo" onClick={handleHome}>
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
                {/* Categorie Dropdown */}
                <li
                  className="scroll-to-section dropdown"
                  onClick={toggleCategorieDropdown}
                  onMouseLeave={() => setIsCategorieOpen(false)} // Close on mouse leave
                >
                  <a style={{ color: 'white' }}>Categorie</a>
                  {isCategorieOpen && (
                    <ul className="submenu">
                      {/* Dynamically render categories */}
                      {categories.map((category, index) => (
                        <li key={index}>
                          <a href={`/categorie/${category._id}`}>{category.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li className="scroll-to-section">
                  <a href="#contact">Contact</a>
                </li>

                <li className="scroll-to-section">
                  <a
                    style={{
                      color: 'white',
                      paddingLeft: '80px',
                      fontWeight: 'bold',
                    }}
                    onClick={handleSignInClick}
                  >
                    {isLoggedIn ? 'Logout' : 'Sign In'} {/* Dynamically display text */}
                  </a>
                </li>
                <li className="scroll-to-section">
                <a onClick={onCartClick} style={{ color: 'white', fontSize: '20px', position: 'relative' }}>
        <i className="fa fa-shopping-cart"></i>
        {cartCount > 0 && <span>{cartCount}</span>}
      </a>
                </li>
              </ul>
              {/* Menu End */}
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
