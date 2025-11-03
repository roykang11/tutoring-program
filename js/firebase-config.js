// Firebase Configuration
// To enable cross-device sync:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use existing)
// 3. Enable Firestore Database (Start in test mode)
// 4. Go to Project Settings > General > Your apps > Web app
// 5. Copy your Firebase config and paste it below
// 6. Uncomment the firebaseConfig object and replace with your values

// Uncomment and fill in your Firebase config:
/*
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
*/

// Check if Firebase is configured
window.FIREBASE_CONFIGURED = typeof firebaseConfig !== 'undefined';

