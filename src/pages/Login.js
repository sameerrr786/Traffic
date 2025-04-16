import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup, isAuthenticated, currentUser, error: authError } = useAuth();
  const navigate = useNavigate();

  // Shadow styles - consistent format to avoid animation errors
  const shadowStyle = "0 0 10px rgba(0, 245, 255, 0.3)";
  const buttonHoverStyle = {
    scale: loading ? 1 : 1.03,
    // No shadow animation here to prevent format mix errors
  };

  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Update component error state if auth context has an error
  useEffect(() => {
    if (authError) {
      setError(authError);
      setLoading(false);
    }
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!isLogin && !name) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }
    
    try {
      let result;
      
      if (isLogin) {
        // Attempt to login
        result = await login(email, password);
      } else {
        // Attempt to sign up
        result = await signup(email, password, name);
      }
      
      if (result.success) {
        // Reset form and navigate to home on success
        setEmail('');
        setPassword('');
        setName('');
        navigate('/');
      } else {
        // Set error message from the result
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      console.error('Authentication error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-0 opacity-5">
        <div style={{
          backgroundSize: "30px 30px",
          backgroundImage: `linear-gradient(to right, #00f5ff 1px, transparent 1px),
                          linear-gradient(to bottom, #00f5ff 1px, transparent 1px)`,
          height: "100%"
        }}></div>
      </div>
      
      {/* App title with animation - Integrated without a box */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-5xl font-extrabold"
          style={{
            background: "linear-gradient(to right, #00f5ff, #4e66f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
            filter: "drop-shadow(0 0 8px rgba(0, 245, 255, 0.5))"
          }}
        >
          Traffic Sign Predictor
        </motion.h1>
        <motion.div 
          className="h-1 w-24 mx-auto mt-2" 
          style={{ background: "linear-gradient(to right, #00f5ff, #4e66f5)" }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "6rem", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-md p-8 space-y-8 backdrop-blur-sm z-10 rounded-xl"
        style={{ 
          backgroundColor: "rgba(0,0,0,0.7)", 
          border: "1px solid #00f5ff",
          boxShadow: shadowStyle
        }}
      >
        <div className="text-center">
          <h2 
            className="text-3xl font-bold"
            style={{
              background: "linear-gradient(to right, #00f5ff, #4e66f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
            }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: "#e0e0e0" }} className="mt-2">
            {isLogin
              ? 'Sign in to your account'
              : 'Join us to start recognizing traffic signs'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-md" style={{ backgroundColor: "rgba(255,30,30,0.1)", border: "1px solid rgba(255,30,30,0.3)", color: "#ff5555" }}>
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium"
                style={{ color: "#00f5ff" }}
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                style={{ 
                  backgroundColor: "rgba(0,0,0,0.6)", 
                  border: "1px solid rgba(0, 245, 255, 0.3)",
                  color: "white" 
                }}
              />
            </motion.div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
              style={{ color: "#00f5ff" }}
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              style={{ 
                backgroundColor: "rgba(0,0,0,0.6)", 
                border: "1px solid rgba(0, 245, 255, 0.3)",
                color: "white" 
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
              style={{ color: "#00f5ff" }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              style={{ 
                backgroundColor: "rgba(0,0,0,0.6)", 
                border: "1px solid rgba(0, 245, 255, 0.3)",
                color: "white" 
              }}
            />
            {!isLogin && (
              <p className="mt-1 text-xs" style={{ color: "#a0a0a0" }}>
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={buttonHoverStyle}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all duration-300 disabled:opacity-50"
              style={{ 
                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                boxShadow: shadowStyle
              }}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : isLogin ? 'Sign in' : 'Sign up'}
            </motion.button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            style={{ color: "#00f5ff", textShadow: "0 0 5px rgba(0, 245, 255, 0.3)" }}
            className="text-sm hover:brightness-110 transition-all duration-300"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 