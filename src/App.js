// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//import './App.css';
import AuthPage from './screen/AuthPage.jsx';
import Homepage from './screen/Homepage.jsx';
import Shop from './screen/Shop.jsx';
import DashboardP from './screen/dashboard.jsx';
import DashboardU from './screen/dashboardUser.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set AuthPage as the default route */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Other routes */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/dashboard-produit" element={<DashboardP />} />
        <Route path="/dashboard-users" element={<DashboardU />} />


        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;