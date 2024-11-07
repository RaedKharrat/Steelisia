import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <aside className={`sidebar ${sidebarActive ? 'active' : ''}`}>
      <div className="logo-details">
        <i className="bx bxl-c-plus-plus"></i>
        <span className="logo_name">Steelisia</span>
      </div>
      <ul className="nav-links">
        <li>
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
          <Link to="#" onClick={handleLogout}>
            <i className="bx bx-log-out"></i>
            <span className="links_name">Log out</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
