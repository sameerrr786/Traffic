// Verify Firebase Configuration
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Your Firebase configuration from .env
const firebaseConfig = {
  apiKey: "AIzaSyAAXjnaaRsgFn16JlQ7V6G5txNUrx7o5gU",
  authDomain: "traffic-88b50.firebaseapp.com",
  projectId: "traffic-88b50",
  storageBucket: "traffic-88b50.firebasestorage.app",
  messagingSenderId: "933249378681",
  appId: "1:933249378681:web:592bfdb869d7e9a95d67a8"
};

console.log("Testing Firebase Configuration:");
console.log(JSON.stringify(firebaseConfig, null, 2));

// Initialize Firebase
try {
  const app = initializeApp(firebaseConfig);
  console.log("✅ Firebase initialized successfully");
  
  const auth = getAuth(app);
  console.log("✅ Firebase Auth initialized successfully");
  
  console.log("\nFirebase appears to be configured properly.");
  console.log("\nIMPORTANT NEXT STEPS:");
  console.log("1. Make sure Email/Password authentication is enabled in Firebase console:");
  console.log("   - Go to: https://console.firebase.google.com/project/traffic-88b50/authentication/providers");
  console.log("   - Enable the 'Email/Password' sign-in method");
  console.log("2. Create a test user in the Firebase console or register through your app");
  
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
  console.log("\nPlease check your Firebase configuration.");
} 