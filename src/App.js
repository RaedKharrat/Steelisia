// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AuthPage from './screen/AuthPage.jsx';
import Homepage from './screen/Homepage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set AuthPage as the default route */}
        <Route path="/" element={<AuthPage />} />
        
        {/* Other routes */}
        <Route path="/home" element={<Homepage />} />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;