import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, loginUser, registerUser, logoutUser, getCurrentUser } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, []);

  // Register a new user with email and password
  const signup = async (email, password, name) => {
    setError('');
    try {
      console.log("Attempting to register user:", email);
      const { user, error } = await registerUser(email, password);
      if (error) {
        console.error("Signup error:", error);
        setError(error);
        return { success: false, error };
      }
      
      console.log("User registered successfully:", user?.uid);
      // You can update the user profile with the name if needed
      // await updateProfile(user, { displayName: name });
      
      return { success: true, user };
    } catch (err) {
      const errorMessage = err.message || 'Failed to create an account';
      console.error("Signup exception:", err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Log in an existing user
  const login = async (email, password) => {
    setError('');
    try {
      console.log("Attempting to login user:", email);
      const { user, error } = await loginUser(email, password);
      if (error) {
        console.error("Login error:", error);
        setError(error);
        return { success: false, error };
      }
      console.log("User logged in successfully:", user?.uid);
      return { success: true, user };
    } catch (err) {
      const errorMessage = err.message || 'Failed to log in';
      console.error("Login exception:", err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Log out the current user
  const logout = async () => {
    setError('');
    try {
      const { error } = await logoutUser();
      if (error) {
        setError(error);
        return { success: false, error };
      }
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Failed to log out';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    error,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
