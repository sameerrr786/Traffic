import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import SignRecognition from './pages/SignRecognition';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import FirebaseStatus from './components/FirebaseStatus';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-300 to-dark-200 text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-grid-lg opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-radial from-dark-accent/10 via-transparent to-transparent"></div>
      <div className="relative z-10">
        {isAuthenticated && <Navbar />}
        <Routes>
          {/* Public route - Login */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recognize" element={<SignRecognition />} />
          </Route>
          
          {/* Redirect all other routes */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </div>
      <FirebaseStatus />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App; 