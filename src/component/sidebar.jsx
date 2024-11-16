import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoApp from './logoApp.png'; // Import the logo image

const Sidebar = ({ sidebarActive }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a DELETE request to the logout endpoint
      await axios.delete('http://localhost:9090/user/logout', { withCredentials: true });

      // Clear the token from local storage
      localStorage.removeItem('authToken');

      // Redirect to the /signin page
      navigate('/auth');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optional: Add error handling logic, e.g., show a notification
    }
  };

  const logoStyle = {
    fontSize: '32px',  // Adjust size as necessary
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, orange, red)',  // Orange to Red Gradient
    WebkitBackgroundClip: 'text',  // Apply the gradient to the text
    color: 'transparent',  // Make the text color transparent to show the gradient
  };

  return (
    <aside className={`sidebar ${sidebarActive ? 'active' : ''}`} style={{backgroundColor:'#2b2b2b',marginRight:'60px'}}>
      <div className="logo-details">
        <img src={logoApp} alt="Steelisia Logo" style={{ width: '30px', height: '30px', marginRight: '10px', marginLeft:'10px' }} />  {/* Replace the icon with the image */}
        <span className="logo_name" style={logoStyle}>Steelisia</span>
      </div>
      <ul className="nav-links">
      <li>
          <Link to="/home">
          <i className="bx bx-home" style={{color:'orange'}}></i>
          <span className="links_name" style={{color:'orange'}}>MY Website</span>
          </Link>
        </li>
        <li style={{marginTop:'20px'}}>
          <Link to="/dashboard-users">
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Users</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard-produit">
            <i className="bx bx-package"></i>
            <span className="links_name">Products</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard-categories">
            <i className="bx bx-category-alt"></i>
            <span className="links_name">Categories</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard-commande">
            <i className="bx bx-command"></i>
            <span className="links_name">Commands</span>
          </Link>
         
        </li>
        <li className="log_out">
          <Link  onClick={handleLogout}>
            <i className="bx bx-log-out"></i>
            <span className="links_name">Log out</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
