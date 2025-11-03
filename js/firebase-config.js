// Firebase Configuration
// To enable cross-device sync:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use existing)
// 3. Enable Firestore Database (Start in test mode)
// 4. Go to Project Settings > General > Your apps > Web app
// 5. Copy your Firebase config and paste it below
// 6. Uncomment the firebaseConfig object and replace with your values

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAa8Zvo33gmXnHesp3FrFUMmJ_azfQZJl8",
  authDomain: "tutoring-program.firebaseapp.com",
  projectId: "tutoring-program",
  storageBucket: "tutoring-program.firebasestorage.app",
  messagingSenderId: "515222654573",
  appId: "1:515222654573:web:9545239a5ca28e73e13964"
};

// Check if Firebase is configured
window.FIREBASE_CONFIGURED = typeof firebaseConfig !== 'undefined';

