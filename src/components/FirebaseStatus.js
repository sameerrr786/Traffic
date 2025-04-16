import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

const FirebaseStatus = () => {
  const [status, setStatus] = useState('Checking...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkFirebase = async () => {
      try {
        // Check if Firebase auth is initialized
        if (!auth) {
          setStatus('Firebase auth not initialized');
          return;
        }

        // Try to get the current user (this will fail if auth is not properly configured)
        try {
          const currentUser = auth.currentUser;
          setStatus(`Firebase initialized ${currentUser ? '(User signed in)' : '(No user signed in)'}`);
        } catch (e) {
          setStatus('Firebase initialized but auth error');
          setError(e.message);
        }
      } catch (e) {
        setStatus('Firebase initialization error');
        setError(e.message);
      }
    };

    checkFirebase();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-dark-200 p-4 rounded-md shadow-lg border border-dark-accent text-sm text-gray-300">
      <div className="font-bold mb-1">Firebase Status:</div>
      <div className={status.includes('error') ? 'text-red-400' : 'text-green-400'}>
        {status}
      </div>
      {error && (
        <div className="mt-2 text-red-400 text-xs max-w-md overflow-auto">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default FirebaseStatus; 