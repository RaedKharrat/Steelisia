import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AuthPage from './screen/AuthPage.jsx';
import Homepage from './screen/Homepage.jsx';
import Shop from './screen/Shop.jsx';
import DashboardP from './screen/dashboard.jsx';
import DashboardU from './screen/dashboardUser.jsx';
import DashboardC from './screen/DashboardC.jsx';
import DashboardCmd from './screen/dashboardCmd.jsx';
import DetaisProduutScreen from './screen/DetaisProduutScreen.jsx';

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

  return (
    <Router>
      <Routes>
        {/* Set AuthPage as the default route */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Other routes */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/produit-detais/:id" element={<DetaisProduutScreen />} />
        <Route path="/shop" element={<Shop />} />

        {/* Protect dashboard routes with admin role check */}
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

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
