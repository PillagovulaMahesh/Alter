// src/routes.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components for different pages
import Feed from './components/Feed';
import Profile from './components/Profile';
import Login from './components/Login';
import NotFound from './components/NotFound'; // Optional page for 404 errors

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all for invalid routes */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
