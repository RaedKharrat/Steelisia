import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Import jwtDecode correctly
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import AuthPage from './screen/AuthPage.jsx';
import Homepage from './screen/Homepage.jsx';
import Shop from './screen/Shop.jsx';
import DashboardP from './screen/dashboard.jsx';
import DashboardU from './screen/dashboardUser.jsx';
import DashboardC from './screen/DashboardC.jsx';
import DashboardCmd from './screen/dashboardCmd.jsx';
import DetaisProduutScreen from './screen/DetaisProduutScreen.jsx';
import AboutUsScreen from './screen/aboutusScreen.jsx';
import ProfileScreen from './screen/ProfileScreen.jsx';
import MycommandesScreen from './screen/mycommandesScreen.jsx';

const App = () => {
  // Helper function to check if the user has an admin role
  const isAdmin = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false; // No token means not logged in

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.role === 'Admin'; // Check if role is 'admin'
    } catch (e) {
      return false; // If decoding fails, treat as unauthorized
    }
  };

  // Helper function to check if the user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token ? true : false; // Check if there's a valid token
  };

  return (
    <GoogleOAuthProvider clientId="1073386024659-cmbm162066v85qaonpp9ue1v60lbajk5.apps.googleusercontent.com"> {/* Wrap the app with GoogleOAuthProvider */}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={!isAuthenticated() ? <AuthPage /> : <Navigate to="/home" />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUsScreen />} />
          <Route path="/produit-detais/:id" element={<DetaisProduutScreen />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/mescommandes" element={<MycommandesScreen />} />

          {/* Protected Routes for Admin */}
          <Route
            path="/dashboard-produit"
            element={isAdmin() ? <DashboardP /> : <Navigate to="/home" />}
          />
          <Route
            path="/dashboard-users"
            element={isAdmin() ? <DashboardU /> : <Navigate to="/home" />}
          />
          <Route
            path="/dashboard-categories"
            element={isAdmin() ? <DashboardC /> : <Navigate to="/home" />}
          />
          <Route
            path="/dashboard-commande"
            element={isAdmin() ? <DashboardCmd /> : <Navigate to="/home" />}
          />

          {/* Redirect non-existent routes to Home */}
          <Route path="*" element={<Navigate to={isAuthenticated() ? "/home" : "/auth"} />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider> // Close GoogleOAuthProvider
  );
};

export default App;
