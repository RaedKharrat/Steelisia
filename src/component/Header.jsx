import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logoApp from './logoSteelisia.png';
import logoApp2 from './logoApp2.png';

const Header = ({ cartCount, onCartClick }) => {
  const [logo, setLogo] = useState(logoApp);
  const [isCategorieOpen, setIsCategorieOpen] = useState(false); // State for handling dropdown visibility
  const [categories, setCategories] = useState([]); // State to store categories from API
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in
  const [isAdmin, setIsAdmin] = useState(false); // State to check if user is an admin

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
      // Assuming the token has a role property, check if user is an admin
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
      if (decodedToken.role === 'Admin') {
        setIsAdmin(true); // Set user as admin if the role is 'admin'
      }
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
      setIsAdmin(false); // Reset admin state
      navigate('/home'); // Redirect to the home page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleAboutus = () => {
    navigate(`/aboutus`);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop?categoryId=${categoryId}`); // Navigate to the /shop page with categoryId as a query parameter
  };
  
  const handleHomeClick = () => {
    navigate(`/home`); // Navigate to /shop with the selected category as a query parameter
  };

  return (
    <header className="header-area header-sticky">
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

              {/* Menu Start */}
              <ul className="nav">
                <li
                  className="scroll-to-section"
                  style={{ cursor: 'pointer' }}
                >
                  <a onClick={handleHomeClick}>home</a>
                </li>
                {/* Categorie Dropdown */}
                <li
                  className="scroll-to-section dropdown"
                  onClick={toggleCategorieDropdown}
                  onMouseLeave={() => setIsCategorieOpen(false)} // Close on mouse leave
                  style={{ cursor: 'pointer' }} // Set cursor to pointer for clickable items
                >
                  <a style={{ color: 'white' }}>Products</a>
                  {isCategorieOpen && (
                    <ul className="submenu">
                      {/* Dynamically render categories */}
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          style={{ cursor: 'pointer' }} // Set cursor to pointer for clickable items
                        >
                          <a onClick={() => handleCategoryClick(category._id)}>
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li
                  className="scroll-to-section"
                  style={{ cursor: 'pointer' }}
                >
                  <a onClick={handleAboutus}>A propos</a>
                </li>

                <li
                  className="scroll-to-section"
                  style={{
                    cursor: 'pointer',
                    paddingLeft: '80px',
                    fontWeight: 'bold',
                  }}
                >
                  <a onClick={handleSignInClick}>
                    {isLoggedIn ? 'Logout' : 'Sign In'} {/* Dynamically display text */}
                  </a>
                </li>
                <li
                  className="scroll-to-section"
                  style={{ cursor: 'pointer' }}
                >
                  <a
                    onClick={onCartClick}
                    style={{
                      color: 'white',
                      fontSize: '20px',
                      position: 'relative',
                      display: 'flex', // Ensures content inside the link aligns properly
                      alignItems: 'center',
                    }}
                  >
                    <i
                      className="fa fa-shopping-cart"
                      style={{
                        marginRight: '8px',
                        background: 'linear-gradient(to right, orange, red)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    ></i>
                    {/* Display cart count only if it's greater than 0 */}
                    {cartCount > 0 && (
                      <span
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          borderRadius: '50%',
                          padding: '1px 9px',
                          position: 'absolute',
                          top: '-9px',
                          right: '-9px',
                        }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </a>
                </li>

                {/* Conditionally Render 'Go to Dashboard' for Admin */}
                {isAdmin && (
                  <li
                    className="scroll-to-section"
                    style={{ cursor: 'pointer' }}
                  >
                    <a
                      onClick={() => navigate('/dashboard-produit')}
                      style={{
                        color: '#f84702',
                        paddingLeft: '80px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <i className="fa fa-tachometer" style={{ marginRight: '10px' }}></i>
                      Dashboard
                    </a>
                  </li>
                )}
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
