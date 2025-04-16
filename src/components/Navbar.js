import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Recognize', path: '/recognize' },
    { name: 'About', path: '/about' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-200/80 backdrop-blur-md shadow-lg shadow-dark-accent/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="logo-link flex items-center">
              <span 
                className="text-2xl font-bold"
                style={{
                  color: "#00f5ff",
                  textShadow: "0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 15px #00f5ff, 0 0 20px #00f5ff",
                  letterSpacing: "0.5px"
                }}
              >
                TrafficSignAI
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-neon-blue bg-dark-100/50 shadow-md shadow-neon-blue/20'
                      : 'text-gray-300 hover:text-neon-blue hover:bg-dark-100/30'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              <span className="hidden sm:inline">Welcome, </span>
              <span className="font-medium text-neon-blue">{currentUser?.email?.split('@')[0] || 'User'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-md shadow-red-900/30 hover:shadow-lg hover:shadow-red-900/40"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-dark-accent hover:bg-dark-accent/80"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 